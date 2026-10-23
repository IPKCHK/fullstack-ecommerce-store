import React from 'react'
import "./LoginPage.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Import the new axios setup
import { useAuthStore } from '../store/authStore'; // Import Zustand

function LoginPage() {

    const navigate=useNavigate();
    const login = useAuthStore((state) => state.login);

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    // const handleLogin=async (e)=>{
    //     e.preventDefault();
    //     try {
    //         const response=await fetch(
    //             "http://localhost:3000/api/auth/login",
    //             {
    //                 method:"POST",
    //                 headers:{
    //                     "Content-Type":"application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     email,
    //                     password
    //                 })
    //             }
    //         );

    //         const data=await response.json();

    //         console.log(data);
    //         if (response.ok) {
    //             localStorage.setItem("token", data.token);
    //             localStorage.setItem("user", JSON.stringify(data.user));

    //             navigate("/");
    //         } else {
    //             alert(data.message||"Login failed");
    //         }
    //     } catch (error) {
    //         console.log("Login error:",error);
    //         alert("Could not connect to the server");
    //     }
    // }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Replaces the long fetch call
            const response = await api.post('/auth/login', { email, password });
            
            // Axios automatically parses JSON, accessible via response.data
            // login(response.data.user, response.data.token);
            login(response.data.user);
            navigate("/");
            
        } catch (error) {
            console.log("Login error:", error);
            // Axios puts server error responses in error.response.data
            alert(error.response?.data?.message || "Could not connect to the server.");
        }
    }

  return (
    <div className='login-page'>
        <div className='login-box'>
            <form onSubmit={handleLogin}>
                <h2>Welcome back</h2>
                <p>Please enter your details to login</p><br/>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}    
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}    
                    />
                </div>
                <button type='submit' className='login-btn'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage;