import { useEffect, useState } from "react";



export default function App () {
  
  const [valor, setValor] = useState("");

  const [result, setResult] = useState([]);


 
  const searchResult = async () => {
    const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
    const URL = `https://api.unsplash.com/search/photos?&query=${valor}&client_id=${API_KEY}`;

    const response = await fetch(URL);
    const data = await response.json();
    setResult (data.results)
    console.log(data)
  }

  useEffect(() => {
    if (valor){
      searchResult ("");
    }
  }, [valor])

 
  return (
    <>
    <header className="flex flex-col items-center font-quantico text-3xl py-10">
        <h1 className="py-2"> PICMA </h1>
        <p className="pt-5"> here you can search for any of your photo that you want </p>
      </header>
      
        
      

        <section className="flex flex-row  justify-center gap-2" >

          <input 
          onChange={e => setValor(e.target.value)}
          placeholder="Search what you want" 
          type="search"  
          className=" w-64 p-3 rounded-lg bg-252422 dark:placeholder-gray-400 dark:text-fffcf2 "
          />  
          
          <button 
          onClick={() => searchResult()}
          className="w-15 p-3 rounded-lg bg-252422 text-fffcf2"
         > Search </button>

        </section>

        <section className="flex flex-col items-center font-quantico text-3xl pt-10">
         
          <h2 className="flex">These are your results</h2>

          <div className="grid grid-cols-4 gap-2 w-full">
            { 
              result.map((elemento,index) => {
                return (

                  <div key={index} className=" shadow-2xl">

                    <img src={elemento.urls.regular} className="w-full h-full object-cover rounded-lg " />
                  </div>
                )
              })
            }
          </div>

        </section>
    </>
  )
}