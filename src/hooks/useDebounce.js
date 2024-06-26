//useDebounce is a custom React hook that allows a component to delay the execution of a callback function for a specified amount of time.

import { useEffect } from "react"
import useTimeout from "../2-useTimeout/useTimeout"

export default function useDebounce(callback, delay, dependencies) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}
