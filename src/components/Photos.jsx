import { motion } from "framer-motion";

export function ListOfPhotos ({ photos }) {
    return (
        <> 
        <div className="px-2 grid md:grid-cols-2 lg:grid-cols-4 gap-3 w-full pt-5 md:px-2">
            {
              photos.map(photo => (
                <motion.div key={photo.id} 
                initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }} 
                    transition={{ duration: 1 }}
                className="shadow-2xl rounded-lg">
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
        <p className="flex justify-center font-quantico text-xl md:text-3xl xl:text-4xl 2xl:text-7xl py-10 pt-10 text-red-400"> No photos found </p>
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