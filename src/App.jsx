import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [valor, setValor] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchResult = async (query = "") => {
    const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
    const URL = `https://api.unsplash.com/search/photos?&query=${query}&client_id=${API_KEY}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      setResult(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    searchResult("all"); // or searchResult("")
  }, []);

  const mensaje = result.length > 0 ? "Estos son tus resultados" : "Busca una foto";

  return (
    <>
      <motion.header 
       initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ duration: 0.5 }}
       className="flex flex-col items-center font-quantico text-3xl py-10">
        <h1 className="py-2"> PICMA </h1>
        <p className="pt-5"> Aquí puedes buscar cualquier foto que desees </p>
      </motion.header>

      <section className="flex flex-row  justify-center gap-2" >
        <input
          onChange={e => setValor(e.target.value)}
          placeholder="Busca lo que quieras" 
          type="search"  
          className=" w-64 p-3 rounded-lg bg-252422 dark:placeholder-gray-400 dark:text-fffcf2 "
        />  
        
        <motion.button 
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9  }}
         onClick={() => searchResult(valor)}
         className="w-15 p-3 rounded-lg bg-252422 text-fffcf2"
        > Buscar </motion.button>
      </section>

      <section className="flex flex-col items-center font-quantico text-3xl pt-10">
        <h2 className="">{mensaje}</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 w-full pt-5">

            { 
              result.map((elemento, index) => {
                return (

                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }} 
                    transition={{ duration: 1 }}
                    key={index} className=" shadow-2xl">
                    <img src={elemento.urls.regular} className="w-full h-full object-cover rounded-lg " />
                  </motion.div>

                )
              })
            }
          </div>
        )}
      </section>
    </>
  )
}