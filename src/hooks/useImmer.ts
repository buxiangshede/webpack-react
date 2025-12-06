import { type Draft, freeze, produce } from "immer";
import { useCallback, useState } from "react";

export type DraftFunction<S> = (draft: Draft<S>) => void;
type Updater<S> = (arg: S | DraftFunction<S>) => void;
type ImmerHook<S> = [S, Updater<S>];

export function useImmer<S>(initialval: S | (() => S)): ImmerHook<S>;
export function useImmer<T>(initialval: T): ImmerHook<T> {
	const getInitialValue = () =>
		typeof initialval === "function"
			? freeze((initialval as () => T)(), true)
			: freeze(initialval, true);

	const [val, updateVal] = useState(getInitialValue);

	return [
		val,
		useCallback((updater: T | DraftFunction<T>) => {
			if (typeof updater === "function") {
				updateVal(produce(updater as DraftFunction<T>));
			} else {
				updateVal(updater);
			}
		}, []),
	];
}
