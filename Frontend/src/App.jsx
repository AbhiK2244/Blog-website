import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  
  async function dataReceive(){
    try{
      let r = await fetch("http://localhost:3000/");
      let result = await r.json(); 
      console.log(result);
      setData(result);
    }
    catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    dataReceive()
  },[])

  return (
    <div className='w-full h-screen'>
      <Navbar />
      {data.length === 0? <div className='w-full h-[80vh] flex justify-center items-center text-gray-600'>No Blogs. (OR It is taking some time to load the data)</div> :<Hero data={data} refreshData={dataReceive} />}
    </div>
  )
}

export default App




















// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)
//   const [text, setText] = useState("");

//   const [data, setData] = useState({firstName : "abhi", lastName: "Kamati"})

  // async function handleclick(){
  //   setCount(count + 1);
  //   let result = await fetch("http://localhost:3000/");
  //   setText(await result.text());
  // }

//   async function sendmsg(){
//     let result = await fetch("http://localhost:3000/post", {method: "POST", headers: {
//       "Content-Type" : "application/json",
//     }, body : JSON.stringify(data)});

//     let r = await result.text();
//     // setText(r);
//     setData(JSON.parse(r));
//     console.log(data)
//   }

//   return (
//     <div className='flex flex-col justify-center items-center h-screen w-full'>
//       <div className='text-red-500'>{count}</div>
//       <div className='text-red-500'>{text}</div>
//       <button onClick={handleclick}>click</button>
//       <button onClick={sendmsg}>send to server</button>
//     </div>
//   )
// }

// export default App
