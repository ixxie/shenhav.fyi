<script lang="ts">
	import * as core from 'lexical';
	import * as link from '@lexical/link';
	import * as utils from '@lexical/utils';

	import { useEditor } from '../hook.svelte';
	import { Tool } from './lib';

	const {
		validateUrl,
		attributes
	}: {
		validateUrl?: (url: string) => boolean;
		attributes?: link.LinkAttributes;
	} = $props();

	const editor = useEditor();

	let url = $state('');

	// init
	editor.plugin({
		name: 'link',
		tools: [linkTool],
		nodes: [link.LinkNode, link.AutoLinkNode],
		register: (instance) =>
			utils.mergeRegister(
				instance.registerCommand(
					link.TOGGLE_LINK_COMMAND,
					(payload) => {
						if (payload === null) {
							link.$toggleLink(payload);
							return true;
						} else if (typeof payload === 'string') {
							if (validateUrl === undefined || validateUrl(payload)) {
								link.$toggleLink(payload, attributes);
								return true;
							}
							return false;
						} else {
							const { url, target, rel, title } = payload;
							link.$toggleLink(url, {
								...attributes,
								rel,
								target,
								title
							});
							return true;
						}
					},
					core.COMMAND_PRIORITY_LOW
				),
				validateUrl !== undefined
					? instance.registerCommand(
							core.PASTE_COMMAND,
							(event) => {
								if (!editor.instance) {
									return false;
								}
								const selection = core.$getSelection();
								if (
									!core.$isRangeSelection(selection) ||
									selection.isCollapsed() ||
									!utils.objectKlassEquals(event, ClipboardEvent)
								) {
									return false;
								}
								const clipboardEvent = event as ClipboardEvent;
								if (clipboardEvent.clipboardData === null) {
									return false;
								}
								const clipboardText =
									clipboardEvent.clipboardData.getData('text');
								if (!validateUrl(clipboardText)) {
									return false;
								}
								// don't apply link to element nodes
								if (
									!selection
										.getNodes()
										.some((node) => core.$isElementNode(node))
								) {
									editor.instance.dispatchCommand(link.TOGGLE_LINK_COMMAND, {
										...attributes,
										url: clipboardText
									});
									event.preventDefault();
									return true;
								}
								return false;
							},
							core.COMMAND_PRIORITY_LOW
						)
					: () => {} // noop if no validation provided
			)
	});

	// runtime

	const initLink = () => {
		editor.instance?.dispatchCommand(link.TOGGLE_LINK_COMMAND, {
			url: ''
		});
		editor.mode = 'link';
	};
	const saveLink = () => {
		editor.instance?.dispatchCommand(link.TOGGLE_LINK_COMMAND, {
			url
		});
		editor.toolbar.hide();
	};
</script>

{#snippet linkTool()}
	{#if !editor.mode}
		<Tool name="Link" onclick={initLink} --icon="var(--link-icon)" />
	{:else if editor.mode == 'link'}
		<input
			type="text"
			bind:value={url}
			onkeydown={(event) => {
				event.stopPropagation();
				if (event.key == 'Enter') {
					saveLink();
				}
			}}
		/>
		<button onclick={saveLink}>+</button>
	{/if}
{/snippet}
