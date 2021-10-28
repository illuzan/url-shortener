import Head from 'next/head'
import React, { useState } from 'react'
export default function Home() {
  const [longUrl, setLongUrl] = useState('')
  const [oldLongUrl, setOldLongUrl] = useState('')
  const [shortURL, setShortURL] = useState(null)
  const [loading, setLoading] = useState(false)
  const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  function handleSubmit(event) {
    event.preventDefault()
    if (oldLongUrl === longUrl) {
      return
    }
    setLoading(true)
    async function fetchShortUrl() {
      const response = await fetch(`${origin}/api/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ longUrl: longUrl })
      })
      const data = await response.text();
      setOldLongUrl(longUrl)
      setShortURL(data)
      setLoading(false)
    }
    fetchShortUrl()
  }

  function copyToClipboard(shortLink) {
    navigator.clipboard.writeText(`${origin}/${shortLink}`).catch((event) => {
      console.log(event)
    })
  }

  return (
    <>
      <Head>
        <title>Little URL</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content='Create Short Url from long url and easily share it' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="justify-center min-h-screen pt-24 my-auto bg-gradient-to-b from-[#F5F5F5] to-[#E8F7FF] sm:pt-32 ">
        {/* Text */}
        <div className="px-4 py-10 mx-auto sm:w-3/4 lg:w-2/3 sm:p-10 lg:mb-10">
          <h1 className="mb-6 text-6xl font-extrabold leading-none tracking-tight text-center">
            Create Short URL!
          </h1>
          <p className="justify-center mx-auto text-xl font-normal leading-7 text-center xl:w-2/4">
            Fast and simple website to create a shortened URL, easy to remember and share.
          </p>
        </div>
        {/* Input Container */}
        <div className="px-4 py-10 mx-auto sm:w-3/4 lg:w-2/3 xl:w-2/5 sm:p-10 md:rounded glass">
          <form onSubmit={handleSubmit} className="max-w-md py-10 mx-auto sm:max-w-2xl md:max-w-3xl md:flex">
            <input
              className="w-full px-4 py-3 mb-2 text-gray-800 border-2 border-blue-400 rounded bg-gray-50 focus:outline-none md:border-r-0 focus:bg-blue-50 md:rounded-r-none md:mb-0"
              type="url"
              required
              placeholder="Enter Long Url"
              onChange={(event) => setLongUrl(event.target.value)}
              value={longUrl}
            />
            <button
              type="submit"
              className="w-full px-4 py-3 text-blue-100 bg-blue-600 rounded-r cursor-pointer disabled:opacity-50 disabled:hover:bg-blue-600 hover:bg-blue-700 md:w-32 focus:outline-none focus:ring-2"
              disabled={loading}
            >
              Shorten
            </button>
          </form>
          {shortURL ? <div className="max-w-md py-10 mx-auto rounded sm:max-w-2xl md:max-w-3xl md:flex ">
            <input
              className="w-full px-4 py-3 mb-2 text-gray-800 border-2 border-blue-400 rounded bg-gray-50 focus:outline-none md:border-r-0 focus:bg-blue-50 md:rounded-r-none md:mb-0"
              type="url"
              required
              value={`${origin}/${shortURL}`}
            />
            <button className="w-full px-4 py-3 text-blue-100 bg-blue-600 rounded-r cursor-pointer hover:bg-blue-700 md:w-32 focus:outline-none focus:ring-2"
              onClick={() => copyToClipboard(shortURL)}
            >
              <span className="sr-only">(Click to copy to clipboard)</span>
              Copy URL

            </button>
          </div> : ''}
        </div>
      </div>
    </>
  )
}
