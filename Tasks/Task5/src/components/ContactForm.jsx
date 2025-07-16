import React from 'react'
import {useForm} from 'react-hook-form'

const ContactForm = () => {
  const { register ,handleSubmit ,formState :{errors}} = useForm()
  //formstate can give us access to errors
  //register is going to send data to the react hook form whenever the inout changes 
  //register basically connects it with useFrom hook
  //handlesubmit performs validation before submission

  const onSubmit = (data) =>{
    console.log(data)
  }
  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='mainForm'>
        <input 
          {...register('email',{
            required : 'Email is Required', 
            pattern : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })} 
          type ='text' 
          placeholder='Email'
          className='entry'/>
          {errors.email && <div className ='errors'>{errors.email.message}</div>}
        <input {...register('password',{
          required : 'Password is Required' , 
          minLength : 10 ,
          })} 
          type ='password' 
          placeholder='Password'
          className='entry'/>
          {errors.password && <div className='errors'>{errors.password.message}</div>}
        <input {...register('comment',{
          required : 'Message is Required'})} 
          type ='text' 
          placeholder='Message'
          className='entry3'/>
          {errors.comment && <div className='errors'>{errors.comment.message}</div>}
        <button type = 'submit'className='entryBtn'>Submit</button>

      </form>
    </>
  )
}


export default ContactForm