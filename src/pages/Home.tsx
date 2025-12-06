import { memo } from "react";
import Index from "@/components/dapp/Index";

const Home = () => {
	return (
		<section>
			<h2>Home</h2>
			<p>Welcome to the demo React & Webpack starter.</p>
			<Index />
		</section>
	);
};

export default memo(Home);
