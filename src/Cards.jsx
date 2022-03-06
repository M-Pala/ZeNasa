import React,{ useState } from 'react'

function Cards({img,title,date,explanation}) {

  const [readMore,setReadMore] = useState(false)

  return (
    <div className='card-container'>
        <div className='image-container'>
          <img className='image' src={img} alt={title}/>
        </div>
        <h2 className='title'>{title}</h2>
        <h4 className='date'>{date}</h4>
        <p className='info'>
          {readMore?explanation:`${explanation.substring(0,0)}`}
        </p>
        <button className='see-more' onClick={()=>setReadMore(!readMore)}>
            {readMore?`Show Less`:`Read More`}
          </button>
      </div>
  )
}

export default Cards