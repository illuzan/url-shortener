import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'

// @ts-ignore
import * as build from '../build'

const handleRequest = createPagesFunctionHandler({
  build,
  getLoadContext(context) {
    // read the env from the Cloudflare context and pass it to remix `context`
    return {
      env: context.env,
    }
  },
})

export async function onRequest(context) {
  return handleRequest(context)
}
