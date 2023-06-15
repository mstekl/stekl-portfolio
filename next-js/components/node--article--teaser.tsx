import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"
import { motion, useCycle } from "framer-motion"
import { absoluteUrl, formatDate } from "lib/utils"
import { useRef } from "react"

interface NodeArticleTeaserProps {
  node: DrupalNode
}


export function NodeArticleTeaser({ node, ...props }: NodeArticleTeaserProps) {
// console.log("NODO:", node);

  return (
    <article {...props} 
      className="rounded-2xl mb-16  transition-all hover:bg-teal-600/10 hover:-translate-y-1 hover:shadow-md group"
      >
      <Link href={node.path.alias} className="no-underline flex flex-col md:flex-row relative ">
        <>
      <div>
      {node.field_image && (
        <figure className="w-full aspect-video md:w-72 md:aspect-square mx-auto relative">
          <Image
            className="rounded-2xl border border-gray-200 object-cover"
            src={absoluteUrl(node.field_image.uri.url)}
            alt={node.field_image.resourceIdObjMeta.alt}
            fill={true}
            sizes="100vw"
          />
        </figure>
      )}
      </div>
      <div className="p-8 flex flex-col justify-center">
        <div className="mb-4 space-x-3 text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"><path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm300 230q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
            <span>{formatDate(node.created)}</span>
        </div>
        
        
          <h2 className="mb-4 text-xl font-bold text-gray-800">{node.title}</h2>
        
        <div className="max-h-24 overflow-clip text-gray-500">{node.body.summary}</div>
        
        <div
          className="mt-2 inline-flex items-center py-2 w-fit justify-end "
          >Read article
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 ml-2 group-hover:translate-x-2 group-hover:scale-110 transition-transform"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        </div>
        
      </div>
      </></Link>
    </article>
  )
}
