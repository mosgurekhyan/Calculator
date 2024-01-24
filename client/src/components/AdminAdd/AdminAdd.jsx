import axios from 'axios'
import { useEffect, useRef } from 'react'

import './AdminAdd.css'

function AdminAdd() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const inputRefsForType = {
    title: useRef(null),
    price: useRef(null),
    img: useRef(null)
  }

  const handleTypeSubmit = (e) => {
    e.preventDefault()
    const newData = {}

    for (const key in inputRefsForType) {
      newData[key] = inputRefsForType[key].current.value
    }

    axios.post('http://localhost:3000/types/add', newData)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    for (const key in inputRefsForType) {
      inputRefsForType[key].current.value = ''
    }
  }
  
  const inputRefsForColor = {
    title: useRef(null),
    percent: useRef(null),
    img: useRef(null)
  }

  const handleColorSubmit = (e) => {
    e.preventDefault()
    const newData = {}

    for (const key in inputRefsForColor) {
      newData[key] = inputRefsForColor[key].current.value
    }

    axios.post('http://localhost:3000/colors/add', newData)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    for (const key in inputRefsForColor) {
      inputRefsForColor[key].current.value = ''
    }
  }

  const inputRefsForPure = {
    title: useRef(null),
    percent: useRef(null),
    img: useRef(null)
  }

  const handlePureSubmit = (e) => {
    e.preventDefault()
    const newData = {}

    for (const key in inputRefsForPure) {
      newData[key] = inputRefsForPure[key].current.value
    }

    axios.post('http://localhost:3000/purities/add', newData)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    for (const key in inputRefsForPure) {
      inputRefsForPure[key].current.value = ''
    }
  }
 
  const percent = useRef(null)

  const handleCaratSubmit = (e) => {
    e.preventDefault()
    const percentValue = percent.current.value

    const newData = {
      percent: percentValue
    }

    axios.post('http://localhost:3000/carats/add', newData)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    percent.current.value = ''
  }

  return (
    <div className="adminAdd">
      <form onSubmit={handleTypeSubmit} className="addType">
        <h3>Add type here</h3>
        <div>
          <label className='adminLabel' htmlFor="title">title:</label>
          <input id='title' ref={inputRefsForType.title} className='adminInput' type="text" name='title'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="price">price:</label>
          <input id='price' ref={inputRefsForType.price} className='adminInput' type="number" name='price'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="img">img:</label>
          <input id='img' ref={inputRefsForType.img} className='adminInput' type="text" name='img'/>
        </div>
        <button>Add</button>
      </form>
      <form onSubmit={handleColorSubmit} className="addType">
        <h3>Add color here</h3>
        <div>
          <label className='adminLabel' htmlFor="title">title:</label>
          <input id='title' ref={inputRefsForColor.title} className='adminInput' type="text" name='title'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="percent">percent:</label>
          <input id='percent' ref={inputRefsForColor.percent} className='adminInput' type="number" name='percent'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="img">img:</label>
          <input id='img' ref={inputRefsForColor.img} className='adminInput' type="text" name='img'/>
        </div>
        <button>Add</button>
      </form>
      <form onSubmit={handlePureSubmit} className="addType">
        <h3>Add pure here</h3>
        <div>
          <label className='adminLabel' htmlFor="title">title:</label>
          <input id='title' ref={inputRefsForPure.title} className='adminInput' type="text" name='title'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="percent">percent:</label>
          <input id='percent' ref={inputRefsForPure.percent} className='adminInput' type="number" name='percent'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="img">img:</label>
          <input id='img' ref={inputRefsForPure.img} className='adminInput' type="text" name='img'/>
        </div>
        <button>Add</button>
      </form>
      <form onSubmit={handleCaratSubmit} className="addType">
        <h3>Add carat here</h3>
        <div>
          <label className='adminLabel' htmlFor="percent">percent:</label>
          <input id='percent' ref={percent} className='adminInput' type="number" name='percent'/>
        </div>
        <button>Add</button>
      </form>
    </div>
  )
}

export default AdminAdd