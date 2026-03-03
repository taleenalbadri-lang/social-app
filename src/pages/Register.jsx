import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormikFeedback from '../components/FormikFeedback';
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schema/register.schema';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';


export default function Register() {

  const [isLoading, setLoading] = useState(false)

  // عشان توديني ع صفحة ال login
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(registerSchema),
    //opitional عشان يقترح علياال keys
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: ""
    }
  })

  async function handleRegister(formData) {
    setLoading(true)

    try {
      const { data } = await axios.post(`https://route-posts.routemisr.com/users/signup`, formData)
      toast.success('authenticated') // alert
      setTimeout(() => {
        navigate('/')
      }, 2000) // قديش بده وقت عشان يروح لصفحة ال login

    } catch (error) {
      toast(error.message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className='flex items-center justify-center p-8 mx-auto lg:w-1/2 w-3/4 shadow-md shadow-gray-400 my-10 dark:bg-mauve-600'>

      <form className="w-full " onSubmit={handleSubmit(handleRegister)}>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" id="name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " {...register('name')} />
          {errors.name && <FormikFeedback msg={errors.name?.message}></FormikFeedback>}
          <label htmlFor="name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">First name</label>
        </div>
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
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" id="rePassword" autoComplete='off' className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " {...register('rePassword')} />
          {errors.rePassword && <FormikFeedback msg={errors.rePassword?.message}></FormikFeedback>}
          <label htmlFor="rePassword" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Confirm password</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="date" id="dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " {...register('dateOfBirth')} />
          {errors.dateOfBirth && <FormikFeedback msg={errors.dateOfBirth?.message}></FormikFeedback>}
          <label htmlFor="dateOfBirth" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">dateOfBirth</label>
        </div>

        <div className="flex items-center mb-4">
          <input id="female" type="radio" value="female" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-blue-950 checked:border-2 border border-default" {...register('gender')} />
          <label htmlFor="female" className="select-none ms-2 text-sm font-medium text-heading">
            Female
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input id="male" type="radio" value="male" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-blue-950 checked:border-2 border border-default" {...register('gender')} />
          <label htmlFor="male" className="select-none ms-2 text-sm font-medium text-heading">
            Male
          </label>
        </div>

       {!isLoading? <Button type="submit" className='my-3' color="primary" variant="shadow">Register</Button> : <Button isLoading type="submit"  color="primary"  variant="shadow">Register</Button>}

      </form>


    </div>
  )
}
