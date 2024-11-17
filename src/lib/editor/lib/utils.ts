export function getSelection() {
	const selection = window.getSelection();
	let rect =
		(selection?.rangeCount ?? 0) > 0 ? selection?.getRangeAt(0)?.getBoundingClientRect() : null;
	const text = selection?.toString();
	const active = !selection?.isCollapsed;
	return {
		rect,
		text,
		active
	};
}
