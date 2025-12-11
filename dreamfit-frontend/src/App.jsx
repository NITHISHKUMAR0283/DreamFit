import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import './App.css'
import Dashboard from "./pages/Dashboard"

function App() {
  const isLoggedIn = !!localStorage.getItem("authToken");
  
  console.log(isLoggedIn)
  return (
    <Routes>
    <Route path="/" element={isLoggedIn ? <Dashboard/>: <Navigate to="/login" />}/>
    
    <Route path="/login" element = {<LoginPage/>}></Route>

      <Route path = "/dashboard" element ={isLoggedIn?<Dashboard/>:<Navigate to="/login"/>}/>
    </Routes>  
  )

}

export default App
