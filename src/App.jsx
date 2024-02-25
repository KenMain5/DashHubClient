import Login from "./Login/Login"
import Register from "./Register/Register"
import './global.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={
          <Login />
        }/>

        <Route path='/register' element={
          <Register/>
        }/>

        <Route path='/signin' element={
           <Login />
        }/>

      </Routes>
    </Router>

    </>
  )
}

export default App
