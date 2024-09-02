export default function debounce(fn: any, delay: number): (...args: any) => void {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return function (...args) {
		if (timeoutId) clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
