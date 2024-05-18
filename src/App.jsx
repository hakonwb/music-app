import { Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import Register from './components/register/Register'



function App() {

  return (
    <div className="App bg-green-800 min-h-screen">
   <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/Register" element={<Register/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
   </Routes>
   </div>
  )
}

export default App
