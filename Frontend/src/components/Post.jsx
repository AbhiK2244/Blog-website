import React from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BaseURL from "../../BaseURL.js";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

const Post = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { blog } = location.state || {};
    async function deleteRequest(id, isDeleteButton = false) {
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
        console.log(r);

        //if this fuction is called by clicking the delete button then only it will navigate to main page
        if(isDeleteButton)
        {
          navigate("/")
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }

    const goBack = () => {
      navigate(-1);
    };

  return (
    <div>
      <button
        onClick={goBack}
        className="flex items-center space-x-1 px-1 my-2 font-bold"
      >
        <BiArrowBack size={24} />
        <span>Go Back</span>
      </button>
    <div className='flex justify-center items-center w-full h-[90vh]'>
      <div
            title={blog.title}
            className="p-4 m-5 rounded-md shadow-md w-full h-[90vh] border"
            key={blog.id}
            >
              <div className="flex space-x-2 justify-end">
                <Link
                  onClick={() => {
                    deleteRequest(blog.id);
                  }}
                  to= "/blog/edit" 
                  state= {{blog}}
                  >
                  <div
                    title="edit"
                    className="cursor-pointer hover:bg-blue-700 bg-blue-500 text-white rounded-md p-1"
                    >
                    <MdEdit />
                  </div>
                </Link>
                <div
                  title="delete"
                  className="cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-md p-1"
                  >
                  <MdDelete
                    onClick={() => {
                      deleteRequest(blog.id, true);
                    }}
                    />
                </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="title text-3xl font-bold">{blog.title}</div>
              </div>
            <div className="content border mt-5 py-5 shadow-sm px-5 text-xl">{blog.content}</div>
          </div>
    </div>
  </div>
  )
}

export default Post
