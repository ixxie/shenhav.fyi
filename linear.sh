#!/bin/sh
# Linear API wrapper
# Usage:
#   ./linear.sh '{ graphql query }'        — raw GraphQL query
#   ./linear.sh --file path/to/issue.md    — markdown file with YAML frontmatter

set -e

api_call() {
  curl -s https://api.linear.app/graphql \
    -H "Content-Type: application/json" \
    -H "Authorization: $LINEAR_API_KEY" \
    -d @-
}

# Raw GraphQL mode
if [ "$1" != "--file" ]; then
  QUERY="${1:-$(cat)}"
  echo "$QUERY" | jq -Rs '{query: .}' | api_call
  exit $?
fi

# File mode: parse YAML frontmatter + markdown body
FILE="$2"
if [ ! -f "$FILE" ]; then
  echo "Error: file not found: $FILE" >&2
  exit 1
fi

# split frontmatter and body
FRONTMATTER=$(sed -n '/^---$/,/^---$/{ /^---$/d; p }' "$FILE")
BODY=$(sed '1,/^---$/d' "$FILE" | sed '1,/^---$/d')

# parse mutation type
MUTATION=$(echo "$FRONTMATTER" | grep '^mutation:' | sed 's/^mutation: *//')

# parse fields into JSON object
FIELDS_JSON=$(echo "$FRONTMATTER" | grep -v '^mutation:' | awk -F': ' '
  /^[a-zA-Z]/ {
    key = $1
    sub(/^ */, "", key)
    val = substr($0, index($0, ": ") + 2)
    gsub(/^["'"'"']|["'"'"']$/, "", val)
    if (val ~ /^[0-9]+$/) {
      printf "%s\t%s\tn\n", key, val
    } else {
      printf "%s\t%s\ts\n", key, val
    }
  }
' | jq -Rn '
  [inputs | split("\t")] |
  reduce .[] as $row ({};
    if $row[2] == "n" then . + {($row[0]): ($row[1] | tonumber)}
    else . + {($row[0]): $row[1]}
    end
  )
')

case "$MUTATION" in
  issue-create)
    QUERY='mutation ($input: IssueCreateInput!) { issueCreate(input: $input) { success issue { id identifier title url } } }'
    jq -n \
      --argjson fields "$FIELDS_JSON" \
      --arg body "$BODY" \
      --arg query "$QUERY" \
      '{query: $query, variables: {input: ($fields + {description: $body})}}' \
    | api_call
    ;;
  issue-update)
    QUERY='mutation ($id: String!, $input: IssueUpdateInput!) { issueUpdate(id: $id, input: $input) { success issue { id identifier title } } }'
    jq -n \
      --argjson fields "$FIELDS_JSON" \
      --arg body "$BODY" \
      --arg query "$QUERY" \
      '{query: $query, variables: {id: $fields.id, input: (($fields | del(.id)) + {description: $body})}}' \
    | api_call
    ;;
  project-create)
    QUERY='mutation ($input: ProjectCreateInput!) { projectCreate(input: $input) { success project { id name slugId url } } }'
    jq -n \
      --argjson fields "$FIELDS_JSON" \
      --arg body "$BODY" \
      --arg query "$QUERY" \
      '{query: $query, variables: {input: ($fields + {content: $body})}}' \
    | api_call
    ;;
  project-update)
    QUERY='mutation ($id: String!, $input: ProjectUpdateInput!) { projectUpdate(id: $id, input: $input) { success } }'
    jq -n \
      --argjson fields "$FIELDS_JSON" \
      --arg body "$BODY" \
      --arg query "$QUERY" \
      '{query: $query, variables: {id: $fields.id, input: (($fields | del(.id)) + {content: $body})}}' \
    | api_call
    ;;
  *)
    echo "Error: unknown or missing mutation type: $MUTATION" >&2
    echo "Supported: issue-create, issue-update, project-create, project-update" >&2
    exit 1
    ;;
esac
