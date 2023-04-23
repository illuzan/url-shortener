import { LinksFunction, V2_MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";
import splitbee from "@splitbee/web";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Little URL",
    },
    { description: "Create short url from long url in one click" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Little URL" },
    {
      property: "og:description",
      content: "Create short url from long url in one click",
    },
    { property: "og:url", content: "https://www.littleurl.online/" },
    { property: "og:image", content: "https://i.imgur.com/vn5Bsp9.png" },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    { rel: "stylesheet", href: styles },
  ];
};

export default function App() {
  splitbee.init({ token: "PF4KML60PQWY" });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
