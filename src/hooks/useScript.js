// useScript is a custom React hook that allows a component to load a JavaScript file from a given URL and keep track of the loading, error, and value states.

import useAsync from "../9-useAsync/useAsync"

export default function useScript(url) {
  return useAsync(() => {
    const script = document.createElement("script")
    script.src = url
    script.async = true

    return new Promise((resolve, reject) => {
      script.addEventListener("load", resolve)
      script.addEventListener("error", reject)
      document.body.appendChild(script)
    })
  }, [url])
}
