
import { searchPhotos } from '../services/photos'
import { useRef, useState, useMemo, useCallback } from 'react'

export function usePhotos ({ search }) {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState (null)
  const previusSearch = useRef(search)


    const getPhotos = useCallback (async ({ search }) => {
      if ( search == previusSearch.current) return

     try {
      setLoading(true)
      setError(null)  
      previusSearch.current = search
      const newPhotos = await searchPhotos ({ search })
     setPhotos(newPhotos)
    }
    catch (e) {
      setError(e.message)

    }
    finally {
      setLoading(false)
    }
  }, [])


 
  
    return {photos, getPhotos, loading, error}
  }