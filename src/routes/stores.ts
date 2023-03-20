import { tweened } from 'svelte/motion';
import { sineInOut } from 'svelte/easing';

const mod = (n: number) => ((n % 360) + 360) % 360;
const round = (n: number) => Math.round(n * 100) / 100;

export const color = tweened(0, {
	duration: 2000,
	easing: sineInOut,
	interpolate: (from, to) => {
		const direct = Math.abs(to - from);
		const indirect = 360 - direct;
		if (direct < indirect) {
			return (t) => round(from + t * (to - from));
		} else {
			const sign = -(to - from) / direct;
			return (t) => round(mod(from + sign * t * indirect));
		}
	}
});
