import { createContext, useEffect, useMemo, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate} from 'react-router-dom'
import Admin from './components/Admin/Admin'
import Home from './components/Home/Home'
import ROUTES from './routes/routes'
import AdminAdd from './components/AdminAdd/AdminAdd'
import AdminEdit from './components/AdminEdit/AdminEdit'
import Login from './components/Login/Login'

function App() {
  const [ types, setTypes ] = useState([])
  const [ colors, setColors ] = useState([])
  const [ purities, setPurities ] = useState([])
  const [ carats, setCarats ] = useState([])
  const [ type, setType ] = useState(1000)
  const [ color, setColor ] = useState(20)
  const [ pure, setPure ] = useState(30)
  const [ logIn, setLogIn ] = useState(false)
  const [ adminMail ] = useState("admin")
  const [ adminPassword ] = useState("082023")

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true'
    if (isLoggedIn) {
      setLogIn(true)
    }
  }, [])
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Home/>}/>
        {logIn ? (
          <>
            <Route path={ROUTES.ADMIN} element={<Admin />} />
            <Route path={ROUTES.ADMINUNIQUE} element={<AdminEdit />} />
            <Route path={ROUTES.ADMINADD} element={<AdminAdd />} />
          </>
        ) : (
          <Route path={ROUTES.ADMIN} element={<Login />} />
        )}
        <Route path="*" element={<Navigate to={ROUTES.ADMIN} />} />
      </Route> 
    )
  )

  const providerValue = useMemo(() => ({ types, setTypes, colors, setColors, purities, setPurities, setColor, setPure, setType, type, color, pure, carats, setCarats, setLogIn, adminMail, adminPassword }), [ types, setTypes, colors, setColors, purities, setPurities, setColor, setPure, setType, type, color, pure, carats, setCarats, setLogIn, adminMail, adminPassword ])

  return (
    <UseContext.Provider value={providerValue}>
      <RouterProvider router={router}/> 
    </UseContext.Provider>   
  )
}

export default App
export const UseContext = createContext(null)