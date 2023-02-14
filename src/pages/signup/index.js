import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '@/core/Layout'

const Signup = () => {
  const [values, setValues] = useState({
    name:"",
    email:"",
    password:"",
    buttonText:"Submit",
    error: ""
  })

  const { name, email, password, buttonText } = values;

  const handleChange =(name) => (e) =>{
    setValues({...values, [name]: e.target.value });
  };

  const clickSubmit = e => {
    e.preventDefault()
    setValues({...values, buttonText: 'Submitting'})

    axios({
      method: 'POST',
      url: `http://localhost:8000/api/signup`,
      data: {name, email, password}
    })
    .then(response => {
      console.log("Signup success", response)
      setValues({...values, name:'', email:'', password:'', buttonText:'Submited'});
      toast.success(response.data.message);
    })
    .catch(error => {
      console.log('signup error', error.response.data)
      setValues({...values, buttonText:'Submit'});
      toast.error(error.response.data.error);
    })
  }

  const signupForm = () => (

    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input onChange={handleChange('name')} value={name} type="text" className='form-control'/>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className='form-control'/>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input onChange={handleChange('password')} value={password} type="password" className='form-control'/>
      </div>

      <div>
        <button className='btn btn-primary' onClick={clickSubmit}>{buttonText}</button>
      </div>
    </form>

  )
  return (
    <Layout>
       <div className='col-d-6 offset-md-3'>
          <ToastContainer/>
          <h2 className='p-5 text-center'>Sign up</h2>
          {signupForm()}
       </div>
    </Layout>
  )
}

export default Signup