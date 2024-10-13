import React, { useEffect, useState, useCallback} from "react";

import { usePhotos } from "./hooks/usephotos";
import { Photos } from "./components/Photos";
import { useSearch } from "./hooks/useSearch";
import { motion } from "framer-motion";
import debounce from "just-debounce-it";

export default function App () {

  const [sort, setSort] = useState(false)
  
  const {search, updateSearch, error} = useSearch()
  const {photos, loading, getPhotos} = usePhotos({ search , sort })

  const debouncedGetPhotos = useCallback (debounce ( search => {
    console.log('search', search)
    getPhotos({search})
  }, 300)
  ,[])

  const handleSubmit = (event) => {

    event.preventDefault() 
    getPhotos({search})
  }

  const handleSort = () => {
    setSort(!sort)
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
      className="flex flex-col items-center font-quantico text-xl py-10">

        <h1 className="flex justify-center text-5xl"> Picma </h1>
        <p className="pt-5"> Aquí puedes buscar cualquier foto que desees </p>
        <form 
        onSubmit={handleSubmit}
        className="flex flex-row gap-5 pt-10">

          <input 
          onChange={handleChange}
          value={search}
          name="query"
          placeholder="busca tus películas aquí..." className="w-72 h-15 rounded-lg bg-252422 dark:placeholder-gray-400 dark:text-fffcf2"/>

          <input type="checkbox" onChange={handleSort}  checked={sort}/>
          
          <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9  }}
          type="submit" 
          className="w-15 p-3 rounded-lg bg-252422 text-fffcf2">
            buscar
          </motion.button>
        </form>
        {error && <p className="text-slate-950 text-center pt-5">{error}</p>}
      </motion.header> 

    <main>
      {
        loading ? <p className="flex justify-center font-quantico text-2xl">Cargando...</p> : <Photos photos={photos} />   }
      
    </main>

    </>
  )
}