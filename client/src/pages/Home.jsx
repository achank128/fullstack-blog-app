import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/posts" + category);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [category]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
              <Link to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
