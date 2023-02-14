import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '@/core/Layout'
import { authenticate, isAuth } from 'context/AuthContext'
import { useRouter } from 'next/router'
import Facebook from '@/components/auth/Facebook'

const Signin = () => {
  const [values, setValues] = useState({
    name:"",
    email:"",
    password:"",
    buttonText:"Submit",
  });
  const router = useRouter();

  const { email, password, buttonText } = values;

  const handleChange =(name) => (e) => {
    setValues({...values, [name]: e.target.value });
  };

  const informParent = response => {
    authenticate(response, () => {
        isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
    });
};

  const clickSubmit = e => {
    e.preventDefault()
    setValues({...values, buttonText: 'Submitting'});

    axios({
      method: 'POST',
      url: `http://localhost:8000/api/signin`,
      data: { email, password}
    })
    .then(response=>{
      authenticate(response, () => {
        setValues({...values, email:'', password:'', buttonText:'Submited'});
        isAuth() && isAuth().role == 'subscriber' ? router.push('/private') : toast.success(`chi sub bish bna`);
      });
    })
    .catch(error => {
      console.log('signup error', error.response.data)
      setValues({...values, buttonText:'Submit'});
      toast.error(error.response.data.error);
    })
  }

  const signinForm = () =>(
    <form>

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
       {/* {isAuth() ? router.push('/') : null} */}
       <div className='col-d-6 offset-md-3'>
          <ToastContainer/>
          <h2 className='p-5 text-center'>Sign in</h2>
          <Facebook informParent={informParent} />
          {signinForm()}
       </div>
    </Layout>
  )
}

export default Signin