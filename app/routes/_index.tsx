import { nanoid } from "nanoid/non-secure";
import { useEffect, useRef } from "react";
import { ActionArgs } from "@remix-run/cloudflare";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

export async function action({ context, request }: ActionArgs) {
  const formData = await request.formData();
  const longUrl = formData.get("long-url");

  if (typeof longUrl !== "string") {
    return { error: "Enter a valid url" };
  }

  const expression =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/im;

  if (!expression.test(longUrl)) {
    return { error: "Enter a valid url" };
  } else {
    const shortUrl = nanoid(8);
    await context.LONG_URL_KV.put(shortUrl, longUrl, {
      // Keys expire in 30 days
      // expirationTtl: 2592000,
    });
    const url = `${new URL(request.url).origin}/${shortUrl}`;
    return { url };
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const state =
    navigation.state === "submitting"
      ? "submitting"
      : actionData?.url
      ? "success"
      : actionData?.error
      ? "error"
      : "idle";

  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }

    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    if (state === "success") {
      successRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
  }

  return (
    <main className="relative flex flex-col justify-center min-h-screen py-6 overflow-hidden bg-gray-50 sm:py-12">
      <img
        src="/background.jpg"
        alt=""
        className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-none"
        width="1308"
      />
      <div className="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mt-[-10rem]">
        {/* Text */}
        <div className="px-4 py-10 mx-auto sm:w-3/4 lg:w-2/3 sm:p-10 lg:mb-10">
          <h1 className="mb-6 text-6xl font-extrabold leading-none tracking-tight text-center">
            Create Short URL!
          </h1>
          <p className="justify-center mx-auto text-xl font-normal leading-7 text-center xl:w-2/4">
            Fast and simple website to create a shortened URL, easy to remember
            and share.
          </p>
        </div>

        {/* Container */}
        <div className="px-4 py-10 mx-auto sm:w-3/4 lg:w-2/3 xl:w-2/5 sm:p-10 md:rounded glass">
          {/* Input */}
          <Form
            replace
            method="post"
            className="check"
            hidden={state === "success"}
          >
            <fieldset
              disabled={state === "submitting"}
              className="py-10 sm:mx-auto sm:max-w-2xl sm:flex "
            >
              <div className="flex-1 min-w-0">
                <label htmlFor="long-url" className="sr-only">
                  Long URL
                </label>
                <input
                  aria-label="Url"
                  aria-describedby="error-message"
                  ref={inputRef}
                  required={true}
                  name="long-url"
                  id="long-url"
                  type="url"
                  tabIndex={state === "success" ? -1 : 0}
                  className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 transition-colors border border-transparent rounded-md shadow-sm disabled:bg-gray-200 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-600 "
                  placeholder="https://www.example.com/"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  tabIndex={state === "success" ? -1 : 0}
                  className="block w-full px-5 py-3 text-base font-medium text-white transition-colors bg-blue-500 border border-transparent rounded-md shadow disabled:bg-blue-400 sm:w-48 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:px-10 "
                >
                  {state === "submitting" ? "Creating..." : "Get Short URL"}
                </button>
              </div>
            </fieldset>
            <p
              className="flex justify-center text-xl font-semibold text-red-400"
              id="error-message"
            >
              {state === "error" ? actionData.error : <>&nbsp;</>}
            </p>
          </Form>
          {/* Output */}
          <div hidden={state !== "success"}>
            <div className="py-10 sm:mx-auto sm:max-w-2xl sm:flex">
              <div ref={successRef} className="flex-1 min-w-0">
                <input
                  className="block w-full px-5 py-3 text-base text-gray-700 placeholder-gray-500 border-2 border-gray-300 rounded-md shadow-sm disabled:bg-gray-200 focus:outline-none "
                  type="url"
                  required
                  value={actionData?.url ? actionData?.url : ""}
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <button
                  className="block w-full px-5 py-3 text-base font-medium text-white transition-colors bg-blue-500 border border-transparent rounded-md shadow disabled:bg-blue-400 sm:w-48 hover:bg-blue-400 focus:outline-none focus:ring-2"
                  onClick={() => copyToClipboard(actionData?.url)}
                >
                  <span className="sr-only">(Click to copy to clipboard)</span>
                  Copy URL
                </button>
              </div>
            </div>
            <Link
              className="flex justify-center text-xl font-semibold text-gray-700"
              to="."
              tabIndex={state === "success" ? 0 : -1}
            >
              Create new link
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
