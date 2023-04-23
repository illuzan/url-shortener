import { LoaderArgs, redirect } from "@remix-run/cloudflare";

export async function loader({ context, params }: LoaderArgs) {
  const redirectUrl = await context.LONG_URL_KV.get(params.slug);
  if (redirectUrl) {
    return redirect(redirectUrl);
  } else {
    return redirect("/");
  }
}
