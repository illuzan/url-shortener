import { LoaderFunction, redirect } from '@remix-run/cloudflare'

export const loader: LoaderFunction = async ({ context, params }) => {
  const redirectUrl = await context.LONG_URL_KV.get(params.slug)
  if (redirectUrl) {
    return redirect(redirectUrl)
  } else {
    return redirect('/')
  }
}
