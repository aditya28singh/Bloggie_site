import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCards";
import { alignProperty } from "@mui/material/styles/cssUtils";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId"); //from local storage when logged in stored
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;



// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const UserBlogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   //get user blogs
//   const getUserBlogs = async () => {
//     try {
//       const id = localStorage.getItem("userId"); //from local storage when logged in stored
//       const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
//       if (data?.success) {
//         setBlogs(data?.userBlog.blogs);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getUserBlogs();
//   }, []);
//   return (
//   <div>UserBlogs</div>
// )
// };

// export default UserBlogs;
