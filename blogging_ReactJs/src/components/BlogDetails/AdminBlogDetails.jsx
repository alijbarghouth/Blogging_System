import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function AdminBlogDetails({ loginData }) {
  const { blogId } = useParams();
  const [blogging, setBlog] = useState({});
  const [comments, setComment] = useState([]);
  let [comment, setComments] = useState({
    content: "",
  });

  let getFormValues = (e) => {
    console.log(comment);
    let myComment = { ...comment };
    myComment[e.target.name] = e.target.value;
    myComment["user_id"] = loginData.sub;
    myComment["blog_id"] = blogId;
    setComments(myComment);
  };

  let navigate = useNavigate();

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
        navigate("/blog");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let { data } = await axios.get(
        `http://127.0.0.1:8001/api/showBlog/${blogId}`,
        { headers }
      );
      setBlog(data.blog);
    } catch (error) {
      console.error(error);
    }
  }

  async function getComment() {
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
        navigate("/blog");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let { data } = await axios.get(
        `http://127.0.0.1:8001/api/getCommentByBlogId/${blogId}`,
        { headers }
      );
      setComment(data.comments);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteBlog(id) {
    try {
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

      await axios.delete(`http://127.0.0.1:8001/api/adminDeleteBlog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/blog");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteComment(id) {
    try {
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

      await axios.delete(`http://127.0.0.1:8001/api/adminDeleteComment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getComment();
    } catch (error) {
      console.error(error);
    }
  }

  async function addComment(e) {
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

    await axios.post("http://127.0.0.1:8001/api/addComment", comment, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments({ content: "" });
    getComment();
  }

  useEffect(() => {
    getCustomBlog();
    getComment();
  }, []);
  return (
    <>
      <div>
        <div className="container mt-5">
          <h1>{blogging.title} </h1>
          <hr />
          <p>{blogging.content}</p>

          <button
            className="dark-mode-button"
            onClick={() => deleteBlog(blogId)}>
            Delete
          </button>
          <Link to={`/adminUpdateBlog/${blogId}`}>
            <button className="dark-mode-button">Update</button>
          </Link>
          <hr />
          <h2>Comments</h2>
          {comments.map((comment) => {
            return (
              <div className="card mb-2" key={comment.id}>
                <div className="card-body">
                  <p>{comment.content}</p>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="dark-mode-button">
                    Delete
                  </button>
                  <Link to={`/adminUpdateComment/${comment.id}`}>
                    <button className="dark-mode-button">Update</button>
                  </Link>
                </div>
              </div>
            );
          })}
          <div className="mt-4">
            <h3>Add a Comment</h3>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="content"
                name="content"
                placeholder="Your comment..."
                value={comment.content}
                onChange={getFormValues}
              />
              <div className="input-group-append">
                <button className="dark-mode-button" onClick={addComment}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminBlogDetails;
