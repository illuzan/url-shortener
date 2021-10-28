import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'

const pageRedirect = (
  res,
  location,
  { replace },
) => {
  res.writeHead(301, {
    Location: location,
  });
  res.end();
};

export default function Page() {
  const router = useRouter()

  return (
    <div>
      <h1>Error occured! Try again</h1>
      <button type="button" onClick={() => router.push('/')}>
        Return Home
      </button>
    </div>
  )
}

export async function getServerSideProps({ params, res }) {
  const baseUrl = 'https://www.littleurl.online/'
  const { slug } = params

  const { data: url, error } = await supabase
    .from('url')
    .select("*")
    .eq('shortURL', slug)

  if (error || url.length === 0) {
    pageRedirect(res, baseUrl, { replace: true })
  }
  const { longURL } = url[0]
  pageRedirect(res, longURL, { replace: true })

  return {}
}
