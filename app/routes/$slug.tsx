import { redirect } from 'remix'
import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ context, params }) => {
  const redirectUrl = await context.env.LONG_URL_KV.get(params.slug)
  if (redirectUrl) {
    return redirect(redirectUrl)
  } else {
    return redirect('/')
  }
}
