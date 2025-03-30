import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Loading from "./components/loading/loading";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "./pages/error/NotFound";
import Profile from "./pages/user/Profile";
import BookDetail from "./pages/user/BookDetail";
import BorrowedBookPage from "./pages/user/BorrowedBookPage";
import Forum from "./pages/user/Forum";
import ForumPost from "./pages/user/forum-post/ForumPost";
import ForumDetail from "./pages/user/ForumDetail";

const Landing = lazy(() => import("./pages/landing/Landing"));
const Login = lazy(() => import("./pages/auth/login/Login"));
const Register = lazy(() => import("./pages/auth/register/Register"));
const Collections = lazy(() => import("./pages/user/Collections"));

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element:  <NotFound />},
  { path: "/profile", element: <Profile /> },
  { path: "/collections", element: <Collections /> },
  { path: "/books/:id", element: <BookDetail /> },
  { path: "/borrowed-books", element: <BorrowedBookPage /> },
  { path: "/forum", element: <Forum /> },
  { path: "/forum/forum-post", element: <ForumPost /> },
  { path: "/forum-view/:id", element: <ForumDetail /> },
]);

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
