import './Purities.css'
import { useContext, useState, useEffect } from 'react'
import { UseContext } from '../../App'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ROUTES from '../../routes/routes'

function Purities() {
  const navigate = useNavigate()
  const { setPurities, setPure } = useContext(UseContext)
  const [ activeId, setActiveId ] = useState(null)
  const [loading, setLoading] = useState(true)
  const [ data, setData ] = useState([])
  const { pathname } = useLocation()
  // useEffect(() => {console.log('PURITIES update!')})
  const handlePureClick = (id, percent) => {
    setActiveId(id === activeId ? null : id)
    setPure(percent)
  }

  useEffect(() => {
    axios
    .get('http://localhost:3000/purities')
    .then(res => {
      if (res.data) {
        setData(res.data.purities)
        setPurities(res.data.purities)
      }
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false))

  }, [ setPurities ])

  const handleDelete = (id) => {
    axios
    .delete(`http://localhost:3000/purities/${id}`)
    .then(() => setData(prevData => prevData.filter(e => e._id !== id)))
    .catch(err => console.error(err))
  }

  return (
    <div className='purities'>
      { loading ? <LoadingSpinner/> :
        data?.map(e => (
          <div style={{height: pathname === `${ROUTES.ADMIN}` && '150px'}} onClick={() => handlePureClick(e._id, e.percent)} className='pure' key={e._id}>
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

export default Purities
