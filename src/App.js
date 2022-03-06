import React, { useRef, useState } from 'react'
import Cards from './Cards'



function App() {

  const [count,setCount] = useState()
  const [date, setDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [data, setData] = useState([])

  const ref = useRef()
  const ref_sd = useRef()
  const ref_ed = useRef()
  const handleSubmit_number = (e)=>{
    e.preventDefault()
    let newUrl = `https://api.nasa.gov/planetary/apod?api_key=NlmRQaVV7wc89ZkgI84jiCfP9b8byof91LBtWUIF&count=${count}`
    fetchData(newUrl)
  }

  const handleSubmit_singleDate = (e)=>{
    e.preventDefault()
    // let newUrl = `https://api.nasa.gov/planetary/apod?api_key=NlmRQaVV7wc89ZkgI84jiCfP9b8byof91LBtWUIF&date=${date}`
    let newUrl = `https://api.nasa.gov/planetary/apod?api_key=NlmRQaVV7wc89ZkgI84jiCfP9b8byof91LBtWUIF&start_date=${date}&end_date=${date}`
    fetchData(newUrl)
  }

  const handleSubmit_rangeDate = (e)=>{
    e.preventDefault()
    let newUrl = `https://api.nasa.gov/planetary/apod?api_key=NlmRQaVV7wc89ZkgI84jiCfP9b8byof91LBtWUIF&start_date=${startDate}&end_date=${endDate}`
    fetchData(newUrl)
  }

  const fetchData = async (newUrl) =>{
    const response = await fetch(newUrl)
    const newData = await response.json()
    console.log("set jobs");
    console.log(newData);
    setData(newData)
  }

  return (
    <>
    <div className='main-title-container'>
      <h1>ZeNasa</h1>
    </div>
    
    <div className='main-container'>

      <div className='search-container'>
        <form onSubmit={handleSubmit_number}>
          <input type='number' placeholder="Enter a number" value={count} onChange={(e)=>setCount(e.target.value)}/>
          <button className='btn' type='submit'>Submit</button>
        </form>
        <form onSubmit={handleSubmit_singleDate}>
          <input type='text' ref={ref}  onFocus={() => (ref.current.type = "date")} onBlur={() => (ref.current.type = "text")} placeholder='Enter a date' value={date} onChange={(e)=>setDate(e.target.value)}/>
          <button className='btn' type='submit'>Submit</button>
        </form>
        <form onSubmit={handleSubmit_rangeDate}>
          <input type='text'  ref={ref_sd}  onFocus={() => (ref_sd.current.type = "date")} onBlur={() => (ref_sd.current.type = "text")} placeholder='Enter start date' value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
          <input type='text' ref={ref_ed}  onFocus={() => (ref_ed.current.type = "date")} onBlur={() => (ref_ed.current.type = "text")}  placeholder='Enter end date' value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
          <button className='btn' type='submit'>Submit</button>
        </form>
      </div>
      
      <div className='data-container'>
        {data.map((item,index)=>{
          return <Cards key={index} img={item.url} title={item.title} date={item.date} explanation={item.explanation}/>
        })}
      </div>
      
    </div>

    <div className='main-footer-container'>
      <p>SpaceZeb x NASA product</p>
    </div>
    </>
  )
}

export default App