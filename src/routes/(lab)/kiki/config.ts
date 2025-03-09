export interface TagConfig {
	name: string;
	objects: string[];
	emoji: string;
}

export interface SchematicConfig {
	tags: TagConfig[];
	dim: {
		real: { width: number; height: number };
		svg: { width: number; height: number };
	};
}

export const config: SchematicConfig = {
	tags: [
		{ name: 'Sleeping', objects: ['bed', 'dogcage'], emoji: '💤' },
		{
			name: 'Eating',
			objects: [
				'table',
				'back_seats',
				'kitchen_counter',
				'kitchen_cabinet',
				'kitchen_drawer',
				'cleanwater',
				'wastewater'
			],
			emoji: '🍽️'
		},
		{
			name: 'Driving',
			objects: ['front_seats', 'back_seats', 'dogcage'],
			emoji: '🚙'
		},

		{
			name: 'Storage',
			objects: ['kitchen_cabinet', 'high_cabinet', 'shelves', 'kitchen_drawer'],
			emoji: '📦'
		},

		{
			name: 'Technical',
			objects: ['electric', 'cleanwater', 'wastewater'],
			emoji: '🛠️'
		}
	],
	dim: {
		real: {
			// mm
			width: 8750.2031,
			height: 5926.3555
		},
		svg: {
			// viewbox
			width: 326.50012,
			height: 221.13267
		}
	}
};
