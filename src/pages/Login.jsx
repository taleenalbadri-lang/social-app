import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormikFeedback from '../components/FormikFeedback';
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../schema/login.schema';
import { Button } from '@heroui/react';
import { useContext } from 'react';
import { authContext } from '../context/AuthContext';

export default function Login() {

  const { setLogin } = useContext(authContext)

  // عشان توديني ع صفحة ال home
  const navigate = useNavigate()

  const [isLoading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  function handleLogin(formData) {
    setLoading(true)

    axios.post(`https://route-posts.routemisr.com/users/signin`, formData)
      // طريقة تانية غير ال try catch
      .then((data) => {
        toast.success('Login successfully')
        localStorage.setItem('token', data?.data?.data?.token)
        setLogin(data?.data?.data?.token)
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))

  }

  return (
    <div className='flex items-center justify-center p-8 mx-auto lg:w-1/2 w-3/4 shadow-md shadow-gray-400 my-10 dark:bg-mauve-600'>

      <form className="w-full" onSubmit={handleSubmit(handleLogin)}>

        <div className="relative z-0 w-full mb-5 group">
          <input type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " {...register('email')} />
          {errors.email && <FormikFeedback msg={errors.email?.message}></FormikFeedback>}
          <label htmlFor="email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" id="password" autoComplete='off' className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " {...register('password')} />
          {errors.password && <FormikFeedback msg={errors.password?.message}></FormikFeedback>}
          <label htmlFor="password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
        </div>

        {!isLoading ? <Button type="submit" className='my-3' color="primary" variant="shadow">Login</Button> : <Button isLoading type="submit" color="primary" variant="shadow">Login</Button>}

        <p className='my-5 text-sm'>Don't have an account? <Link className='font-bold text-blue-600' to={'/register'}>Register first</Link></p>
      </form>

    </div>
  )
}
