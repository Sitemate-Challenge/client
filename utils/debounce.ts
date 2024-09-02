type DebounceFunction = (...args: any[]) => void;

const debounce = <T extends DebounceFunction>(func: T, delay: number): DebounceFunction => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return function (...args: Parameters<T>) {
		if (timeoutId) clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
};

export default debounce;
