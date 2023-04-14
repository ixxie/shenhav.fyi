<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';

	import type { OrbitControls as OrbitControlsType } from 'three/addons/controls/OrbitControls.js';
	import { degToRad } from 'three/src/math/MathUtils';

	import Model from './Model.svelte';

	export let file: string;
	export let rotation: [number, number, number] = [0, 0, 0];
	export let spin: [number, number, number] = [0, 0, 0];

	let controls: OrbitControlsType;
</script>

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

	<T.DirectionalLight castShadow position={[3, 10, 10]} />

	<Model {file} {controls} {rotation} {spin} />
</Canvas>
