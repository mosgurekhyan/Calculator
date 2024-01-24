import { useContext, useState, useEffect, useCallback } from 'react'
import { UseContext } from '../../App'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import Buffer from 'buffer'
import './Types.css'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ROUTES from '../../routes/routes'

function Types() {
  const navigate = useNavigate()
  const { setTypes, setType } = useContext(UseContext)
  const [ activeId, setActiveId ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])
  const { pathname } = useLocation()
  // useEffect(() => {console.log('TYPES update!')})

  const handleTypeClick = (id, price) => {
    setActiveId(id === activeId ? null : id)
    setType(price)
  }

  useEffect(() => {
    axios
    .get('http://localhost:3000/types')
    .then(res => {
      if (res.data) {
        setData(res.data.types)
        setTypes(res.data.types)
      }
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false))

  }, [ setTypes ])

  const handleDelete = useCallback((id) => {
    axios
    .delete(`http://localhost:3000/types/${id}`)
    .then(() => setData(prevData => prevData.filter(e => e._id !== id)))
    .catch(err => console.error(err))
  }, [])

  // function toBase64(arr = '') {
  //   return new Buffer.from(arr).toString('base64')
  // }
  // console.log(data)
  return (
    <div className='types'>
      { loading ? <LoadingSpinner/> :
        data?.map(e => (
          <div style={{height: pathname === `${ROUTES.ADMIN}` && '150px'}} onClick={() => handleTypeClick(e._id, e.price)} className='type' key={e._id}>
            <img className={`${activeId === e._id ? 'img' : ''}`} src={e.img} alt="" />
            {/* <img src={`data:${data?.img.contentType};base64,${toBase64(e.img.img?.data)}`} alt="" className="img" /> */}
            <p style={{color: pathname === `${ROUTES.ADMIN}` && 'aliceblue'}}>{e.title}</p>
            <p style={{color: 'red', display: pathname !== `${ROUTES.ADMIN}` && 'none'}}>{e.price} ₽</p>
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

export default Types


// import { useContext, useEffect, useState } from 'react'
// import './Heroes.css'
// import { useNavigate } from 'react-router-dom'
// import { UseContext } from '../../App'

// function Heroes() {
//   const [ data, setData ] = useState([])
//   const { setHeroes} = useContext(UseContext)
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()
//   useEffect(() => {
//     axios
//     .get('http://localhost:3000/heroes')
//     .then(res => {
//       if (res.data) {
//         setData(res.data.heroes)
//         setHeroes(res.data.heroes)
//       }
//     })
//     .catch(err => console.error(err))
//     .finally(() => setLoading(false))
//   }, [ setHeroes ])

  // const handleDelete = (id) => {
  //   axios
  //   .delete(`http://localhost:3000/heroes/${id}`)
  //   .then(() => setData(prevData => prevData.filter(hero => hero._id !== id)))
  //   .catch(err => console.error(err))
  // }



//            
//             <div className="heroBtns">
//               <button className='heroBtn' onClick={() => handleDelete(e._id)}>Delete</button>
//               <button className='heroBtn' onClick={() => navigate(`/admin/${e._id}`)}>Go to edit</button>
//             </div>
//           </div>
//         ))
//       }
//     </div>
//   )
// }
