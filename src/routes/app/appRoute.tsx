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
      path: "/book-store-assignment/",
      element: <Dashboard />,
    },
    {
      path: "/book-store-assignment/books/",
      element: <BookItemDetail />,
    },
  ];
};

export default appRoute;
