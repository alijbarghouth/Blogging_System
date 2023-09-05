import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function AdminUpdateComment({ loginData }) {
  let { commentId } = useParams();
  let navigate = useNavigate();
  let [content, setcontent] = useState("");
  let [blogId, setBlogId] = useState("");

  async function getCustomComment() {
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
        `http://127.0.0.1:8001/api/showComment/${commentId}`,
        { headers }
      );
      setcontent(data.comment.content);
      setBlogId(data.comment.blog_id);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateComment(e) {
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

    let newComment = {
      user_id: loginData.sub,
      blog_id: blogId,
      content: content,
    };
    try {
      await axios.put(
        `http://127.0.0.1:8001/api/adminUpdateComment/${commentId}`,
        newComment,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/blog");
    } catch (error) {
      console.error(error);
    }
  }

  const handleContentChange = (event) => {
    setcontent(event.target.value);
  };

  useEffect(() => {
    getCustomComment();
  }, []);

  return (
    <section>
      <div className="container mt-5">
        <h1>Update Comment</h1>
        <form method="POST" onSubmit={updateComment}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Comment
            </label>
            <input
              type="text"
              value={content}
              onChange={handleContentChange}
              className="form-control"
              id="title"
              name="title"
              required
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

export default AdminUpdateComment;
