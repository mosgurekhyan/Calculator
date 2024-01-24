import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'

import './Admin.css'
import ROUTES from '../../routes/routes'
import Types from '../Types/Types'
import Colors from '../Colors/Colors'
import Purities from '../Purities/Purities'
import Carat from '../Carat/Carat'
import { UseContext } from '../../App'

function Admin() {
  const { setLogIn } = useContext(UseContext)
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleAdminLogout = () => {
    setLogIn(false)
    localStorage.removeItem("loggedIn")
  }

  return (
    <div className='admin'>
      <h1>Admin page</h1>
      <span onClick={() => navigate(`${ROUTES.ADMINADD}`)} className='btnFrame'>
        <button className='navbarBtn'>Go to add elements</button>
      </span>
      <span style={{margin: '0 50px'}} onClick={() => navigate(`${ROUTES.HOME}`)} className='btnFrame'>
        <button className='navbarBtn'>Go to Home</button>
      </span>
      <span onClick={handleAdminLogout} className='btnFrame'>
        <button className='navbarBtn'>Log out</button>
      </span>
      <h2>Types</h2>
      <div className="adminContainer">
        <Types/>
      </div>
      <h2>Carat</h2>
      <div className="adminContainer">
        <Carat/>
      </div>
      <h2>Colors</h2>
      <div className="adminContainer">
        <Colors/>
      </div>
      <h2>Purities</h2>
      <div className="adminContainer">
        <Purities/>
      </div>
    </div>
  )
}

export default Admin