import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '@/core/Layout'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

const Reset = () => {
  const router = useRouter();
  console.log(router.query)
  let tokens = router.query.slug
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText:"Reset password",
  });

  //  useEffect(() => {
  //   let token = router.query.token
  //   let {name} = jwt.decode(token)
  //   if(token){
  //     setValues({...values, name, token})
  //   }
  // }, [])

  const { name, buttonText, newPassword } = values;

  const handleChange = e => {
    setValues({...values, newPassword: e.target.value });
  };

  const clickSubmit = e => { 
    e.preventDefault()
    setValues({...values, buttonText: 'Submitting'});

    axios({
      method: 'PUT',
      url: `http://localhost:8000/api/reset-password`,
      data: { newPassword, resetPasswordLink: tokens }
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

  const resetForm = () =>(
    <form>

      <div className='form-group'>
        <label className='text-muted'>password</label>
        <input onChange={handleChange} value={newPassword} type="password" className='form-control'/>
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
          <h2 className='p-5 text-center'>Reset password</h2>
          {resetForm()}
       </div>
    </Layout>
  )
}

export default Reset