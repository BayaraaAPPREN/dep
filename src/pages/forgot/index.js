import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '@/core/Layout' 
import { useRouter } from 'next/router'

const Forgot = () => {
  const [values, setValues] = useState({
    email:"",
    buttonText:"Request password reset link",
  });
  const router = useRouter();

  const { email, buttonText } = values;

  const handleChange =(name) => (e) => {
    setValues({...values, [name]: e.target.value });
  };

  const clickSubmit = e => { 
    e.preventDefault()
    setValues({...values, buttonText: 'Submitting'});

    axios({
      method: 'PUT',
      url: `http://localhost:8000/api/forget-password`,
      data: { email }
    })
    .then(response => {
      toast.success(response.data.message)
      setValues({...values, buttonText: 'Requested'})
    })
    .catch(error => {
      toast.error(error.response.data.error);
      setValues({...values, buttonText:'Reject'});
    })

  }

  const passwordForgotForm = () =>(
    <form>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className='form-control'/>
      </div>

      <div>
        <button className='btn btn-primary' onClick={clickSubmit}>{buttonText}</button>
      </div>
    </form>
  )
  return (
    
    <Layout> 
       {/* {isAuth() ? router.push('/') : null} */}
       <div className='col-d-6 offset-md-3'>
          <ToastContainer/>
          <h2 className='p-5 text-center'>Forgot password</h2>
          {passwordForgotForm()}
       </div>
    </Layout>
  )
}

export default Forgot