import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeArticleTeaser } from "components/node--article--teaser"

interface BlogPageProps {
  nodes: DrupalNode[]
}

export default function BlogPage({ nodes }: BlogPageProps) {
  return (
    <Layout>
      <Head>
        <title>Mauricio Stekl's blog</title>
        <meta
          name="description"
          content="Blog built with Next.js with Drupal for the backend."
        />
      </Head>
      <div className="px-8 py-16 container max-w-5xl ">
        <h1 className="mb-10 text-4xl text-center font-black">My blog</h1>
        <p className="text-gray-500 text-center">Blog is using Drupal for the backend. I will try to write mostly content in Spanish, 
        since internet is already full of high quality technical content in English, and not so much in my original language.</p>
        <hr className="my-20" />

        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <NodeArticleTeaser node={node} />
              
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<BlogPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,body,field_image,uid,created",
        include: "field_image,uid",
        sort: "-created",
      },
    }
  )

  return {
    props: {
      nodes,
    },
  }
}
