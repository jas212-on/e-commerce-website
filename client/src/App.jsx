import { useState } from 'react'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CartPage cart={[]} />
    </>
  )
}

export default App
