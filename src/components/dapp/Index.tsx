import { produceWithImmer } from "@stores/index";
import { useAtom } from "jotai";
import { useEffect } from "react";

const Index = () => {
	const [data, setData] = useAtom(produceWithImmer);
	useEffect(() => {
		console.log("render----dom");
	}, []);
	return (
		<>
			{/* <button type="button" onClick={() => setData({ name: "ss" })}>
				{data.name}
			</button> */}
			<div>
				<p>名称：{data.name}</p>
				<p>标签：{data.tags.join(", ")}</p>
			</div>
			<button
				type="button"
				onClick={() =>
					setData((draft) => {
						draft.name = "jotai1";
					})
				}
			>
				{data.name}
			</button>
			<button
				type="button"
				onClick={() => {
					setData((draft) => {
						draft.tags.push(`tag-${draft.tags.length + 1}`);
					});
				}}
			>
				追加标签（jotai-immer）
			</button>
		</>
	);
};

Index.whyDidYouRender = true;
export default Index;
