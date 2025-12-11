import React,{useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import "../styles/LoginPage.css"
const API_URI = "http://localhost:5000/api/v1/auth/login"
const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials,setCredentials ] = useState({email:"", password:""})
    const [successMessage, setSuccessMessage] = useState("")
    const [error,setError]= useState("")
    const [isloading,setIsLoading] = useState(false)
    const [show,setShow]=useState(false)
    const handleChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    };
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccessMessage("")

        try{
        const res =await axios.post(API_URI,credentials);

        const token = res.data.token;
        setSuccessMessage("login SuccessFull")
    
        localStorage.setItem("authToken",token);
        localStorage.setItem("role", res.data.role);        
        navigate("/dashboard")

    }catch(error){
        const msg = error.response?.data?.message || "login failed due to internet";
        setError(msg);
    }
    finally{
        setIsLoading(false);
        

    }

}
return (
    <div className="loginPage-Wrapper">
        <div className="loginPage-Container">
            <h2>Welcome Back</h2>
            <form className='Login-Form' onSubmit={handleSubmit}>
                <input type="email" name='email'placeholder='Email' value = {credentials.email} onChange={handleChange}required/>
                <div className="password-wrapper">
                <input type={show?"text":"password"} name='password'placeholder='password' value = {credentials.password} onChange={handleChange}required/>
                <span className = "toggle-eye" onClick={() =>setShow(!show)}>{show?"🙈":"👁️"}</span>
                </div>
                <button type="submit" disabled={isloading}>{isloading?"Sign in..":"Login"}</button>
                

            </form>
            {error && <p className="error-message">Error: {error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    </div>

)
}
export default LoginPage