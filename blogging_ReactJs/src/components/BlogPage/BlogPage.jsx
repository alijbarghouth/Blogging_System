import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../axiosWithAuth/axiosWithAuth ";

function BlogPage({ isAdmin }) {
  const [blogs, setBlogs] = useState([]);

  async function getBlog() {
    try {
      const { data } = await axiosWithAuth.get(
        "http://127.0.0.1:8001/api/getAllBlog"
      );
      setBlogs(data.blogs);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const response = await axiosWithAuth.post(
            "http://127.0.0.1:8001/api/refresh"
          );
          localStorage.setItem("token", response.data.authorization.token);
          const { data } = await axiosWithAuth.get(
            "http://127.0.0.1:8001/api/getAllBlog"
          );
          setBlogs(data.blogs);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        console.error("Error:", error);
      }
    }
  }

  useEffect(() => {
    getBlog();
  }, []);

  const getTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDifference = currentTime - createdAtDate;

    if (timeDifference < 60000) {
      return "just now";
    } else if (timeDifference < 3600000) {
      return `${Math.floor(timeDifference / 60000)} minutes ago`;
    } else if (timeDifference < 86400000) {
      return `${Math.floor(timeDifference / 3600000)} hours ago`;
    } else if (timeDifference < 604800000) {
      return `${Math.floor(timeDifference / 86400000)} days ago`;
    } else {
      return `${Math.floor(timeDifference / 604800000)} weeks ago`;
    }
  };

  return (
    <>
      <section className="container mt-4 parent">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {blogs.map((blog) => {
            return (
              <div className="col" key={blog.id}>
                <div className="card h-100 shadow p-1 mb-5 rounded">
                  <img
                    src={require("./images/wp8890312.jpg")}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body text-center">
                    {isAdmin ? (
                      <Link
                        to={`/adminBlog/${blog.id}`}
                        className="card-title fw-bold text-decoration-none">
                        {blog.title}
                      </Link>
                    ) : (
                      <Link
                        to={`/blog/${blog.id}`}
                        className="card-title fw-bold text-decoration-none">
                        {blog.title}
                      </Link>
                    )}
                    <p className="card-text">{blog.description}</p>
                  </div>
                  <div className="card-footer text-center">
                    <small className="text-muted">
                      {getTimeAgo(blog.created_at)}
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default BlogPage;
