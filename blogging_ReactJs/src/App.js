import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import BlogPage from "./components/BlogPage/BlogPage";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Protected from "./components/Protected/Protected";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import BlogDetails from "./components/BlogDetails/BlogDetails";
import AddBlog from "./components/AddBlog/AddBlog";
import UpdateBlog from "./components/Update/UpdateBlog";
import UpdateComment from "./components/Update/UpdateComment";
import AdminBlogDetails from "./components/BlogDetails/AdminBlogDetails";
import AdminUpdateBlog from "./components/Update/AdminUpdateBlog";
import AdminUpdateComment from "./components/Update/AdminUpdateComment";
import Home from "./components/Home/Home";
import AdminProtected from "./components/Protected/AdminProtected";
import axiosWithAuth from "./components/axiosWithAuth/axiosWithAuth ";

function App() {
  let [loginData, setLoginData] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null
  );
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(isAdmin);
  async function getUserIsAdmin(token) {
    if (!token) {
      return false;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axiosWithAuth.get(
        `http://127.0.0.1:8001/api/userIsAdmin/${loginData.sub}`,
        { headers }
      );

      return data.isAdmin == true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoginDataFromLocalStorage();
    }
    async function fetchData() {
      const token = localStorage.getItem("token");
      const adminStatus = await getUserIsAdmin(token);
      setIsAdmin(adminStatus);
    }
    fetchData();
  }, []);

  function setLoginDataFromLocalStorage() {
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);
    setLoginData(decode);
  }

  function logOut() {
    localStorage.removeItem("token");
    setLoginData(null);
    return <Navigate to={"login"} />;
  }
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout loginData={loginData} logOut={logOut} />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "",
          element: (
            <Protected>
              <Home
                setLoginDataFromLocalStorage={setLoginDataFromLocalStorage}
              />
            </Protected>
          ),
        },
        {
          path: "blog",
          element: (
            <Protected>
              <BlogPage loginData={loginData} isAdmin={isAdmin} />
            </Protected>
          ),
        },
        {
          path: "adminBlog/:blogId",
          element: (
            <AdminProtected isAdmin={isAdmin}>
              <AdminBlogDetails loginData={loginData} />
            </AdminProtected>
          ),
        },
        {
          path: "adminUpdateBlog/:blogId",
          element: (
            <AdminProtected isAdmin={isAdmin}>
              <AdminUpdateBlog loginData={loginData} />
            </AdminProtected>
          ),
        },
        {
          path: "adminUpdateComment/:commentId",
          element: (
            <AdminProtected isAdmin={isAdmin}>
              <AdminUpdateComment loginData={loginData} />
            </AdminProtected>
          ),
        },
        {
          path: "addBlog",
          element: (
            <Protected>
              <AddBlog loginData={loginData} />
            </Protected>
          ),
        },
        {
          path: "blog/:blogId",
          element: (
            <Protected>
              <BlogDetails loginData={loginData} />
            </Protected>
          ),
        },
        {
          path: "updateBlog/:blogId",
          element: (
            <Protected>
              <UpdateBlog loginData={loginData} />
            </Protected>
          ),
        },
        {
          path: "updateComment/:commentId",
          element: (
            <Protected>
              <UpdateComment loginData={loginData} />
            </Protected>
          ),
        },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
