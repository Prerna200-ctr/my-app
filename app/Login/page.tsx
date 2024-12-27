'use client'
import React, { useState, useEffect, useTransition } from 'react'
import { handleLogin } from '../actions/handleLogin'

export default function Page() {
  const [user, setUser] = useState({ email: '', password: '' })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password))
  }, [user.email, user.password])

  return (
    <div className='flex flex-col items-center mt-8'>
      <h1 className='text-2xl font-bold'>
        {isPending ? 'Processing' : 'Login'}
      </h1>
      <hr className='w-full my-4' />
      <div className='w-64'>
        <label htmlFor='email' className='block mb-1 font-medium text-gray-700'>
          Email
        </label>
        <input
          id='email'
          type='email'
          placeholder='Email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className='w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500'
        />
        <label htmlFor='password” className=”block mb-1 font-medium text-gray-700'>
          Password
        </label>
        <input
          id='password'
          type='password'
          placeholder='Password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className='w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500'
        />

        <button
          onClick={() => startTransition(() => handleLogin(user))}
          disabled={buttonDisabled}
          className={
            "w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none ${buttonDisabled ? 'cursor-not-allowed opacity-50' : ''}"
          }
        >
          {isPending ? 'Logging in…' : 'Login'}
        </button>
      </div>
      <hr className='w-full my-4' />
      <p className='mt-2'>
        Not registered?{' '}
        <a href='/Signup' className='text-blue-500 hover:underline'>
          Sign up here
        </a>
      </p>
    </div>
  )
}
