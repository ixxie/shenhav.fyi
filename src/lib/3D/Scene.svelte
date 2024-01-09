<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	import { Canvas, T } from '@threlte/core';
	import { Suspense } from '@threlte/extras';
	import { Theatre, SheetObject } from '@threlte/theatre';

	import state from './state.json';

	import Model from './Model.svelte';
	import Loading from './Loading.svelte';

	export let file: string;
	export let rotation: [number, number, number] = [0, 0, 0];
	export let spin: [number, number, number] = [0, 0, 0];
	export let dolly: number = 0;

	let rotations: { [key: string]: number } = {
		'lighthouse.glb': 0,
		'computer.glb': Math.PI / 2,
		'rocket.glb': Math.PI,
		'swissknife.glb': (Math.PI * 3) / 2
	};

	let target = tweened(Math.PI / 4 + rotations[file], { duration: 2000, easing: cubicInOut });

	$: $target = Math.PI / 4 + rotations[file];
</script>

<Canvas>
	<Theatre studio={{ enabled: false }} config={{ state }}>
		<T.PerspectiveCamera
			makeDefault
			position={[10 + dolly, 5, 10 + dolly / 3]}
			fov={24}
			on:create={({ ref }) => {
				ref.lookAt(0, 0, 0);
			}}
		/>

		<T.DirectionalLight intensity={1.2} castShadow position={[3, 10, 10]} />
		<T.AmbientLight intensity={0.2} />

		<Suspense>
			<Loading slot="fallback" />
			<SheetObject key="group" let:Transform>
				<Transform>
					<T.Group rotation.y={$target}>
						<Model file="swissknife.glb" {rotation} {spin} />
						<Model file="rocket.glb" {rotation} {spin} />
						<Model file="computer.glb" {rotation} {spin} />
						<Model file="lighthouse.glb" {rotation} {spin} />
					</T.Group>
				</Transform>
			</SheetObject>
		</Suspense>
	</Theatre>
</Canvas>
