import * as THREE from 'three';

export function createGradientMap(n) {
	const shades = new Uint8Array(n);

	for (let c = 0; c <= shades.length; c++) {
		shades[c] = (c / shades.length) * 256;
	}

	const gradientMap = new THREE.DataTexture(shades, shades.length, 1, THREE.RedFormat);
	gradientMap.needsUpdate = true;

	return gradientMap;
}
