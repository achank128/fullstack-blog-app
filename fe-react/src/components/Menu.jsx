import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ post }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/posts?c=" + post.category);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [post.category]);
  return (
    <div className="menu">
      <div className="menu">
        <h1>Other posts you may like</h1>
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <img src={`${post?.img}`} alt="" />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
