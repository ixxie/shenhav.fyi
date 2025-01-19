<script lang="ts">
	import * as core from 'lexical';
	import * as link from '@lexical/link';
	import * as utils from '@lexical/utils';

	import { useEditor } from '../core';
	import { Tool } from './lib';

	const {
		validateUrl,
		attributes
	}: {
		validateUrl?: (url: string) => boolean;
		attributes?: link.LinkAttributes;
	} = $props();

	const editor = useEditor();

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

	// theme
	editor.theme({
		name: 'link',
		classes: {
			link: 'link-theme link'
		}
	});

	// runtime
	let url = $state('');
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
		editor.mode = null;
	};
</script>

{#snippet linkTool()}
	{#if !editor.mode}
		<Tool
			name="Link"
			onclick={initLink}
			--sl-icon="var(--sl-link-icon, var(--sl-default-link-icon))"
		/>
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
		<Tool
			name="Add link"
			onclick={saveLink}
			--sl-icon="var(--sl-plus-icon, var(--sl-default-plus-icon))"
		/>
	{/if}
	<style>
		:root {
			--sl-default-link-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMDAwMCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0xMTcuMTgsMTg4Ljc0YTEyLDEyLDAsMCwxLDAsMTdsLTUuMTIsNS4xMkE1OC4yNiw1OC4yNiwwLDAsMSw3MC42LDIyOGgwQTU4LjYyLDU4LjYyLDAsMCwxLDI5LjE0LDEyNy45Mkw2My44OSw5My4xN2E1OC42NCw1OC42NCwwLDAsMSw5OC41NiwyOC4xMSwxMiwxMiwwLDEsMS0yMy4zNyw1LjQ0LDM0LjY1LDM0LjY1LDAsMCwwLTU4LjIyLTE2LjU4TDQ2LjExLDE0NC44OUEzNC42MiwzNC42MiwwLDAsMCw3MC41NywyMDRoMGEzNC40MSwzNC40MSwwLDAsMCwyNC40OS0xMC4xNGw1LjExLTUuMTJBMTIsMTIsMCwwLDEsMTE3LjE4LDE4OC43NFpNMjI2LjgzLDQ1LjE3YTU4LjY1LDU4LjY1LDAsMCwwLTgyLjkzLDBsLTUuMTEsNS4xMWExMiwxMiwwLDAsMCwxNywxN2w1LjEyLTUuMTJhMzQuNjMsMzQuNjMsMCwxLDEsNDksNDlMMTc1LjEsMTQ1Ljg2QTM0LjM5LDM0LjM5LDAsMCwxLDE1MC42MSwxNTZoMGEzNC42MywzNC42MywwLDAsMS0zMy42OS0yNi43MiwxMiwxMiwwLDAsMC0yMy4zOCw1LjQ0QTU4LjY0LDU4LjY0LDAsMCwwLDE1MC41NiwxODBoLjA1YTU4LjI4LDU4LjI4LDAsMCwwLDQxLjQ3LTE3LjE3bDM0Ljc1LTM0Ljc1YTU4LjYyLDU4LjYyLDAsMCwwLDAtODIuOTFaIj48L3BhdGg+PC9zdmc+');
			--sl-default-plus-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMDAwMCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMjQsMTI4YTgsOCwwLDAsMS04LDhIMTM2djgwYTgsOCwwLDAsMS0xNiwwVjEzNkg0MGE4LDgsMCwwLDEsMC0xNmg4MFY0MGE4LDgsMCwwLDEsMTYsMHY4MGg4MEE4LDgsMCwwLDEsMjI0LDEyOFoiPjwvcGF0aD48L3N2Zz4=');
		}
	</style>
{/snippet}

<style>
	:global {
		.svelte-lexical .link-theme {
			&.link {
				color: var(--sl-link-color, deepskyblue);
				text-decoration: var(
					--sl-link-decoration,
					underline solid 2px var(--sl-link-color, deepskyblue)
				);
			}
		}
	}
</style>
