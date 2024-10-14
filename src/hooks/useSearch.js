import { useState, useEffect, useRef } from "react"

export function useSearch () {

    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)
  
    useEffect(() => {
  
      if ( isFirstInput.current) {
        isFirstInput.current = search == ''
        return
      }
  
      if (search == '') {
        setError('Cant search for an empty photo')
        return
      }
  
      if (search.length < 2 ) {
        setError('search must be at least 2 characters')
  
        return
      }
  
      setError(null)
  
    }, [search])
  
    return {search, updateSearch, error}
  }
  