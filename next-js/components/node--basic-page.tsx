import { DrupalNode } from "next-drupal"
import { Body } from "./body"

interface NodeBasicPageProps {
  node: DrupalNode
}

export function NodeBasicPage({ node, ...props }: NodeBasicPageProps) {
  // console.log(node)
  return (
    <article className="container max-w-5xl py-24" {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      {node.body?.processed && (
        <div
          className="mt-6 font-serif text-xl leading-loose prose-xl">
            <Body value={node.body.processed} />
          </div>
        
      )}
    </article>
  )
}
