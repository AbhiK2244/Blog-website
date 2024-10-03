import React from "react";
import { MdDelete } from "react-icons/md";
import BaseURL from "../../BaseURL.js";
import { useNavigate } from "react-router-dom";

const Hero = ({ data, refreshData }) => {

  const navigate = useNavigate();
  async function deleteRequest(id) {
    try {
      let data = {
        id,
      };
      let result = await fetch(`${BaseURL}/blog/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let r = await result.text();
      //after the blog has been deleted, Main page need to be updated so this refreshData has been called
      refreshData();
      console.log(r);
    } catch (err) {
      console.log("Error:", err);
    }
  }

  const handleClick = (blog) => {
    navigate(`blog/${blog.id}`,{ state: {blog}})
  }

  const contentShortner = (content) => {
    if(content.length > 50)
      return content.substring(0, 150) + "...";
    else
      return content
  }

  return (
    <div className="w-full py-4 px-10">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
        {data.map((blog) => (
          <div onClick={() => handleClick(blog)}
            key={blog.id} className="p-4 rounded-md cursor-pointer shadow-md hover:scale-105 transition duration-300 border"
            title={blog.title}
            >
            <div className="flex justify-between items-center">
              <div className="title text-xl font-bold">{blog.title}</div>
              <div className="flex space-x-2">
                <div
                  title="delete"
                  className="cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-md p-1"
                  >
                  <MdDelete
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteRequest(blog.id);
                    }}
                    />
                </div>
              </div>
            </div>
            <div className="content">{contentShortner(blog.content)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;