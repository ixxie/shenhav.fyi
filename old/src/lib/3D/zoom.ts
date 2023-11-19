import * as THREE from 'three';
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function zoomCameraToSelection({
	camera,
	controls,
	selection,
	fitOffset = 1.1,
	offsetWidth = undefined,
	offsetHeight = undefined
}: {
	camera: THREE.PerspectiveCamera;
	controls: OrbitControls;
	selection: THREE.Object3D[];
	fitOffset?: number;
	offsetHeight?: number;
	offsetWidth?: number;
}) {
	if (!controls || !camera || selection.some((obj) => obj == undefined)) {
		return;
	}

	const box = new THREE.Box3();

	for (const object of selection) box.expandByObject(object);

	const size = box.getSize(new THREE.Vector3());
	const center = box.getCenter(new THREE.Vector3());

	const maxSize = Math.max(size.x, size.y, size.z);
	const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
	const fitWidthDistance = fitHeightDistance / camera.aspect;
	const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

	const direction = controls.target
		.clone()
		.sub(camera.position)
		.normalize()
		.multiplyScalar(distance);

	controls.maxDistance = distance * 10;
	controls.target.copy(center);

	camera.near = distance / 100;
	camera.far = distance * 100;
	camera.updateProjectionMatrix();

	camera.position.copy(controls.target).sub(direction);

	controls.update();
}
