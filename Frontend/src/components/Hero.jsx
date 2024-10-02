import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Hero = ({ data, refreshData }) => {
  async function deleteRequest(id) {
    try {
      let data = {
        id,
      };
      let result = await fetch("http://localhost:3000/blog/delete", {
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

  return (
    <div className="w-full py-4 px-10">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
        {data.map((blog) => (
          <div
            title={blog.title}
            className="p-4 rounded-md shadow-md hover:scale-105 transition duration-300 border"
            key={blog.id}
          >
            <div className="flex justify-between items-center">
              <div className="title text-xl font-bold">{blog.title}</div>
              <div className="flex space-x-2">
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
                      deleteRequest(blog.id);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="content">{blog.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;

// import React from 'react'

// const Hero = ({data}) => {

//   return (
//     <div className='w-full py-4 px-10'>
//       <div className='w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3'>
//       {data.map((blog) =>
//         <div title={blog.title} className='p-4 rounded-md shadow-md hover:scale-105 transition duration-300 border' key={blog.id}>
//           <div>
//             <div className="title text-xl font-bold">{blog.title}</div>
//             edit icon
//             delete icon
//           </div>
//           <div className='content'>{blog.content}</div>
//         </div>
//       )}
//       </div>
//     </div>
//   )
// }

// export default Hero
