import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/posts/" + id);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="img" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="avt" />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username ? (
            <div className="edit">
              <Link to={`/write?edit=3`}>
                <img src={Edit} alt="edit" />
              </Link>
              <span onClick={handleDelete}>
                <img src={Delete} alt="delete" />
              </span>
            </div>
          ) : null}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>

      <Menu post={post} />
    </div>
  );
};

export default Single;
