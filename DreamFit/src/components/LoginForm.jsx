import React,{useState} from 'react';
import axios from 'axios';


const LoginForm = () =>{
    const [credentials,setCredentials]=useState({email:"",password:""});
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [token,setToken]=useState('');
    const handleChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});

    }
    const handleSubmit =async (e) =>{
        e.preventDefault();
        try{
        const res = await axios.post("http://localhost:5000/api/v1/auth/login",credentials);
        setIsLoggedIn(true); 
        setToken(res.data.token);
        console.log("LOGIN SUCCESS! TOKEN: ", res.data.token);
    }catch(error){
        alert(error.response?.data?.message||"Login Failed");
        setIsLoggedIn(false);
        console.log(error);
    }
}
return (
    <div classname="form-container">
        <h2>{isLoggedIn?"Welcome Back":"Login"}</h2>
        {!isLoggedIn &&(
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder='email'  onChange={handleChange}/>
                <input type="password" name="password" placeholder="password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        )}
        {isLoggedIn && <p>You are logged in . Your JWT is : **{token.substring(0,20)}...**</p>
        }
    </div>
);
};
export default LoginForm;