import React, {useCallback} from "react";

import { usePhotos } from "./hooks/usephotos";
import { Photos } from "./components/Photos";
import { useSearch } from "./hooks/useSearch";
import { motion } from "framer-motion";
import debounce from "just-debounce-it";

export default function App () {

  
  const {search, updateSearch, error} = useSearch()
  const {photos, loading, getPhotos} = usePhotos({ search  })

  const debouncedGetPhotos = useCallback (debounce ( search => {
    console.log('search', search)
    getPhotos({search})
  }, 300)
  ,[])

  const handleSubmit = (event) => {

    event.preventDefault() 
    getPhotos({search})
  }


  const handleChange = (event) => {
    const newSearch = event.target.value

    updateSearch(newSearch)

    debouncedGetPhotos(newSearch)
  }


 
  return (
    <>

      <motion.header 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center font-quantico">

        <h1 
        className="text-3xl sm:text-4xl md:text-6xl xl:text-8xl 2xl:text-9xl"> 
        Picma 
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl xl:text-5xl 2xl:text-7xl"> Here you can seach for any photo </p>

        <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center pt-5 gap-5 sm:flex-row">

          <input 
          onChange={handleChange}
          value={search}
          name="query"
          placeholder="Search for your photo..." 
          className="w-full p-2 text-sm sm:text-xl xl:text-4xl 2xl:text-6xl 2xl:gap-5 rounded-lg bg-252422 placeholder:text-fffcf2 text-fffcf2 placeholder:text-sm placeholder:text-center md:placeholder:text-lg xl:placeholder:text-2xl 2xl:placeholder:text-5xl"/>

          
          <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9  }}
          type="submit" 
          className="md:text-lg xl:text-4xl 2xl:text-7xl p-2 rounded-lg bg-252422 text-fffcf2">
            Search
          </motion.button>
        </form>
        {error && <p className="pt-5">{error}</p>}
      </motion.header> 

    <main className="font-quantico flex justify-center items-center">
      {
        loading ? <p className="">Loading...</p> : <Photos photos={photos} />   }
      
    </main>

    </>
  )
}