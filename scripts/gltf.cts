import { NodeIO, PropertyType } from '@gltf-transform/core';

import { KHRONOS_EXTENSIONS, KHRDracoMeshCompression } from '@gltf-transform/extensions';
import { dedup, join, flatten, draco } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';

import * as fs from 'fs';

const buildOutputPath = './scripts/gltf.cjs';

run('./assets', './static/scenes');

fs.unlink(buildOutputPath, (err) => {
	if (err) {
		console.error(err);
	}
});

async function run(inputDir: string, outputDir: string) {
	const dir = fs.opendirSync(inputDir);
	for await (let file of dir) {
		console.log(`✨ optimizing ${file.name}`);
		if (file.name.includes('_raw')) {
			const cleanFile = file.name.replace('_raw', '');
			console.log('  skipping texture removal for', cleanFile);
			optimize(`${inputDir}/${file.name}`, `${outputDir}/${cleanFile}`, {
				detexture: false
			});
		} else {
			optimize(`${inputDir}/${file.name}`, `${outputDir}/${file.name}`);
		}
	}
}

interface OptimizationOptions {
	detexture: boolean;
}

async function optimize(
	input: string,
	output: string,
	options: OptimizationOptions = { detexture: true }
) {
	const io = new NodeIO()
		.registerExtensions([...KHRONOS_EXTENSIONS, KHRDracoMeshCompression])
		.registerDependencies({
			'draco3d.decoder': await draco3d.createDecoderModule(), // Optional.
			'draco3d.encoder': await draco3d.createEncoderModule() // Optional.
		});
	const document = await io.read(input);
	const steps = [
		dedup({ propertyTypes: [PropertyType.MATERIAL] }),
		flatten(),
		join({ keepNamed: false, keepMeshes: false }),
		draco({})
	];
	if (options.detexture) {
		await document.transform(detexture({}), ...steps);
	} else {
		await document.transform(...steps);
	}
	await io.write(output, document);
}

function detexture(options) {
	return (document) => {
		for (const texture of document.getRoot().listTextures()) {
			texture.dispose();
		}
	};
}
