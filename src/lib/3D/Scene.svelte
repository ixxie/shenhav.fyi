<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	import { Canvas, T } from '@threlte/core';
	import { OrbitControls, Suspense } from '@threlte/extras';
	import { Project, Sheet, SheetObject } from '@threlte/theatre';

	import type { OrbitControls as OrbitControlsType } from 'three/addons/controls/OrbitControls.js';
	import { degToRad } from 'three/src/math/MathUtils';

	import state from './state.json';

	import Model from './Model.svelte';

	export let file: string;
	export let rotation: [number, number, number] = [0, 0, 0];
	export let spin: [number, number, number] = [0, 0, 0];
	export let offset: number = 0;

	let controls: OrbitControlsType;

	let rotations: { [key: string]: number } = {
		'lighthouse.glb': 0,
		'computer.glb': Math.PI / 2,
		'rocket.glb': Math.PI,
		'swissknife.glb': (Math.PI * 3) / 2
	};

	let target = tweened(Math.PI / 4 + rotations[file], { duration: 2000, easing: cubicInOut });

	$: $target = Math.PI / 4 + rotations[file];
</script>

<Project name="default" config={{ state }}>
	<Sheet name="default">
		<Canvas>
			<T.PerspectiveCamera makeDefault position={[10, 5, 10]} fov={24}>
				<OrbitControls
					maxPolarAngle={degToRad(80)}
					enableZoom={false}
					target={[0, 0, 0]}
					bind:ref={controls}
					enabled={false}
				/>
			</T.PerspectiveCamera>

			<T.DirectionalLight intensity={1.2} castShadow position={[3, 10, 10]} />
			<T.AmbientLight intensity={0.2} />

			<SheetObject key="group" let:Transform>
				<Transform>
					<T.Group position.y={offset} rotation.y={$target}>
						<Suspense>
							<Model file="swissknife.glb" {controls} {rotation} {spin} />
							<Model file="rocket.glb" {controls} {rotation} {spin} />
							<Model file="computer.glb" {controls} {rotation} {spin} />
							<Model file="lighthouse.glb" {controls} {rotation} {spin} />
						</Suspense>
					</T.Group>
				</Transform>
			</SheetObject>
		</Canvas>
	</Sheet>
</Project>
