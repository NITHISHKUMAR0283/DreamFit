import  React,{useState} from "react"
import axios from "axios"
import '../styles/AuthStyles.css'
const API_URL ="http://localhost:5000/api/v1/auth/login"

const LoginPage =  ()=>{
    const [credentials,setCredentials] = useState({email:"",password:""});
    const [isLoading,setisLoading]=useState(false)
    const [successMessage,setSuccessMessage]= useState("")
    const [error,seterror] = useState("")

    const handleChange=(e)=>{
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value}
        )
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        setisLoading(true)
        setSuccessMessage("")
        seterror("")
        try{
            const req =await  axios.post(API_URL,credentials);
            const token = req.data.token
            setSuccessMessage(`Login Successfull `) 
            localStorage.setItem("authtoken",token)       

            
        }catch(error){
            const mes=error.response?.data?.message||"check internet connection"
            seterror(mes);
        }

        finally{
            setisLoading(false)
        }
    }



    return(
        <div className="Login-form">
            
            <form className="LoginForm" onSubmit={handleSubmit}>
                <h4>Login</h4>
                <input type="email" required name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="password"required onChange={handleChange} />
                <button type="submit"disabled={isLoading}>{isLoading ?"Signing in..":"Login"}</button>
                {error &&<p className="error-login">{error}</p>}
                {successMessage && <p className="Sucess-login">{successMessage}</p>}
            </form>

        </div>    )

}
export default LoginPage