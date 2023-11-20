export interface Page {
	file: string;
	rotation?: [number, number, number];
	spin?: [number, number, number];
	author: string;
	authorUrl: string;
	model: string;
	modelUrl: string;
	notes: string;
}

export const pages: { [key: string]: Page } = {
	home: {
		file: 'lighthouse.glb',
		rotation: [0, 1, 0],
		spin: [0, 1, 0],
		author: 'libblekibble',
		authorUrl: 'https://sketchfab.com/libblekibble',
		model: 'Low Poly Lighthouse Scene',
		modelUrl:
			'https://sketchfab.com/3d-models/low-poly-lighthouse-scene-7cbc357ed5ce44a1bf723c13b9b212d1',
		notes:
			'Removed all elements of the scene except the lighthouse and house, rendered in monochrome with toonshading.'
	},
	about: {
		file: 'swissknife.glb',
		rotation: [-0.5, 0, 0],
		spin: [0, 1, 0],
		author: 'Hadrien Farre',
		authorUrl: 'https://farrehadrien.wixsite.com/portfolio',
		model: 'Swiss Army Knife',
		modelUrl: 'https://sketchfab.com/3d-models/swiss-army-knife-bf9e6f7de2a24d169f3e6236ab3096b4',
		notes: 'Rendered in monochrome with toonshading.'
	},
	services: {
		file: 'rocket.glb',
		rotation: [0, -Math.PI / 2, Math.PI / 4],
		spin: [0, 1, 0],
		author: 'remarkable.twitch',
		authorUrl: 'https://sketchfab.com/remarkable.twitch',
		model: 'Red and White Rocket',
		modelUrl:
			'https://sketchfab.com/3d-models/red-and-white-rocket-a929405aab3641169756beb6b11454ac',
		notes: 'Rendered in monochrome with toonshading.'
	},
	contact: {
		file: 'computer.glb',
		spin: [0, 1, 0],
		author: 'Tyler Halterman',
		authorUrl: 'https://www.tylerphalterman.com/',
		model: 'Desktop Computer',
		modelUrl: 'https://sketchfab.com/3d-models/desktop-computer-561abc2fc95941609fc7bc6f232895c2',
		notes: 'Rendered in monochrome with toonshading.'
	}
};
