const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY

export const searchPhotos = async ({ search }) => {

    if (search == '') return null 

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=${API_KEY}`)
        const json = await response.json()

        const photos = json.results
  
        return photos?.map(photo => ({
          id: photo.id,
          image: photo.urls.regular 
        }))
    } catch (e) {
        throw new Error (' Error searching Photos')
    }
}