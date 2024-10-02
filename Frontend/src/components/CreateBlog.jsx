import React from 'react'
import Navbar from './Navbar'
import { useForm } from "react-hook-form"
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
      } = useForm()

    const onSubmit = async(data) => {
        console.log(data);
        //sending data to server
        try
        {
            let result = await fetch("https://blog-website-backend-chi.vercel.app/create", {mode: 'no-cors',method: "POST", headers: {
                "Content-Type" : "application/json",
            }, 
            credentials: 'include',
            body : JSON.stringify(data)});
            let r = await result.text();
            console.log(r);
        }
        catch(err)
        {
            console.log("Error:", err)
        }

        //reset the form
        reset();

    };


  const goBack = () => {
    navigate(-1);
  };

    return (
        <div>
            <Navbar />
            <button onClick={goBack} className="flex items-center space-x-1 px-10 font-bold">
                <BiArrowBack size={24} />
                <span>Go Back</span>
            </button>
            {isSubmitting && <div className='text-blue-500 absolute top-10 left-1/2'>Loading...</div> }
            <div className='w-3/4 m-auto py-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label htmlFor="title">Title: </label>
                        <input 
                            id='title' 
                            className='border shadow-sm w-1/2 px-3 py-2'
                            type="text" 
                            {...register('title', { required: 'Title is required', maxLength: {value: 25, message : "max length is 25"} })} 
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="content">Content: </label>
                        <textarea
                            id='content' 
                            className='border shadow-sm w-full h-[40vh] px-3 py-2'
                            {...register('content', { required: 'Content is required' })}
                        />
                        {errors.content && <p className="text-red-500">{errors.content.message}</p>}
                    </div>
                    <button disabled={isSubmitting} type="submit" className={`w-full bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting? "bg-blue-400 cursor-not-allowed" : null}`}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog
