import { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from './styles/app.css'
import splitbee from '@splitbee/web'

export const meta: MetaFunction = () => {
  return {
    title: 'Little URL',
    description: 'Create short url from long url in one click',
    'og:type': 'website',
    'og:title': 'Little URL',
    'og:url': 'https://www.littleurl.online/',
    'og:image': 'https://i.imgur.com/vn5Bsp9.png',
    'og:description': 'Create short url from long url in one click',
  }
}
export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: '/favicon.png',
      type: 'image/png',
    },
    { rel: 'stylesheet', href: styles },
  ]
}

export default function App() {
  splitbee.init({
    token: 'PF4KML60PQWY',
  })

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
        <script async src='https://cdn.splitbee.io/sb.js'></script>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
