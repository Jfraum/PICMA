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
        setError('No se puede buscar una foto vacía')
        return
      }
  
      if (search.length < 2 ) {
        setError('la búsqueda debe tener al menos 2 caracteres')
  
        return
      }
  
      setError(null)
  
    }, [search])
  
    return {search, updateSearch, error}
  }
  