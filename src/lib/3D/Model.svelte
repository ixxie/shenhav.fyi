<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { useGltf, useSuspense, onReveal } from '@threlte/extras';

	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let intro = tweened(0, { duration: 2000, easing: cubicOut });

	import { SheetObject } from '@threlte/theatre';

	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	import { initModel } from './merge';

	export let file: string;
	export let rotation: [number, number, number] = [0, 0, 0];
	export let spin: [number, number, number] = [0, 0, 0];

	const suspense = useSuspense();

	$: gltf = suspense(
		useGltf(`/scenes/${file}`, {
			useDraco: true
		})
	);
	$: model = initModel($gltf);

	onReveal(() => {
		$intro = 1;
	});

	const color = getContext('color') as Readable<number>;
	$: shade = `hsl(${$color}, 90%, 70%)`;

	let orientation: [number, number, number] = [0, 0, 0];
	useTask(() => {
		orientation = orientation.map((v, i) => v + spin[i] / 1000) as [number, number, number];
	});
</script>

{#if model}
	<SheetObject key="group / {file}" let:Transform>
		<Transform>
			<T.Group {rotation} position.y={($intro-1)*5}>
				<T.Mesh geometry={model.children[0].geometry} rotation={orientation} castShadow>
					<T.MeshToonMaterial color={shade} transparent opacity={$intro} />
				</T.Mesh>
			</T.Group>
		</Transform>
	</SheetObject>
{/if}
