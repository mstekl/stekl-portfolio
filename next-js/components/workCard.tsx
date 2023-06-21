import { absoluteUrl } from "lib/utils"
import Image from "next/image"
import { Body } from "./body"

interface WorkParapgraphsNode {
    work: {
        [key: string]: any
    }
}


export function WorkCard({ work, ...props }: WorkParapgraphsNode) {
    
    return <article 
        { ...props }
        className="w-full h-auto relative border border-gray-200 shadow-md rounded-2xl group overflow-hidden  cursor-pointer mb-6" >
        <div 
            className="
            space-y-3 opacity-0 transition-all absolute z-50 
            from-white/90 from-50% to-transparent bg-gradient-to-b inset-x-0 top-0 pb-32 pt-8 px-8 flex items-end
            group-hover:opacity-100">

            <div className="text-teal-950">
            <h2 className="text-teal-800 font-bold text-3xl text-shad drop-shadow-xl ">{work.field_titulo}</h2>
            <Body value={work.field_body.value} />
            </div>
        </div>                

            {work.field_imagen && (
                
                <Image
                height={0}
                width={0}
                className="
                    w-full h-auto  transition-all opacity-80 
                    group-hover:scale-110 group-hover:opacity-60 group-hover:grayscale group-hover:brightness-100"
                src={absoluteUrl(work.field_imagen.uri.url)}
                alt={work.field_imagen.resourceIdObjMeta.alt}
                sizes="100vw"
                />
            
            )}
        
        </article>
}