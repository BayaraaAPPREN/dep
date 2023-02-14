import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '@/core/Layout'
import { useRouter } from 'next/router'

const Activate = () => {
  const router = useRouter()
  const tokens = router.query.slug
  console.log(tokens, "aahha")
  
  const [values, setValues] = useState({
    name:"",
    token:tokens,
    show:true,
  });

  // useEffect(() => {
  //   let token = router.query.slug
  //   console.log(token, "tokenss");
  // }, [])

  // const { name } = values;

  const clickSubmit = e => {
    e.preventDefault()

    axios({
      method: 'POST',
      url: `http://localhost:8000/api/account-activation`,
      data: {token: tokens} 
    })
    .then(response=>{
      console.log("Account activation", response)
      setValues({...values, email:'', password:'', show:false});
      toast.success(response.data.message);
    })
    .catch(error => {
      console.log('Account activation error', error.response.data.error) 
      toast.error(error.response.data.error);
    });
  };

  const activateLink = () => (
    <div>
        <h2 className='p-5 text-center'>сайн байна уу ready activate account</h2>
        <button className='btn btn-outline-primary' onClick={clickSubmit}>
            Activate account 
        </button>
    </div>
  )

  return (
    <Layout>
       <div className='col-d-6 offset-md-3'>
          <ToastContainer/>
          {activateLink()}
       </div>
    </Layout>
  )
}

export default Activate