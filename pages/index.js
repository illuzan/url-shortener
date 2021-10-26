import Head from 'next/head'
import { useState, useMemo } from 'react'
import { supabase } from '../utils/supabase'

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortURL, setShortURL] = useState(null)
  const [loading, setLoading] = useState(false)

  const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    async function fetchShortUrl() {
      const response = await fetch('http://localhost:3000/api/url', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ longUrl: longUrl })
      })
      const data = await response.text();
      return data
    }
    fetchShortUrl().then(data => {
      setShortURL(data)
      setLoading(false)
    })
  }

  function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(`http://localhost:3000/${textToCopy}`).catch((e) => {
      console.log(e)
    })
  }

  return (
    <>
      <div className="justify-center min-h-screen py-6 bg-gray-50 sm:py-12">
        {/* Text */}
        <div className="px-4 py-10 mx-auto sm:w-3/4 lg:w-2/3 sm:p-10 lg:mb-10">
          <h1 className="mb-6 text-6xl font-extrabold leading-none tracking-tight text-center">
            Create Short Links!
          </h1>
          <p className="justify-center mx-auto text-xl font-normal leading-7 text-center xl:w-2/4">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
            cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
        </div>
        {/* Input Container */}
        <div className="px-4 py-10 mx-auto sm:w-3/4 lg:w-2/3 xl:w-2/4 sm:p-10 glass">
          <form onSubmit={handleSubmit} className="max-w-md py-10 mx-auto rounded sm:max-w-2xl md:max-w-3xl md:flex">
            <input
              className="w-full px-4 py-3 mb-2 text-gray-800 border-2 border-blue-400 rounded bg-gray-50 focus:outline-none md:border-r-0 focus:bg-blue-50 md:rounded-r-none md:mb-0"
              type="url"
              required
              placeholder="Enter long Url"
              onChange={(event) => setLongUrl(event.target.value)}
              value={longUrl}
            />
            <button
              type="submit"
              className="w-full px-4 py-3 text-blue-100 bg-blue-600 rounded-r cursor-pointer disabled:opacity-70 hover:bg-blue-700 md:w-auto focus:outline-none focus:ring-2"
              disabled={loading}
            >
              Shorten
            </button>
          </form>
          {shortURL ? <div className="max-w-md py-10 mx-auto rounded sm:max-w-2xl md:max-w-3xl md:flex">
            <input
              className="w-full px-4 py-3 mb-2 text-gray-800 border-2 border-blue-400 rounded bg-gray-50 focus:outline-none md:border-r-0 focus:bg-blue-50 md:rounded-r-none md:mb-0"
              type="url"
              required
              value={`http://localhost:3000/${shortURL}`}
            />
            <button className="w-full px-4 py-3 text-blue-100 bg-blue-600 rounded-r cursor-pointer hover:bg-blue-700 md:w-auto focus:outline-none focus:ring-2"
              onClick={() => copyToClipboard(shortURL)}
            >
              <span className="sr-only">(click to copy to clipboard)</span>
              <svg className='mx-auto' width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 16c0 1.886 0 2.828.586 3.414C9.172 20 10.114 20 12 20h4c1.886 0 2.828 0 3.414-.586C20 18.828 20 17.886 20 16v-4c0-1.886 0-2.828-.586-3.414C18.828 8 17.886 8 16 8m-8 8h4c1.886 0 2.828 0 3.414-.586C16 14.828 16 13.886 16 12V8m-8 8c-1.886 0-2.828 0-3.414-.586C4 14.828 4 13.886 4 12V8c0-1.886 0-2.828.586-3.414C5.172 4 6.114 4 8 4h4c1.886 0 2.828 0 3.414.586C16 5.172 16 6.114 16 8"></path></svg>
            </button>
          </div> : ''}
        </div>
      </div>
    </>
  )
}
