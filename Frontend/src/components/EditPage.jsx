import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { blog } = location.state || {};

    const[title, setTitle] = useState(blog?.title);
    const[content, setContent] = useState(blog?.content);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleContent = (e) => {
        setContent(e.target.value);
    }


    const handleSubmit = async() => {
        //sending data to server
        try
        {
            let data = {title, content};
            let result = await fetch("http://localhost:3000/create", {method: "POST", headers: {
                "Content-Type" : "application/json",
            }, body : JSON.stringify(data)});
            let r = await result.text();
            console.log(r);

            //after editing is complete navigate back to the home page
            navigate('/');
        }
        catch(err)
        {
            console.log("Error:", err)
        }

        
    };

    return (
        <div>
            <div className='w-3/4 m-auto py-4'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit()
                    }}>
                    <div className='mb-4'>
                        <label htmlFor="title">Title: </label>
                        <input value={title} onChange={handleTitle}
                            id='title' 
                            className='border shadow-sm w-1/2 px-3 py-2'
                            type="text" maxLength={25} required
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="content">Content: </label>
                        <textarea value={content} onChange={handleContent}
                            id='content' required
                            className='border shadow-sm w-full h-[40vh] px-3 py-2'
                        />
                    </div>
                    <button type="submit" className={`w-full bg-blue-500 text-white px-4 py-2 rounded`}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditPage
