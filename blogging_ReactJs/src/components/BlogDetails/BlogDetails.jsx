import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosWithAuth from "../axiosWithAuth/axiosWithAuth ";

function BlogDetails({ loginData }) {
  const { blogId } = useParams();
  const [blogging, setBlog] = useState({});
  const [comments, setComment] = useState([]);
  let [comment, setComments] = useState({
    content: "",
  });
  let navigate = useNavigate();
  let getFormValues = (e) => {
    console.log(comment);
    let myComment = { ...comment };
    myComment[e.target.name] = e.target.value;
    myComment["user_id"] = loginData.sub;
    myComment["blog_id"] = blogId;
    setComments(myComment);
  };

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
      let { data } = await axiosWithAuth.get(
        `http://127.0.0.1:8001/api/showBlog/${blogId}`
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
        return;
      }

      let { data } = await axiosWithAuth.get(
        `http://127.0.0.1:8001/api/getCommentByBlogId/${blogId}`
      );
      setComment(data.comments);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteBlog(id) {
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

    try {
      await axiosWithAuth.delete(
        `http://127.0.0.1:8001/api/deleteBlog/${id}/${loginData.sub}`
      );
      navigate("/blog");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteComment(id) {
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

    try {
      await axiosWithAuth.delete(
        `http://127.0.0.1:8001/api/deleteComment/${id}/${loginData.sub}`
      );
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

    try {
      await axiosWithAuth.post("http://127.0.0.1:8001/api/addComment", comment);
      setComments({ content: "" });
      getComment();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCustomBlog();
    getComment();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <h1>{blogging.title} </h1>
        <p>{blogging.content}</p>
        {loginData.sub == blogging.user_id ? (
          <>
            <button
              className="dark-mode-button"
              onClick={() => deleteBlog(blogId)}>
              Delete
            </button>
            <Link to={`/updateBlog/${blogId}`}>
              <button className="dark-mode-button">Update</button>
            </Link>
          </>
        ) : (
          <></>
        )}
        <hr />
        <h2>Comments</h2>
        {comments.map((comment) => {
          return (
            <div className="card mb-2" key={comment.id}>
              <div className="card-body">
                <p>{comment.content}</p>
                {loginData.sub == comment.user_id ? (
                  <>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="dark-mode-button">
                      Delete
                    </button>
                    <Link to={`/updateComment/${comment.id}`}>
                      <button className="dark-mode-button">Update</button>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
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
              placeholder="Your comment..."
              value={comment.content}
              onChange={getFormValues}
              name="content"
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
  );
}

export default BlogDetails;
