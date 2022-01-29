![Screenshot](https://i.imgur.com/vn5Bsp9.png)

# URL Shortener

Superfast Url Shortener that runs on the edge, powered by Remix, Cloudflare Pages and Cloudflare KV.

## Development

You will be utlizing Wrangler for local development to emulate the Cloudflare runtime. This is already wired up in your package.json as the `dev` script:

```sh
# start the remix dev server and wrangler
$ npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

## Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).

Configure the "Build command" should be set to `npm run build`, and the "Build output directory" should be set to `public`.

## Acknowledgements

- [newsletter-signup](https://github.com/remix-run/remix/tree/dev/examples/newsletter-signup)
- [remix-cloudflare-demo](https://github.com/jacob-ebey/remix-cloudflare-demo)

## Authors

- Gaurav Singh ([@illuzan](https://twitter.com/illuzan))
