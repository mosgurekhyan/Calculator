import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import ROUTES from '../../routes/routes'
import { UseContext } from '../../App'

import './AdminEdit.css'

function AdminEdit() {
  const navigate = useNavigate()
  const { types, colors, purities, carats } = useContext(UseContext)
  const { id } = useParams()
  const [ currentType, setCurrentType ] = useState({
    title: '', 
    price: '',
    img: ''
  })
  const [ currentColor, setCurrentColor ] = useState({
    title: '', 
    percent: '',
    img: ''
  })
  const [ currentPure, setCurrentPure ] = useState({
    title: '', 
    percent: '',
    img: ''
  })
  const [ currentCarat, setCurrentCarat ] = useState({
    percent: null
  })

  const inputRefsForType = {
    title: useRef(null),
    price: useRef(null),
    img: useRef(null)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if(types?.some(e => e._id === id)) {
      setCurrentType({ ...types.find(e => e._id === id)})
    } else {
      axios
      .get(`http://localhost:3000/types/${id}`)
      .then(res => {
        if (res.data) {
          setCurrentType(res.data.type)
        }
      })
      .catch(err => console.error(err))
    }
  }, [id, types])

  const handleTypeSubmit = (e) => {
    e.preventDefault()
    const newData = {}
    
    for (const key in inputRefsForType) {
      newData[key] = inputRefsForType[key].current.value
    }

    axios
    .put(`http://localhost:3000/types/${id}`, newData)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    for (const key in inputRefsForType) {
      inputRefsForType[key].current.value = ''
    }
    navigate(`${ROUTES.ADMIN}`)
  }

  const inputRefsForColor = {
    title: useRef(null),
    percent: useRef(null),
    img: useRef(null)
  }

  useEffect(() => {
    if(colors?.some(e => e._id === id)) {
      setCurrentColor({ ...colors.find(e => e._id === id)})
    } else {
      axios
      .get(`http://localhost:3000/colors/${id}`)
      .then(res => {
        if (res.data) {
          setCurrentColor(res.data.color)
        }
      })
      .catch(err => console.error(err))
    }
  }, [id, colors])

  const handleColorSubmit = (e) => {
    e.preventDefault()
    const newData = {}
    
    for (const key in inputRefsForColor) {
      newData[key] = inputRefsForColor[key].current.value
    }

    axios
    .put(`http://localhost:3000/colors/${id}`, newData)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    for (const key in inputRefsForColor) {
      inputRefsForColor[key].current.value = ''
    }
    navigate(`${ROUTES.ADMIN}`)
  }

  const inputRefsForPure = {
    title: useRef(null),
    percent: useRef(null),
    img: useRef(null)
  }

  useEffect(() => {
    if(purities?.some(e => e._id === id)) {
      setCurrentPure({ ...purities.find(e => e._id === id)})
    } else {
      axios
      .get(`http://localhost:3000/purities/${id}`)
      .then(res => {
        if (res.data) {
          setCurrentPure(res.data.pure)
        }
      })
      .catch(err => console.error(err))
    }
  }, [id, purities])

  const handlePureSubmit = (e) => {
    e.preventDefault()
    const newData = {}
    
    for (const key in inputRefsForPure) {
      newData[key] = inputRefsForPure[key].current.value
    }

    axios
    .put(`http://localhost:3000/purities/${id}`, newData)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    for (const key in inputRefsForPure) {
      inputRefsForPure[key].current.value = ''
    }
    navigate(`${ROUTES.ADMIN}`)
  }

  const percent = useRef(null)

  useEffect(() => {
    if(carats?.some(e => e._id === id)) {
      setCurrentCarat({ ...carats.find(e => e._id === id)})
    } else {
      axios
      .get(`http://localhost:3000/carats/${id}`)
      .then(res => {
        if (res.data) {
          setCurrentCarat(res.data.carat)
        }
      })
      .catch(err => console.error(err))
    }
  }, [id, carats])

  const handleCaratSubmit = (e) => {
    e.preventDefault()
    const percentValue = percent.current.value

    const newData = {
      percent: percentValue
    }

    axios
    .put(`http://localhost:3000/carats/${id}`, newData)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    percent.current.value = ''
    navigate(`${ROUTES.ADMIN}`)
  }

  return (
    <div className="adminEdit">
      <form onSubmit={handleTypeSubmit} className="editType">
        <h3>Edit type here</h3>
        <div>
          <label className='adminLabel' htmlFor="title">title:</label>
          <input id='title' ref={inputRefsForType.title} defaultValue={currentType?.title} className='adminInput' type="text" name='title'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="price">price:</label>
          <input id='price' ref={inputRefsForType.price} defaultValue={currentType?.price} className='adminInput' type="text" name='price'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="img">img:</label>
          <input id='img' ref={inputRefsForType.img} defaultValue={currentType?.img} className='adminInput' type="text" name='img'/>
        </div>
        <button>Edit</button>
      </form>
      <form onSubmit={handleColorSubmit} className="editType">
        <h3>Edit color here</h3>
        <div>
          <label className='adminLabel' htmlFor="title">title:</label>
          <input id='title' ref={inputRefsForColor.title} defaultValue={currentColor?.title} className='adminInput' type="text" name='title'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="price">percent:</label>
          <input id='percent' ref={inputRefsForColor.percent} defaultValue={currentColor?.percent} className='adminInput' type="number" name='percent'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="img">img:</label>
          <input id='img' ref={inputRefsForColor.img} defaultValue={currentColor?.img} className='adminInput' type="text" name='img'/>
        </div>
        <button>Edit</button>
      </form>
      <form onSubmit={handlePureSubmit} className="editType">
        <h3>Edit pure here</h3>
        <div>
          <label className='adminLabel' htmlFor="title">title:</label>
          <input id='title' ref={inputRefsForPure.title} defaultValue={currentPure?.title} className='adminInput' type="text" name='title'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="price">percent:</label>
          <input id='percent' ref={inputRefsForPure.percent} defaultValue={currentPure?.percent} className='adminInput' type="number" name='percent'/>
        </div>
        <div>
          <label className='adminLabel' htmlFor="img">img:</label>
          <input id='img' ref={inputRefsForPure.img} defaultValue={currentPure?.img} className='adminInput' type="text" name='img'/>
        </div>
        <button>Edit</button>
      </form>
      <form onSubmit={handleCaratSubmit} className="editType">
        <h3>Edit carat here</h3>
        <div>
          <label className='adminLabel' htmlFor="price">percent:</label>
          <input id='percent' ref={percent} defaultValue={currentCarat?.percent} className='adminInput' type="number" name='percent'/>
        </div>
        <button>Edit</button>
      </form>
    </div>
  )
}

export default AdminEdit