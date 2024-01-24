import { useEffect, useContext, useState, useRef } from 'react'
import Colors from '../Colors/Colors'
import Types from '../Types/Types'
import './Home.css'
import Purities from '../Purities/Purities'
import { UseContext } from '../../App'
import Carat from '../Carat/Carat'
import axios from 'axios'

function Home() {
  const { type, pure, color, carats, purities, types, colors } = useContext(UseContext)
  const [ price, setPrice ] = useState(null)
  const [ carat, setCarat ] = useState(.5)
  const [ open, setOpen ] = useState(false)
  
  const [ currentType, setCurrentType ] = useState({
    title: null
  })
  const [ currentPure, setCurrentPure ] = useState({
    title: null
  })
  const [ currentColor, setCurrentColor ] = useState({
    title: null
  })
  const [ currentPrice, setCurrentPrice ] = useState({
    price
  })
  const [ currentCarat, setCurrentCarat] = useState()

  useEffect(() => {
    setCurrentPure({ ...purities.find(e => e.percent === pure)})
    setCurrentType({ ...types.find(e => e.price === type)})
    setCurrentColor({ ...colors.find(e => e.percent === color)})
    setCurrentPrice({ price })
    setCurrentCarat( carat )
  }, [ pure, purities, type, types, color, colors, price, carat ])

  useEffect(() => {
    if (type && pure && color && carats) {
      const calculatedPrice = calculatePrice(type, carat, carats, color, pure)
      setPrice(calculatedPrice)
    }
  }, [type, pure, color, carat, carats])
  
  const calculatePrice = (type, carat, carats, color, pure) => {
    return type + (carat * type * carats[0]?.percent / 100) + ((type + (carat * type * carats[0]?.percent / 100)) * color / 100) + ((type + (carat * type * carats[0]?.percent / 100) + ((type + (carat * type * carats[0]?.percent / 100)) * color / 100)) * pure / 100)
  }

  const inputRefsForOrder = {
    name: useRef(null),
    tel: useRef(null),
    type: useRef(null),
    color: useRef(null),
    carat: useRef(null),
    pure: useRef(null),
    price: useRef(null)
  }

  const handleSendSubmit = (e) => {
    e.preventDefault()
    const newData = {}

    for (const key in inputRefsForOrder) {
      newData[key] = inputRefsForOrder[key].current.value
    }

    axios.post('http://localhost:3000/data/send', newData)
    .then(res => console.log(res))
    .catch(err => console.log(err))

    for (const key in inputRefsForOrder) {
      inputRefsForOrder[key].current.value = ''
    }
    setOpen(false)
  }

  return (
    <div className='home'>
      <h1>ПОКУПКА БРИЛЛИАНТА:</h1>
      <h2>Форма бриллианта</h2>
      <Carat/>
      <Types/>
      <div className='rangeContainer'>
        <h2 className="number">Размер в каратах: {carat}</h2>
        <input className='inp' defaultValue={.5} type="range" min={.5} max={5} step={.01} onChange={e => setCarat(e.target.value)}/>
      </div>
      <h2>Цвет бриллианта</h2>
      <Colors/>
      <h2>Чистота бриллианта</h2>
      <Purities/>
      <div className="downContainer">
        <h1 className='price'>Цена: {Math.floor(price)} ₽</h1>
        <div className="homeBtns">
          <button onClick={() => setOpen(true)}>ЗАКАЗАТЬ ПО ЭТОЙ ЦЕНЕ</button>
          <button>Продать</button>
        </div>
      </div>
      <div onClick={() => setOpen(false)} style={{display: !open && 'none'}} className="overlay"></div>
      <div style={{display: !open && 'none'}} className="formPanel">
        <button className='closeBtn' onClick={() => setOpen(false)}></button>
        <h2>Заполните форму для заказа бриллианта у нас</h2>
        <form onSubmit={handleSendSubmit}>
          <input ref={inputRefsForOrder.name} type="text" id="name" name="name" placeholder="* Ваше имя" required/>
          <input ref={inputRefsForOrder.type} defaultValue={currentType?.title} type="hidden" id="type" name="type" placeholder="* Форма" required/>
          <input ref={inputRefsForOrder.color} defaultValue={currentColor?.title} type="hidden" id="color" name="color" placeholder="* Цвет" required/>
          <input ref={inputRefsForOrder.carat} defaultValue={currentCarat} type="hidden" id="carat" name="carat" placeholder="* Размер в каратах" required/> 
          <input ref={inputRefsForOrder.pure} defaultValue={currentPure?.title} type="hidden" id="pure" name="pure" placeholder="* Чистота" required/>
          <input ref={inputRefsForOrder.price} defaultValue={isNaN(currentPrice?.price) ? "" : currentPrice?.price} type="hidden" id="price" name="price" placeholder="* Цена" required/>
          <input ref={inputRefsForOrder.tel} type="tel" id="tel" name="tel" placeholder="* Ваш Телефон" required/>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  )
}

export default Home