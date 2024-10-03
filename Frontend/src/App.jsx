import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';
import BaseURL from '../BaseURL.js';

function App() {
  const [data, setData] = useState([]);

  async function dataReceive(){
    try{
      let r = await fetch(BaseURL);
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