import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let navigate=useNavigate()
  const handleSubmit = async (e, res) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    const response = await fetch("http://localhost:5000/api/createuser", {
      //mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: credentials.name, location: credentials.geolocation, email: credentials.email, password: credentials.password })
    });

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
    // const temp = await response.text();
    // const json = temp === "" ? {} : JSON.parse(temp);
    // console.log(temp);
    // return json;
  } 
  
    // if(!json.success){
    //   alert("Enter Valid Credentials")
    // }

  
  const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]: event.target.value})
  }
  return (

    <div style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp4289147.jpg")', backgroundSize: 'cover',height: '100vh' }}>
    <div>
    <Navbar />
    </div>

      <div className='container fw-bold fst-italic' >
        <form className='w-50 m-auto mt-5 border bg-light border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1"/>
          </div>
          {/* <div className="m-3">
            <label htmlFor="address" className="form-label">Address</label>
            <fieldset>
              <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' onChange={onChange} aria-describedby="emailHelp" />
            </fieldset>
          </div> */}
          <div className="m-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Your location</label>
          <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success fst-italic fw-bold">Submit</button>
          <Link to="/login" className="m-3 mx-1 btn btn-primary fw-bold">Already a user</Link>
        </form>
      </div>
    </div>
  //   <>
  //   <div className='container'>
  //   <form onSubmit={handleSubmit}>
  //   <div className="mb-3">
  //     <label htmlFor="name" className="form-label">Name</label>
  //     <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
       
  //   </div>
  //   <div className="mb-3">
  //     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  //     <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1"/>
  //     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  //   </div>
  //   <div className="mb-3">
  //     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  //     <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
  //   </div>
  //   <div className="mb-3">
  //     <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
  //     <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
  //   </div>
    
  //   <button type="submit" className="m-3 btn btn-success">Submit</button>
  //   <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
  // </form>
  // </div>
  // </>
  )
}
