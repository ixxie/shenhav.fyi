export const content = {
		type: 'page',
		title: ['Svedit', []],
		subtitle: [
			'A template for building rich content editors with Svelte 5',
			[[24, 44, 'emphasis']]
		],
		body: [
			{
				type: 'story',
				layout: 1,
				image: '/images/editable.svg',
				title: ['Visual in‑place editing', []],
				description: [
					'Model your content in JSON, render it with Svelte components, and edit content directly in the layout. You only have to follow a couple of rules to make this work.',
					[]
				]
			},
			{
				type: 'story',
				layout: 2,
				image: '/images/lightweight.svg',
				title: ['Minimal viable editor', []],
				description: [
					"The reference implementation uses only about 1000 lines of code. That means you'll be able to serve editable web pages, removing the need for a separate Content Management System.",
					[[100, 118, 'link', { href: 'https://editable.website' }]]
				]
			},
			{
				type: 'story',
				layout: 1,
				image: '/images/nested-blocks-illustration.svg',
				title: ['Nested blocks', []],
				description: [
					'A block can embed a container of other blocks. For instance the list block at the bottom of the page has a container of list items.',
					[]
				]
			},
			{
				type: 'story',
				layout: 2,
				image: '/images/container-cursors.svg',
				title: ['Container cursors', []],
				description: [
					'They work just like text cursors, but instead of a character position in a string they address a block position in a container.\n\nTry it by selecting a few blocks, then press ↑ or ↓. Press ↵ to insert a new block or ⌫ to delete the block before the cursor.',
					[]
				]
			},
			{
				type: 'story',
				layout: 1,
				image: '/images/svelte-logo.svg',
				title: ['Made for Svelte 5', []],
				description: [
					'Integrate with your Svelte application. Use it as a template and copy and paste Svedit.svelte to build your custom rich content editor.',
					[
						[20, 26, 'link', { href: 'https://svelte.dev/' }],
						[80, 93, 'emphasis', null]
					]
				]
			},
			{
				type: 'story',
				layout: 2,
				image: '/images/extendable.svg',
				title: ['Alpha version', []],
				description: [
					"Expect bugs. Expect missing features. Expect the need for more work on your part to make this work for your use case.\n\nFind below a list of known issues we'll be working to get fixed next:",
					[]
				]
			},
			{
				type: 'list',
				list_style: 'decimal-leading-zero',
				items: [
					{
						type: 'list_item',
						description: [
							"Images can not yet be selected and changed. We'll solve this by making any non‑text property selectable on the canvas, and show a popover (e.g. an image selector, or a math formula editor) to make changes, which will then be reflected in the canvas display immediately.",
							[]
						]
					},
					{
						type: 'list_item',
						description: [
							'Container selections inside nested blocks (e.g. list items in this list) do not work reliably yet.',
							[]
						]
					},
					{
						type: 'list_item',
						description: [
							'Only the latest Chrome is supported at the moment as we rely on CSS Anchor Positioning for overlays.',
							[]
						]
					},
					{
						type: 'list_item',
						description: [
							'Full mobile support is considered in our design, but not yet implemented.',
							[]
						]
					}
				]
			},
			{
				type: 'story',
				layout: 1,
				editable: false,
				image: '/images/github.svg',
				title: ['Star us on GitHub', []],
				description: [
					'Please star Svedit on GitHub or watch the repo to be notified about updates. Svedit is made by Michael Aufreiter and Johannes Mutter and is licensed under the MIT License.',
					[
						[0, 28, 'link', { href: 'https://github.com/michael/svedit/', target: '_blank' }],
						[95, 112, 'link', { href: 'https://michaelaufreiter.com', target: '_blank' }],
						[117, 132, 'link', { href: 'https://mutter.co', target: '_blank' }]
					]
				]
			}
		]
	}
