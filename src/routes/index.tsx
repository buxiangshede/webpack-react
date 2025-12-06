import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Loading } from "@/components/common/Loading";
import { PageNotFound } from "@/components/common/PageNotFound";
import { AppLayout } from "@/layout";
import { About } from "@/pages/About";
import Home from "@/pages/Home";

const routes = [
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "about", element: <About /> },
		],
	},
	{ path: "*", element: <PageNotFound /> },
];

export const AppRouter = () => {
	const element = useRoutes(routes);
	return <Suspense fallback={<Loading />}>{element}</Suspense>;
};
