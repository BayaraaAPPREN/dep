import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '@/core/Layout'
import { isAuth, signout, getCookie, updateUser } from 'context/AuthContext'
import { useRouter } from 'next/router'

const Private = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name:"",
    email:"",
    password:"",
    buttonText:"Submit",
    error: "",
    role: ""
  });

  const token = getCookie('token')

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `http://localhost:8000/api/user/${isAuth()?._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Profile', response)
      const {role, name, email} = response.data
      setValues({...values, role, name, email})
    })
    .catch(error => {
      console.log('error', error.response.data.error)
      if(error.response.status == 401){
        signout(() => {
          router.push('/')
        });
      }
    })
  }

  const { name, email, password, buttonText, role } = values;

  const handleChange =(name) => (e) =>{
    setValues({...values, [name]: e.target.value });
  };

  const clickSubmit = e => {
    e.preventDefault()
    setValues({...values, buttonText: 'Submitting'})

    axios({
      method: 'PUT',
      url: `http://localhost:8000/api/user/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {name, password}
    })
    .then(response => {
      console.log("Profile update success", response)
      updateUser(response, () => {
        setValues({...values, buttonText:'Submited'});
        toast.success("Profile updated successfully");
      });
    })
    .catch(error => {
      console.log('profile update error', error.response.data.error)
      setValues({...values, buttonText:'Submit'});
      toast.error(error.response.data.error);
    })
  }

  const signupForm = () => (

    <form>
       <div className='form-group'>
        <label className='text-muted'>Role</label>
        <input value={role} type="text" className='form-control disabled'/>
      </div>

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

export default Private