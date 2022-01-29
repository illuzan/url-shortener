import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'
import type { MetaFunction, LinksFunction } from 'remix'
import styles from './styles/app.css'

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
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
