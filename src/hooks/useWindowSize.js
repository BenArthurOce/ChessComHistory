// useWindowSize is a custom React hook that allows a component to keep track of the current size of the browser window.

import { useState } from "react"
import useEventListener from "../13-useEventListener/useEventListener"

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEventListener("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  })

  return windowSize
}
