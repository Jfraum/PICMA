import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'
import { useState } from 'react'



export function usePhotos ({ search }) {

  const [responsePhotos, setResponsePhotos] = useState([])

    const photos = responsePhotos.results
  
    const mappedPhotos = photos?.map(photo => ({
      id: photo.id,
      image: photo.urls.full
    }))

  

    const getPhotos = () => {
      if (search) {
        fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=Tgsh14TNC0V0DAUt2rX72_QBzF22qyO-khCA0SB7kA4`)
        .then (res => res.json())
        .then(json => {
          setResponsePhotos(json)
        })
      }
      else {
        setResponsePhotos(withoutResults)
      }
    }
  
    return {photos: mappedPhotos, getPhotos}
  }