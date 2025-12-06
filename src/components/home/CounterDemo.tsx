import { useState } from "react";

export const CounterDemo = () => {
	const [count, setCount] = useState(3);

	return (
		<div className="flex flex-col gap-3">
			<p className="text-sm text-slate-600">
				Simple local state with optimistic bounds.
			</p>
			<div className="flex items-center justify-between">
				<p className="text-4xl font-semibold text-slate-900">{count}</p>
				<div className="flex gap-2">
					<button
						type="button"
						className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 transition hover:border-slate-400"
						onClick={() => setCount((value) => Math.max(0, value - 1))}
					>
						-1
					</button>
					<button
						type="button"
						className="rounded-lg bg-sky-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-sky-500"
						onClick={() => setCount((value) => value + 1)}
					>
						+1
					</button>
				</div>
			</div>
		</div>
	);
};
