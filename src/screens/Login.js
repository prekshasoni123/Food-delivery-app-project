import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
 let navigate=useNavigate() 
  const handleSubmit = async (e, res) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    const response = await fetch("http://localhost:5000/api/loginuser", {
      //mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    // const temp = await response.text();
    // const json = temp === "" ? {} : JSON.parse(temp);
    // console.log(temp);
    // return json;
    const json=await response.json()
    console.log(json);
    
    if(!json.success){
      alert("Enter Valid Credentials")
    }
    if(json.success){
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }
    

  }
  const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]: event.target.value})
  }
  return (

    <div style={{backgroundImage: 'url("https://wallpapercave.com/wp/wp4289147.jpg")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container fst-italic'>
        <form className='w-50 m-auto mt-5 border bg-light border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text text-dark fst-italic fw-light">(Your credentials won't be shared with anyone)</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success fst-italic fw-bold">Submit</button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-primary fw-bold">New User</Link>
        </form>

      </div>
    </div>
    // <div>
    //   <div className='container'>
    //     <form onSubmit={handleSubmit}>

    //       <div className="mb-3">
    //         <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    //         <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" />
    //         <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    //         <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
    //       </div>


    //       <button type="login" className="m-3 btn btn-success">Submit</button>
    //       <Link to="/createuser" className='m-3 btn btn-danger'>New User</Link>
    //     </form>
    //   </div>
    // </div>
  )
}
