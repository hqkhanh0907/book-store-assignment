/* eslint-disable react-refresh/only-export-components */
import loadable from "@loadable/component";

const Dashboard = loadable(() => import("@/views/dashboard/Dashboard"), {
  fallback: <h1>Loading</h1>,
});
const BookItemDetail = loadable(
  () => import("@/views/BookItemDetail/BookItemDetail"),
  {
    fallback: <h1>Loading</h1>,
  }
);
const appRoute = () => {
  return [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/books/:keys",
      element: <BookItemDetail />,
    },
  ];
};

export default appRoute;