// import { useState } from "react"
// import React from 'react'
// import "./SignupPage.css"
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// function SignupPage() {

//     const navigate=useNavigate();

//     const [name,setName]=useState("");
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const handleSignup=async(e)=>{
//         e.preventDefault();

//         console.log("Signup button clicked");
//         console.log({ name, email, password, confirmPassword });

//         if(password!==confirmPassword)
//         {
//             console.log("Passwords do not match");
//             return;
//         }
        
//         // try {
//         //     const API_URL = import.meta.env.VITE_API_URL
//         //     const response = await fetch(
//         //         `${API_URL}/auth/signup`,
//         //         {
//         //             method: "POST",
//         //             headers: {
//         //                 "Content-Type": "application/json"
//         //             },
//         //             body: JSON.stringify({
//         //                 name,
//         //                 email,
//         //                 password
//         //             })
//         //         }
//         //     );

//         //     console.log("Response received:", response.status);

//         //     const data = await response.json();

//         //     console.log("Response data:", data);

//         //     if (response.ok) {
//         //         alert("Signup successful!");
//         //         navigate("/login");
//         //     } else {
//         //         alert(data.message || "Signup failed");
//         //     }

//         // } catch (error) {
//         //     console.log("Signup error:", error);
//         //     alert("Could not connect to server");
//         // }
//         try {
//             await api.post("/auth/signup", { name, email, password });
            
//             alert("Signup successful!");
//             navigate("/login");

//         } catch (error) {
//             console.log("Signup error:", error);
            
//             if (error.response) {
//                 // The server responded, but rejected it (e.g., email already exists)
//                 alert(error.response.data.message || "Signup failed");
//             } else {
//                 // The server did not respond at all (network error / backend down)
//                 alert("Could not connect to server");
//             }
//         }
    
//     }
//   return (
//     <div className='signup-page'>
//         <div className='signup-box'>
//             <form onSubmit={handleSignup}>
//                 <h2>Create account</h2><br/>
//                 <div className="form-group">
//                     <label htmlFor="name">Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='email'>Email</label>
//                     <input 
//                         type="email" 
//                         id="email" 
//                         value={email}
//                         onChange={(e)=>setEmail(e.target.value)}    
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label htmlFor='password'>Password</label>
//                     <input 
//                         type="password" 
//                         id="password"
//                         value={password}  
//                         onChange={(e)=>setPassword(e.target.value)}  
//                     />
//                 </div>

//                 <div className='form-group'>
//                     <label htmlFor='confirmPassword'>Confirm Password</label>
//                     <input 
//                         type="password" 
//                         id="confirmPassword"
//                         value={confirmPassword}
//                         onChange={(e)=>setConfirmPassword(e.target.value)}    
//                     />
//                 </div>
//                 <button type="submit" className='signup-btn'>Signup</button>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default SignupPage;



import React, { useState } from 'react';
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function SignupPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Add loading state
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        setIsSubmitting(true); // Start spinner

        try {
            await api.post("/auth/signup", { name, email, password });
            alert("Signup successful!");
            navigate("/login");
        } catch (error) {
            console.log("Signup error:", error);
            if (error.response) {
                alert(error.response.data.message || "Signup failed");
            } else {
                alert("Could not connect to server");
            }
        } finally {
            setIsSubmitting(false); // Stop spinner
        }
    }

    return (
        <div className='signup-page'>
            <div className='signup-box'>
                <form onSubmit={handleSignup}>
                    <h2>Create account</h2><br/>
                    
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}    
                        />
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)}  
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}    
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className='signup-btn'
                        disabled={isSubmitting}
                        style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px', marginRight: '8px' }}></span>
                                Signing up...
                            </>
                        ) : (
                            "Signup"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage;