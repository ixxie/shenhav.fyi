import { onMount } from 'svelte';

import type { TagConfig, SchematicConfig } from './config.js';

export class SchematicState {
	figure = $state<HTMLElement>();
	dim = $state<SchematicConfig['dim']>();
	nodes = $derived<HTMLElement[]>(
		Array.from(this.figure?.querySelectorAll('*') ?? []).filter((elem) =>
			elem?.id.includes('__')
		)
	);
	objects = $derived(
		Array.from(new Set(this.nodes?.map(getObject) ?? [])).map(
			(name) => new ObjectState(this, name)
		)
	);
	all = $state<AllState>();
	tags = $state<TagState[]>();

	hover = $state.raw<ObjectStateSerialized | null>(null);
	click = $state.raw<ObjectStateSerialized | null>(null);
	focus = $derived(this.hover ?? this.click);

	constructor(element: HTMLElement, config: SchematicConfig) {
		this.figure = element;
		this.all = new AllState(this);
		this.tags = config.tags.map((tag: TagConfig) => new TagState(this, tag));
		this.dim = config['dim'];
		$effect.root(() => {
			document.addEventListener('click', () => {
				if (this.click !== null) {
					this.click = null;
				}
			});
		});
	}
}

class AllState {
	// parent
	schematic = $state<SchematicState>();
	objects = $derived<ObjectState[]>(this.schematic?.objects ?? []);

	constructor(schematic: SchematicState) {
		this.schematic = schematic;
	}

	get visible() {
		return this.objects?.every((obj) => obj.visible) ?? false;
	}

	set visible(value: boolean) {
		this.objects?.forEach((obj) => {
			obj.visible = value;
		});
	}
}

class TagState {
	// parent
	schematic = $state<SchematicState>();
	config: TagConfig;
	objects = $derived<ObjectState[]>(
		this.schematic?.objects.filter((obj) =>
			this.config.objects.includes(obj.name)
		) ?? []
	);
	name: string;
	emoji: string;

	constructor(schematic: SchematicState, config: TagConfig) {
		this.schematic = schematic;
		this.config = config;
		this.name = config.name;
		this.emoji = config.emoji;
	}

	get visible() {
		return this.objects?.every((obj) => obj.visible) ?? false;
	}

	set visible(value: boolean) {
		this.objects?.forEach((obj) => {
			obj.visible = value;
		});
	}
}

interface ObjectStateSerialized {
	name: string;
	color: string;
	dim: {
		length: number;
		width: number;
		height: number;
	};
}

class ObjectState {
	// parent
	schematic = $state<SchematicState>();
	// state
	name = $state<string>();
	nodes = $derived<HTMLElement[]>(
		this.schematic?.nodes?.filter((node) => getObject(node) === this.name) ?? []
	);
	visible = $state<boolean>(true);
	clicked = $derived<boolean>(this.schematic?.click?.name === this.name);
	hovered = $derived<boolean>(this.schematic?.hover?.name === this.name);
	focused = $derived<boolean>(this.schematic?.focus?.name === this.name);
	// derived
	color = $derived(this.nodes ? this.nodes[0]?.style.fill : 'white');

	constructor(schematic: SchematicState, query: Element | string) {
		if (typeof query == 'string') {
			this.name = query;
		} else {
			this.name = getObject(query);
		}
		this.schematic = schematic;
		// listeners
		$effect.root(() => {
			$effect(() => {
				this.nodes?.forEach((node: Element) => {
					node.addEventListener('mouseenter', () => this.hover());
					node.addEventListener('mouseleave', () => this.clear());
					node.addEventListener('click', (e) => this.click(e));
					node.addEventListener('touchend', (e) => this.click(e));
				});
			});
			// toggle nodes with visibility
			$effect(() => {
				if (this.visible) {
					this.nodes.forEach((node) => {
						node.style.display = 'block';
					});
				} else {
					this.nodes.forEach((node) => {
						node.style.display = 'none';
					});
				}
			});
			// style nodes with focus
			$effect(() => {
				if (this.schematic === null || this.schematic === undefined) {
					return;
				}
				if (this.focused) {
					this.nodes?.forEach((n) => {
						if (this.focused) {
							n.style.opacity = '0.5';
							n.style.zIndex = '1000';
						} else {
							n.style.opacity = '0.1';
							n.style.zIndex = '-1';
						}
					});
				} else {
					this.nodes.forEach((n) => {
						n.style.opacity = '0.2';
					});
				}
			});
		});
	}

	get serialized() {
		return {
			name: this.name,
			color: this.color,
			dim: this.dim
		};
	}

	hover() {
		if (!this.schematic) {
			return;
		}
		this.schematic.hover = this.serialized;
	}

	click(event) {
		event.stopPropagation();
		if (!this.schematic) {
			return;
		}
		this.schematic.click = this.serialized;
	}

	toggle(event) {
		if (this.focused) {
			this.clear();
		} else {
			this.click(event);
		}
	}

	clear() {
		if (!this.schematic) {
			return;
		}
		if (this.hovered) {
			this.schematic.hover = null;
		}
	}

	get dim() {
		if (this.schematic === null || this.schematic === undefined) {
			return;
		}
		const raw = Object.fromEntries(
			this.nodes
				?.map((node) => ({ node, view: getView(node) }))
				.map(({ node, view }) => {
					const svg = node.getBBox();
					return [
						view,
						{
							width:
								(svg.width * this.schematic.dim.real.width) /
								this.schematic.dim.svg.width,
							height:
								(svg.height * this.schematic.dim.real.width) /
								this.schematic.dim.svg.width
						}
					];
				}) ?? []
		);
		return {
			length: roundAverge(raw.topview.width, raw.sideview.width),
			height: roundAverge(raw.sideview.height, raw.backview.height),
			width: roundAverge(raw.topview.height, raw.backview.width)
		};
	}
}

// utils

function getObject(node: Element) {
	return node?.id.split('__')[0] ?? null;
}
function getView(node: Element) {
	return node?.id.split('__')[1] ?? null;
}

function roundAverge(value1: number, value2: number) {
	const average = (value1 + value2) / 2;
	return Math.round(average / 10) * 10;
}

function isHTMLElement(element: any): element is HTMLElement {
	return element instanceof HTMLElement;
}
