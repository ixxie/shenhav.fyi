---
name: linear
description: Query and manage Linear issues. Use when the user asks about issues, tasks, projects, or wants to create/update Linear items.
user-invocable: true
---

# Linear API Skill

Use `./linear.sh` in the project root to interact with the Linear API. The script takes a GraphQL query as an argument or via stdin. The `LINEAR_API_KEY` env var must be set (via `.env` + direnv).

## Common Queries

### List projects
```sh
./linear.sh '{ projects(first: 20) { nodes { id name state } } }'
```

### List issues in a project
```sh
./linear.sh '{ project(id: "PROJECT_ID") { issues(first: 50) { nodes { identifier title state { name } priority } } } }'
```

### Get issue details
```sh
./linear.sh '{ issue(id: "ISSUE_ID") { identifier title description state { name } labels { nodes { name } } children { nodes { identifier title state { name } } } } }'
```

### Search issues
```sh
./linear.sh '{ issueSearch(query: "search terms", first: 20) { nodes { identifier title state { name } } } }'
```

### Create issue
```sh
./linear.sh 'mutation { issueCreate(input: { teamId: "TEAM_ID", title: "Issue title", description: "Description" }) { issue { identifier title url } } }'
```

### Create sub-issue
```sh
./linear.sh 'mutation { issueCreate(input: { teamId: "TEAM_ID", title: "Sub-issue title", parentId: "PARENT_ISSUE_ID" }) { issue { identifier title url } } }'
```

### Update issue status
```sh
./linear.sh 'mutation { issueUpdate(id: "ISSUE_ID", input: { stateId: "STATE_ID" }) { issue { identifier title state { name } } } }'
```

### List teams (to get team IDs)
```sh
./linear.sh '{ teams(first: 10) { nodes { id name key } } }'
```

### List workflow states (to get state IDs)
```sh
./linear.sh '{ workflowStates(first: 50) { nodes { id name type team { key } } } }'
```

## File Mode

For mutations with markdown content (mermaid diagrams, code blocks, etc.), use file mode to avoid escaping issues. Write a markdown file with YAML frontmatter and pass it to `./linear.sh --file`:

### Issue create
```markdown
---
mutation: issue-create
teamId: TEAM_UUID
projectId: PROJECT_UUID
title: Issue title
priority: 1
---
Markdown description here, with ```mermaid``` blocks and anything else.
```

### Issue update
```markdown
---
mutation: issue-update
id: ISSUE_UUID
---
Updated markdown description.
```

### Project create
```markdown
---
mutation: project-create
name: Project name
description: Short description (255 char limit)
teamIds: TEAM_UUID
---
Long-form project content (unlimited markdown).
```

### Project update
```markdown
---
mutation: project-update
id: PROJECT_UUID
description: Short description (255 char limit)
---
Long-form project content (unlimited markdown).
```

Frontmatter keys map directly to GraphQL input fields. The markdown body becomes `description` for issues or `content` for projects. Integer values are auto-detected.

**Workflow**: Use the `Write` tool to create the temp file, then call `./linear.sh` in a separate `Bash` call. This keeps the bash command starting with `./linear.sh` so the permission allow rule matches.

```
# Step 1: Use the Write tool to create /tmp/my-issue.md
# Step 2: Run in Bash:
./linear.sh --file /tmp/my-issue.md | jq .
```

## Usage Notes

- Always use `./linear.sh` — never call the Linear API directly via curl (sandbox restrictions)
- The script handles JSON escaping of the query
- Pipe output through `jq` for readable formatting: `./linear.sh '...' | jq .`
- For mutations, use `mutation { ... }` syntax
- For mutations with rich markdown content, prefer `--file` mode
- Issue identifiers look like `TEAM-123`, IDs are UUIDs
- Projects have both `description` (255 char limit) and `content` (unlimited markdown)
- Issues only have `description` (unlimited markdown, no separate content field)
