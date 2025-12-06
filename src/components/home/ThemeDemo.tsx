import { useMemo, useState } from "react";

const themes = [
	{
		name: "Daybreak",
		preview: ["#cffafe", "#06b6d4", "#0f172a"],
		description: "Bright + airy palette for dashboards",
	},
	{
		name: "Aurora",
		preview: ["#fdf2f8", "#ec4899", "#312e81"],
		description: "Vibrant gradients for marketing pages",
	},
	{
		name: "Verdant",
		preview: ["#ecfccb", "#65a30d", "#1a2e05"],
		description: "Organic colors for product sites",
	},
];

export const ThemeDemo = () => {
	const [activeTheme, setActiveTheme] = useState(0);
	const theme = themes[activeTheme];

	const gradient = useMemo(() => {
		const [start, middle, end] = theme.preview;
		return `linear-gradient(110deg, ${start}, ${middle}, ${end})`;
	}, [theme.preview]);

	return (
		<div className="flex flex-col gap-4">
			<div
				className="h-24 rounded-lg border border-slate-200"
				style={{ backgroundImage: gradient }}
			/>
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-base font-semibold text-slate-900">{theme.name}</p>
					<p className="text-sm text-slate-600">{theme.description}</p>
				</div>
				<div className="flex gap-1">
					{themes.map((item, index) => (
						<button
							key={item.name}
							type="button"
							className={`h-2 w-6 rounded-full transition ${
								index === activeTheme ? "bg-sky-500" : "bg-slate-200"
							}`}
							onClick={() => setActiveTheme(index)}
							aria-label={`Activate ${item.name} theme`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
