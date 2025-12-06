import { useImmer } from "../../hooks/useImmer";

type Todo = {
	id: number;
	label: string;
	done: boolean;
};

const defaultTodos: Todo[] = [
	{ id: 1, label: "Wire routes", done: true },
	{ id: 2, label: "Style layout", done: false },
	{ id: 3, label: "Ship demo", done: false },
];

export const TodoDemo = () => {
	const [todos, updateTodos] = useImmer(defaultTodos);
	const remaining = todos.filter((todo) => !todo.done).length;

	const toggleTodo = (id: number) => {
		updateTodos((draft) => {
			const todo = draft.find((item) => item.id === id);
			if (todo) {
				todo.done = !todo.done;
			}
		});
	};

	return (
		<div className="flex flex-col gap-3 text-sm text-slate-700">
			<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
				Project tasks · {remaining} open
			</p>
			<ul className="space-y-2">
				{todos.map((todo) => (
					<li
						key={todo.id}
						className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
					>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={todo.done}
								onChange={() => toggleTodo(todo.id)}
								className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
							/>
							<span className={todo.done ? "text-slate-400 line-through" : ""}>
								{todo.label}
							</span>
						</label>
						<span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
							{todo.done ? "Done" : "Pending"}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};
