<script lang="ts">
	import { T, useThrelte, useFrame } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	import type { OrbitControls as OrbitControlsType } from 'three/addons/controls/OrbitControls.js';

	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	import { initModel } from './merge';
	import { zoomCameraToSelection } from './zoom';

	export let file: string;
	export let controls: OrbitControlsType;
	export let rotation: [number, number, number] = [0, 0, 0];
	export let spin: [number, number, number] = [0, 0, 0];

	$: gltf = useGltf(`/scenes/${file}`, {
		useDraco: true
	});

	const { camera } = useThrelte();

	$: model = initModel($gltf);

	const color = getContext('color') as Readable<number>;
	$: shade = `hsl(${$color}, 90%, 70%)`;

	let innerWidth: number; // react to resize
	let innerHeight: number; // react to resize
	let ref: THREE.Group; // focus on group
	$: zoomCameraToSelection({
		camera: $camera as THREE.PerspectiveCamera,
		controls,
		selection: [ref],
		fitOffset: innerWidth < 800 ? innerWidth / 800 : 1.1,
		offsetWidth: innerWidth,
		offsetHeight: innerHeight
	});

	let orientation: [number, number, number] = [0, 0, 0];
	useFrame(() => {
		orientation = orientation.map((v, i) => v + spin[i] / 1000) as [number, number, number];
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if model}
	<T.Group {rotation} bind:ref>
		<T.Mesh geometry={model.children[0].geometry} rotation={orientation} castShadow>
			<T.MeshToonMaterial color={shade} />
		</T.Mesh>
	</T.Group>
{/if}
