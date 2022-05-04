
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
export const useFetch = (url) => {
  const [subState, setSubState] = useState([])

  // useCallback to avoid unnecessary rendering
  const getUrlData = useCallback(async () => {
    try {
      const resp = await axios.get(url)
      setSubState(resp.data)
    } catch (error) {
      console.log(error)
    }
  }, [url])
  // useEffect hook with url and getUrlData dependancies to stop infinte loops
  useEffect(() => {
    getUrlData()
  }, [url, getUrlData])
  return { subState }
}
