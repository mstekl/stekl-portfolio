import Head from "next/head"
// import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
// import { NodeArticleTeaser } from "components/node--article--teaser"

interface IndexPageProps {
  nodes: DrupalNode[]
}

export default function IndexPage({ nodes }: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>Contact me</title>
        <meta
          name="description"
          content="Hi. This is my personal website"
        />
      </Head>
      <div  className="flex justify-center items-center">
        contact me
      </div>
    </Layout>
  )
}

// export async function getStaticProps(
//   context
// ): Promise<GetStaticPropsResult<IndexPageProps>> {
//   const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
//     "node--article",
//     context,
//     {
//       params: {
//         "filter[status]": 1,
//         "fields[node--article]": "title,path,field_image,uid,created",
//         include: "field_image,uid",
//         sort: "-created",
//       },
//     }
//   )

//   return {
//     props: {
//       nodes,
//     },
//   }
// }
