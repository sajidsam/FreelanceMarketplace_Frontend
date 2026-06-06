import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); 


  const handleSignIn = (e) => {
    e.preventDefault(); // 
    
    console.log("ইমেইল:", email);
    console.log("পাসওয়ার্ড:", password);
    
    navigate("/"); 
  };

  return (
    <div>
      <h1>Hello this is the sign in and sign up page</h1>
      <form onSubmit={handleSignIn}>
          
          <input 
            type="email"
            required
            placeholder="example@gmail.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
       
          <input 
            type="password"
            required
            placeholder="@23AxY75as"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button
            type="submit"
            style={{ width: '105%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#059669', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
          >
            Sign In
          </button>
          
      </form>
    </div>
  );
};

export default SignIn;