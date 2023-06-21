import { absoluteUrl } from "lib/utils";
import { DrupalNode } from "next-drupal"
import Image from "next/image";
import { Body } from "./body"
import { H1Title } from "./h1Title";

interface NodeBasicPageProps {
  node: DrupalNode
}

export function NodeBasicPage({ node, ...props }: NodeBasicPageProps) {
  return (
    <article className="container max-w-5xl py-24 px-4 " {...props}>
      <H1Title>{node.title}</H1Title>
      {node.body?.processed && (
        <div
          className="mt-6 text-xl max-w-none prose lg:prose-xl">
            <Body value={node.body.processed} />
          </div>
        
      )}
      {node.field_paragraphed_body.length > 0 && (
        <div className="py-8">
          {node.field_paragraphed_body.map(el => {
            return <article key={el.id} className="py-8 flex flex-row flex-wrap gap-6">
                <h2 className="w-full text-2xl font-bold text-teal-800 ">{el.field_titulo}</h2>
                {el.field_imagen && (
                    <figure className=" h-72 w-1/3 relative object-cover">
                      <Image
                        className="rounded-2xl border border-gray-200"
                        src={absoluteUrl(el.field_imagen.uri.url)}
                        alt={el.field_imagen.resourceIdObjMeta.alt}
                        fill={true}
                      />
                    </figure>
                  )}
                {el.field_body && <div className="flex-1 prose"><Body value={el.field_body.value} /></div>}
              </article>
          })}
        </div>
      )}
    </article>
  )
}
