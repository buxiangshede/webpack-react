import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Loading } from "@/components/common/Loading";

const AppLayout = lazy(() => import("@/layout"));
const PageNotFound = lazy(() => import("@/components/common/PageNotFound"));
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const CoursesPage = lazy(() => import("@/pages/Courses"));
const LearnPage = lazy(() => import("@/pages/Learn"));
// const InstructorCoursesPage = lazy(() => import("@/pages/InstructorCourses"));
const InstructorNewCoursePage = lazy(
  () => import("@/pages/InstructorNewCourse")
);
const InstructorYieldPage = lazy(() => import("@/pages/InstructorYield"));
const MePage = lazy(() => import("@/pages/Me"));

const withSuspense = (element: React.ReactElement) => (
  <Suspense fallback={<Loading />}>{element}</Suspense>
);

const routes = [
	{
		path: "/",
		element: withSuspense(<AppLayout />),
		children: [
			{ index: true, element: withSuspense(<Home />) },
			{ path: "about", element: withSuspense(<About />) },
			{ path: "courses", element: withSuspense(<CoursesPage />) },
			{ path: "learn/:id", element: withSuspense(<LearnPage />) },
			{ path: "courses/new", element: withSuspense(<InstructorNewCoursePage />) },
			// { path: "instructor/courses/new", element: <InstructorNewCoursePage /> },
			{ path: "instructor/yield", element: withSuspense(<InstructorYieldPage />) },
			{ path: "me", element: withSuspense(<MePage />) },
		],
	},
	{ path: "*", element: withSuspense(<PageNotFound />) },
];

export const AppRouter = () => {
	const element = useRoutes(routes);
	return element;
};
