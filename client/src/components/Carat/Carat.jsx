import './Carat.css'
import { useContext, useState, useEffect } from 'react'
import { UseContext } from '../../App'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ROUTES from '../../routes/routes'

function Carat() {
  const { setCarats } = useContext(UseContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [ data, setData ] = useState([])
  const { pathname } = useLocation()
  
  useEffect(() => {
    axios
    .get('http://localhost:3000/carats')
    .then(res => {
      if (res.data) {
        setData(res.data.carats)
        setCarats(res.data.carats)
      }
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false))
  }, [ setCarats ])
  
  const handleDelete = (id) => {
    axios
    .delete(`http://localhost:3000/carats/${id}`)
    .then(() => setData(prevData => prevData.filter(e => e._id !== id)))
    .catch(err => console.error(err))
  }

  return (
    <div style={{display: pathname !== `${ROUTES.ADMIN}` && 'none'}} className='carats'>
      { loading ? <LoadingSpinner/> :
        data?.map(e => (
          <div className='carat' key={e._id}>
            <p>{e.percent} %</p>
            <div className="diamondBtns">
              <button onClick={() => handleDelete(e._id)}>delete</button>        
              <button onClick={() => navigate(`${ROUTES.ADMIN}/${e._id}`)}>edit</button>
            </div>
        </div>
        ))
      }
    </div>
  )
}

export default Carat