import { motion } from "framer-motion";

export function ListOfPhotos ({ photos }) {
    return (
        <> 
        <div className="grid grid-cols-3 gap-3 w-full pt-5 ">
            {
              photos.map(photo => (
                <motion.div key={photo.id} 
                initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }} 
                    transition={{ duration: 1 }}
                className="shadow-xl rounded-lg">
                  <img src={photo.image} className=" w-full h-full object-cover rounded-lg"/>
                </motion.div>
              ))
            }
          </div>
        </>
    )
}

export function NoPhotosResults () {
    return (
        <p className="flex justify-center font-quantico text-3xl py-10 pt-10 text-red-400"> No se encontraron fotos para esta búsqueda </p>
    )
}

export function Photos ({photos}){

    
    const hasPhotos = photos?.length > 0 


    return (

        hasPhotos
        ? <ListOfPhotos photos={photos} />
        : <NoPhotosResults />
    )
}