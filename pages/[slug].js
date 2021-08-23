import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const { slug } = router.query
  console.log()
  useEffect(() => {
    if (slug?.length < 8) {
      router.push('/')
    }
    async function getData() {
      const response = await fetch('http://localhost:3000/api/url', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ slug: slug })
      })
    }
    getData()
  }, [])

  return (
    <button type="button" onClick={() => router.push('/post/abc')}>
      Click me
    </button>
  )
}
