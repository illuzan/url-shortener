import { useEffect, useState, useRef } from 'react'
import type { ActionFunction } from 'remix'
import { Form, Link, useActionData, useTransition } from 'remix'

export const action: ActionFunction = async ({ context, request }) => {
  const formData = await request.formData()
  const longUrl = formData.get('long-url')

  return longUrl
}

export default function Index() {
  const actionData = useActionData()
  const transition = useTransition()
  const state: 'idle' | 'success' | 'error' | 'submitting' =
    transition.submission
      ? 'submitting'
      : actionData?.subscription
      ? 'success'
      : actionData?.error
      ? 'error'
      : 'idle'

  const inputRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const mounted = useRef<boolean>(false)

  useEffect(() => {
    if (state === 'error') {
      inputRef.current?.focus()
    }

    if (state === 'idle' && mounted.current) {
      inputRef.current?.select()
    }

    if (state === 'success') {
      successRef.current?.focus()
    }

    mounted.current = true
  }, [state])

  return (
    <div className='relative flex flex-col justify-center min-h-screen py-6 overflow-hidden bg-gray-50 sm:py-12'>
      <img
        src='/background.jpg'
        alt=''
        className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-none'
        width='1308'
      />
      <div className='absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]'></div>
      <div className='relative mt-[-10rem]'>
        {/* Text */}
        <div className='px-4 py-10 mx-auto sm:w-3/4 lg:w-2/3 sm:p-10 lg:mb-10'>
          <h1 className='mb-6 text-6xl font-extrabold leading-none tracking-tight text-center'>
            Create Short URL!
          </h1>
          <p className='justify-center mx-auto text-xl font-normal leading-7 text-center xl:w-2/4'>
            Fast and simple website to create a shortened URL, easy to remember
            and share.
          </p>
        </div>
        {/* Input Container */}
        <div className='px-4 py-10 mx-auto sm:w-3/4 lg:w-2/3 xl:w-2/5 sm:p-10 md:rounded glass'>
          <Form method='post' aria-hidden={state === 'success'}>
            <fieldset className='py-10 sm:mx-auto sm:max-w-2xl sm:flex'>
              <div className='flex-1 min-w-0'>
                <label htmlFor='long-url' className='sr-only'>
                  Long URL
                </label>
                <input
                  required={true}
                  name='long-url'
                  id='long-url'
                  type='url'
                  className='block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm disabled:bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-600 '
                  placeholder='https://www.example.com/'
                />
              </div>
              <div className='mt-4 sm:mt-0 sm:ml-3'>
                <button
                  type='submit'
                  // onClick={() => setStates(!states)}
                  className='block w-full px-5 py-3 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow disabled:bg-blue-400 sm:w-48 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:px-10'
                >
                  {state === 'submitting' ? 'Creating...' : 'Get Short URL'}
                </button>
              </div>
            </fieldset>
            <p id='error-message'>
              {state === 'error' ? actionData.message : <>&nbsp;</>}
            </p>
          </Form>
        </div>
      </div>
    </div>
  )
}
