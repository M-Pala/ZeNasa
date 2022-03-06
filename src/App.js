import React, { useEffect, useRef, useState } from 'react'
import Cards from './Cards'



function App() {

  // const [url,setUrl] = useState()
  const [count,setCount] = useState()
  const [date, setDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [data, setData] = useState([])

  const [numberForm, setNumberForm] = useState(false)
  const [singleDateForm, setSingleDateForm] = useState(false)
  const [rangeDateForm, setRangeDateForm] = useState(false)

  // const [loading, setLoading] = useState(true)

  const ref = useRef()
  const ref_sd = useRef()
  const ref_ed = useRef()
  const handleSubmit_number = (e)=>{
    e.preventDefault()
    if(count>25){
      alert("Count should be less than 25")
      return
    }
    let newUrl = `https://api.nasa.gov/planetary/apod?api_key=NlmRQaVV7wc89ZkgI84jiCfP9b8byof91LBtWUIF&count=${count}`
    // setUrl(newUrl)
    fetchData(newUrl)
  }

  const handleSubmit_singleDate = (e)=>{
    e.preventDefault()
    if(new Date(date)>new Date()){
      alert("date cannot be future date")
      return
    }
    let newUrl = `https://api.nasa.gov/planetary/apod?api_key=NlmRQaVV7wc89ZkgI84jiCfP9b8byof91LBtWUIF&start_date=${date}&end_date=${date}`
    fetchData(newUrl)
  }

  const handleSubmit_rangeDate = (e)=>{
    e.preventDefault()
    if((new Date(startDate)>new Date()) || (new Date(endDate)>new Date())){
      alert("Entered date cannot be future date")
      return
    }
    else if(new Date(startDate)>new Date(endDate)){
      alert("Start date should be less than end date")
      return
    }
    else if((Math.ceil((new Date(endDate)-new Date(startDate)) / (1000 * 60 * 60 * 24)))>5){
      alert("Please keep date range between 50 days")
      return
    }
    let newUrl = `https://api.nasa.gov/planetary/apod?api_key=NlmRQaVV7wc89ZkgI84jiCfP9b8byof91LBtWUIF&start_date=${startDate}&end_date=${endDate}`
    fetchData(newUrl)
  }

  const fetchData = async (newUrl) =>{
    if(newUrl!=null){
      const response = await fetch(newUrl)
      const newData = await response.json()
      console.log("set jobs");
      console.log(newData);
      setData(newData)
      // setLoading(false)
  }
    else{
      console.log('Waiting for input');
    }
  }
  
  const numberHandle = ()=>{
    setNumberForm(!numberForm)
    setSingleDateForm(false)
    setRangeDateForm(false)
  }
  const singleDateHandle = ()=>{
    setSingleDateForm(!singleDateForm)
    setNumberForm(false)
    setRangeDateForm(false)
  }
  const rangeDateHandle = ()=>{
    setRangeDateForm(!rangeDateForm)
    setSingleDateForm(false)
    setNumberForm(false)
  }

  // useEffect(()=>{
  //   fetchData(url)
  // },[url])

  
  return (
    <>
    <div className='main-title-container'>
      <h1>ZeNasa</h1>
    </div>
    
    <div className='main-container'>

      <div className='search-container'>
        
        <button className='btn form' onClick={numberHandle}>Show by number</button>
        <br/>
        <form onSubmit={handleSubmit_number} className={numberForm?null:'hidden'}>
          <input type='number' placeholder="Enter number of photos" value={count} onChange={(e)=>setCount(e.target.value)}/>
          <button className='btn' type='submit'>Submit</button>
        </form>

        <button className='btn form' onClick={singleDateHandle}>Show by single date</button>
        <br/>
        <form onSubmit={handleSubmit_singleDate} className={singleDateForm?null:'hidden'}>
          <input type='text' ref={ref}  onFocus={() => (ref.current.type = "date")} onBlur={() => (ref.current.type = "text")} placeholder='Enter a date' value={date} onChange={(e)=>setDate(e.target.value)}/>
          <button className='btn' type='submit'>Submit</button>
        </form>

        <button className='btn form' onClick={rangeDateHandle}>Show by range of date</button>
        <br/>
        <form onSubmit={handleSubmit_rangeDate} className={rangeDateForm?null:'hidden'}>
          <input type='text'  ref={ref_sd}  onFocus={() => (ref_sd.current.type = "date")} onBlur={() => (ref_sd.current.type = "text")} placeholder='Enter start date' value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
          <input type='text' ref={ref_ed}  onFocus={() => (ref_ed.current.type = "date")} onBlur={() => (ref_ed.current.type = "text")}  placeholder='Enter end date' value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
          <button className='btn' type='submit'>Submit</button>
        </form>
      </div>
      
      {/* <h4>{loading?'loading':null}</h4> */}
      <div className={`data-container`}>
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