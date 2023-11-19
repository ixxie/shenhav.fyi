<script lang="ts">
	import { Pass, useThrelte } from '@threlte/core';
	import * as THREE from 'three';

	import { DotScreenPass } from 'three/addons/postprocessing/DotScreenPass.js';
	import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
	import { MaskPass, ClearMaskPass } from 'three/addons/postprocessing/MaskPass.js';
	import { ColorifyShader } from 'three/addons/shaders/ColorifyShader.js';
	import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';
	import { VignetteShader } from 'three/addons/shaders/VignetteShader.js';

	import { getContext } from 'svelte';

	const effectVignette = new ShaderPass(VignetteShader);
	effectVignette.uniforms['offset'].value = 0.95;
	effectVignette.uniforms['darkness'].value = 1.6;

	const effectDotScreen = new DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8);

	const color = getContext('color');

	const effectColorify1 = new ShaderPass(ColorifyShader);
	const effectColorify2 = new ShaderPass(ColorifyShader);
	$: effectColorify1.uniforms['color'] = new THREE.Uniform(
		new THREE.Color(`hsl(${$color}, 50%, 80%)`)
	);
	$: effectColorify2.uniforms['color'] = new THREE.Uniform(
		new THREE.Color(`hsl(${$color}, 50%, 80%)`)
	);

	const gammaCorrection = new ShaderPass(GammaCorrectionShader);

	const clearMask = new ClearMaskPass(0x000000, 0);

	const { scene, camera } = useThrelte();

	const renderMask = new MaskPass(scene, $camera);
	const renderMaskInverse = new MaskPass(scene, $camera);
	renderMaskInverse.inverse = true;

	const passes = [
		gammaCorrection,
		effectDotScreen,
		clearMask,
		//renderMask,
		effectColorify1,
		//renderMaskInverse,
		//effectColorify2,
		//clearMask,
		effectVignette,
		clearMask
	];
</script>

{#each passes as pass}
	<Pass {pass} />
{/each}
