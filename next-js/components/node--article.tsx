import Image from "next/image"
import { DrupalNode } from "next-drupal"
import { NextRouter, useRouter } from "next/router"
import { absoluteUrl, formatDate } from "lib/utils"
import { Body } from "./body"
import { H1Title } from "./h1Title"


interface NodeArticleProps {
  node: DrupalNode
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {

  const router: NextRouter = useRouter()

  return (
    <article className="container max-w-5xl py-24 px-4 md:px-0" {...props}>
      <button type="button" className="mb-8 text-slate-500" onClick={() => router.back()}>&lt; Back to blog</button>

      <H1Title>{node.title}</H1Title>
      
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image && (
        <figure className="my-16">
          <Image
            src={absoluteUrl(node.field_image.uri.url)}
            width={768}
            height={400}
            alt={node.field_image.resourceIdObjMeta.alt}
            priority
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.body?.processed && (
        
        <div
          className="mt-6 font-serif text-xl leading-loose prose">
            <Body value={node.body.processed} />
          </div>
        
      )}
    </article>
  )
}
