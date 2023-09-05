import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function AdminUpdateBlog({ loginData }) {
  let { blogId } = useParams();
  let navigate = useNavigate();
  let [description, setDesciption] = useState("");
  let [content, setcontent] = useState("");
  let [title, settitle] = useState("");
  let [file_path, setFile_path] = useState("");

  async function getCustomBlog() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not authorized to view this content. Please log in.",
          confirmButtonColor: "#333",
          background: "#222",
        });
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let { data } = await axios.get(
        `http://127.0.0.1:8001/api/showBlog/${blogId}`,
        { headers }
      );
      setDesciption(data.blog.description);
      setFile_path(data.blog.file_path);
      settitle(data.blog.title);
      setcontent(data.blog.content);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateBlog(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You are not authorized to perform this action. Please log in.",
        confirmButtonColor: "#333",
        background: "#222",
      });
      return;
    }

    let blog = {
      title: title,
      user_id: loginData.sub,
      file_path: file_path,
      description: description,
      content: content,
    };

    try {
      let { data } = await axios.put(
        `http://127.0.0.1:8001/api/updateBlog/${blogId}/${loginData.sub}`,
        blog,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/blog");
    } catch (error) {
      console.error(error);
    }
  }

  const handleDescriptionChange = (event) => {
    setDesciption(event.target.value);
  };
  const handleTitleChange = (event) => {
    settitle(event.target.value);
  };
  const handleContentChange = (event) => {
    setcontent(event.target.value);
  };
  const handleFilePathChange = (event) => {
    setFile_path(event.target.value);
  };

  useEffect(() => {
    getCustomBlog();
  }, []);

  return (
    <section>
      <div className="container mt-5">
        <h1>Update Blog</h1>
        <form method="POST" onSubmit={updateBlog}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
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
              value={content}
              onChange={handleContentChange}
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
              value={description}
              onChange={handleDescriptionChange}
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
              value={file_path}
              type="text"
              onChange={handleFilePathChange}
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

export default AdminUpdateBlog;
