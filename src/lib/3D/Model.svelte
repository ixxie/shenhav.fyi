<script lang="ts">
	import { T, useThrelte, useFrame } from '@threlte/core';
	import { Suspense, useGltf, useSuspense } from '@threlte/extras';

	import { SheetObject } from '@threlte/theatre';

	import type { OrbitControls as OrbitControlsType } from 'three/addons/controls/OrbitControls.js';

	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	import { initModel } from './merge';
	import { zoomCameraToSelection } from './zoom';

	export let file: string;
	export let controls: OrbitControlsType;
	export let rotation: [number, number, number] = [0, 0, 0];
	export let spin: [number, number, number] = [0, 0, 0];

	const suspense = useSuspense();

	$: gltf = suspense(
		useGltf(`/scenes/${file}`, {
			useDraco: true
		})
	);

	const { camera } = useThrelte();

	$: model = initModel($gltf);

	const color = getContext('color') as Readable<number>;
	$: shade = `hsl(${$color}, 90%, 70%)`;

	let innerWidth: number; // react to resize
	let innerHeight: number; // react to resize
	let ref: THREE.Group; // focus on group

	let orientation: [number, number, number] = [0, 0, 0];
	useFrame(() => {
		orientation = orientation.map((v, i) => v + spin[i] / 1000) as [number, number, number];
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if model}
	<SheetObject key="group / {file}" let:Transform>
		<Transform>
			<T.Group {rotation} bind:ref>
				<T.Mesh geometry={model.children[0].geometry} rotation={orientation} castShadow>
					<T.MeshToonMaterial color={shade} />
				</T.Mesh>
			</T.Group>
		</Transform>
	</SheetObject>
{/if}
