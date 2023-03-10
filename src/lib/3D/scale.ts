import type { PerspectiveCamera } from 'three';
import type { Size } from 'threlte';

export const heightAtZDepth = (depth: number, camera: PerspectiveCamera) => {
	const vFOV = (camera.fov * Math.PI) / 180;
	return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

export const zDepthForHeight = (height: number, camera: PerspectiveCamera) => {
	const vFOV = (camera.fov * Math.PI) / 180;
	return height / (2 * Math.tan(vFOV / 2));
};

export const widthAtZDepth = (depth: number, camera: PerspectiveCamera) => {
	const height = heightAtZDepth(depth, camera);
	return height * camera.aspect;
};

export const pxToUnits = (px: number, distance: number, camera: PerspectiveCamera, size: Size) => {
	const viewportHeightPx = size.height;
	const viewportHeightUnits = heightAtZDepth(distance, camera);
	const pxPerUnit = viewportHeightPx / viewportHeightUnits;
	return px / pxPerUnit;
};

export const unitsToPx = (
	units: number,
	distance: number,
	camera: PerspectiveCamera,
	size: Size
) => {
	const viewportHeightPx = size.height;
	const viewportHeightUnits = heightAtZDepth(distance, camera);
	const pxPerUnit = viewportHeightPx / viewportHeightUnits;
	return pxPerUnit * units;
};

export const scaleForWidth = (
	nativeWidth: number,
	cameraDistance: number,
	camera: PerspectiveCamera
) => widthAtZDepth(cameraDistance, camera) / nativeWidth;

export const scaleForHeight = (
	nativeHeight: number | undefined,
	cameraDistance: number | undefined,
	camera: PerspectiveCamera
) => (nativeHeight && cameraDistance ? heightAtZDepth(cameraDistance, camera) / nativeHeight : 1);

export const scaleForFit = (
	nativeWidth: number,
	nativeHeight: number,
	cameraDistance: number,
	camera: PerspectiveCamera
) =>
	Math.min(
		scaleForHeight(nativeHeight, cameraDistance, camera),
		scaleForWidth(nativeWidth, cameraDistance, camera)
	);

export function getDims(model) {
	if (model) {
		const box = model.children[0].geometry.boundingBox;
		const max = box.max;
		const min = box.min;
		return { x: max.x - min.x, y: max.y - min.y, z: max.z - min.z };
	}
}

export function getSize(model) {
	if (model) {
		const dims = getDims(model);
		console.log('dims', dims);
		if (dims) {
			return Math.sqrt(dims.x ** 2 + dims.y ** 2 + dims.z ** 2);
		}
	}
}

export function getCenter(model) {
	if (model) {
		const box = model.children[0].geometry.boundingBox;
		console.log('box', box);
		const min = box.min;
		const dims = getDims(model);
		if (dims) {
			return { x: min.x + dims.x / 2, y: min.y + dims.y / 2, z: min.z + dims.z / 2 };
		}
	}
}
