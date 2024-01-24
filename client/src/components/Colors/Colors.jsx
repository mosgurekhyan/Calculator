import './Colors.css'
import { useContext, useState, useEffect } from 'react'
import { UseContext } from '../../App'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ROUTES from '../../routes/routes'

function Colors() {
  const { setColors, setColor } = useContext(UseContext)
  const [ activeId, setActiveId ] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [ data, setData ] = useState([])
  const { pathname } = useLocation()

  const handleColorClick = (id, percent) => {
    setActiveId(id === activeId ? null : id)
    setColor(percent)
  }

  useEffect(() => {
    axios
    .get('http://localhost:3000/colors')
    .then(res => {
      if (res.data) {
        setData(res.data.colors)
        setColors(res.data.colors)
      }
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false))

  }, [ setColors ])

  const handleDelete = (id) => {
    axios
    .delete(`http://localhost:3000/colors/${id}`)
    .then(() => setData(prevData => prevData.filter(e => e._id !== id)))
    .catch(err => console.error(err))
  }

  return (
    <div className='colors'>
      { loading ? <LoadingSpinner/> :
        data?.map(e => (
          <div style={{height: pathname === `${ROUTES.ADMIN}` && '150px'}} onClick={() => handleColorClick(e._id, e.percent)} className='color' key={e._id}>
            <img className={`${activeId === e._id ? 'img' : ''}`} src={e.img} alt="" />
            {/* <img src={`data:${data?.img.contentType};base64,${toBase64(e.img.img?.data)}`} alt="" className="img" /> */}
            <p style={{color: pathname === `${ROUTES.ADMIN}` && 'aliceblue'}}>{e.title}</p>
            <p style={{color: 'red', display: pathname !== `${ROUTES.ADMIN}` && 'none'}}>{e.percent} %</p>
            <div style={{display: pathname !== `${ROUTES.ADMIN}` && 'none'}} className="diamondBtns">
              <button onClick={() => handleDelete(e._id)}>delete</button>        
              <button onClick={() => navigate(`${ROUTES.ADMIN}/${e._id}`)}>edit</button>
            </div>
        </div>
        ))
      }
    </div>
  )
}

export default Colors