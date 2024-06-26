// useUpdateEffect is a custom React hook that allows a component to run a callback function only when specific dependencies change.

import { useEffect, useRef } from "react"

export default function useUpdateEffect(callback, dependencies) {
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    return callback()
  }, dependencies)
}
