import type { ReactNode } from "react";

type DemoCardProps = {
	title: string;
	description: string;
	children: ReactNode;
};

export const DemoCard = ({ title, description, children }: DemoCardProps) => {
	return (
		<section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
			<div>
				<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
				<p className="text-sm text-slate-600">{description}</p>
			</div>
			<div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-4">
				{children}
			</div>
		</section>
	);
};
