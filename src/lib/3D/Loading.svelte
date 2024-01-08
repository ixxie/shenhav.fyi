<script lang="ts">
	import { T, useTask } from '@threlte/core';

	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const color = getContext('color') as Readable<number>;
	$: shade = `hsl(${$color}, 90%, 70%)`;

	const rate = 1;
	let rotation = 0;
	useTask((delta) => {
		rotation += rate * delta;
	});
</script>

<T.Group rotation={[rotation / 2, rotation, 0]} scale={0.3}>
	<T.Mesh position={[3, 0, 0]}>
		<T.SphereGeometry />
		<T.MeshToonMaterial color={shade} />
	</T.Mesh>
	<T.Mesh position={[-3, 0, 0]}>
		<T.SphereGeometry />
		<T.MeshToonMaterial color={shade} />
	</T.Mesh>
</T.Group>
