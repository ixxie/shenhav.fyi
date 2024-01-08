import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

function mergeObject(object) {
	object.updateMatrixWorld(true);

	const geometry = [];
	object.traverse((c) => {
		if (c.isMesh) {
			const g = c.geometry;
			g.applyMatrix4(c.matrixWorld);
			for (const key in g.attributes) {
				if (key !== 'position' && key !== 'normal') {
					g.deleteAttribute(key);
				}
			}
			geometry.push(g.toNonIndexed());
		}
	});

	const mergedGeometries = BufferGeometryUtils.mergeGeometries(geometry, false);
	const mergedGeometry = BufferGeometryUtils.mergeVertices(mergedGeometries);

	const group = new THREE.Group();
	const mesh = new THREE.Mesh(mergedGeometry);
	group.add(mesh);
	return group;
}

export function initModel(gltf) {
	if (!gltf) {
		return;
	}
	const originalModel = mergeObject(gltf.scene);
	originalModel.children[0].geometry.computeBoundingBox();

	return originalModel.clone();
}
