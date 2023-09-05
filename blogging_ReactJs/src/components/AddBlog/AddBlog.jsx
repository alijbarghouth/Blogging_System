import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosWithAuth from "../axiosWithAuth/axiosWithAuth ";

function AddBlog({ loginData }) {
  let navigate = useNavigate();
  let [blog, setblog] = useState({
    title: "",
    user_id: "",
    file_path: "",
    description: "",
    content: "",
  });

  let getFormValues = (e) => {
    let myBlog = { ...blog };
    myBlog[e.target.name] = e.target.value;
    myBlog["user_id"] = loginData.sub;
    setblog(myBlog);
  };

  async function addBlog(e) {
    e.preventDefault();
    try {
      await axiosWithAuth.post("http://127.0.0.1:8001/api/addBlog", blog);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Blog added successfully!",
        confirmButtonColor: "#333",
        background: "#222",
      });
      navigate("/blog");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const response = await axiosWithAuth.post(
            "http://127.0.0.1:8001/api/refresh"
          );
          localStorage.setItem("token", response.data.authorization.token);
          await axiosWithAuth.post("http://127.0.0.1:8001/api/addBlog", blog);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Blog added successfully!",
            confirmButtonColor: "#333",
            background: "#222",
          });
          navigate("/blog");
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You are not authorized to perform this action. Please log in.",
            confirmButtonColor: "#333",
            background: "#222",
          });
        }
      } else {
        // Handle other errors
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while adding the blog. Please try again later.",
          confirmButtonColor: "#333",
          background: "#222",
        });
      }
    }
  }
  return (
    <section>
      <div className="container mt-5">
        <h1>Add Blog</h1>
        <form method="POST" onSubmit={addBlog}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              onChange={getFormValues}
              className="form-control"
              id="title"
              name="title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              id="content"
              onChange={getFormValues}
              name="content"
              rows={6}
              required
              defaultValue={""}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              onChange={getFormValues}
              className="form-control"
              id="description"
              name="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="file_path" className="form-label">
              Image Path
            </label>
            <input
              type="text"
              onChange={getFormValues}
              className="form-control"
              id="file_path"
              name="file_path"
            />
          </div>
          <button type="submit" className="dark-mode-button">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddBlog;
