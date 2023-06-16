import Head from "next/head"
import { DrupalNode } from "next-drupal"
import { Canvas, useStore } from "@react-three/fiber"
import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import SkillsCloud from "components/SkillsCloud"
import { GetStaticPropsResult } from "next"
import { Body } from "components/body"
import Particles from "components/Particles"
import { useRef } from "react"
import { Float, Stage } from "@react-three/drei"
import Image from "next/image"
import { absoluteUrl } from "lib/utils"
import { WorkCard } from "components/workCard"
import { H1Title } from "components/h1Title"

interface WorkPageProps {
  aboutNode: DrupalNode
}

export default function WorkPage({ aboutNode }: WorkPageProps) {

  return (
    <Layout>
      <Head>
        <title>My Work</title>
        <meta
          name="description"
          content="A glimpse of my work experience"
        />
      </Head>
      <article key="work" className="py-16 container px-4 lg:px-0">
      
        <div className="container max-w-5xl ">

          <H1Title>{aboutNode.title}</H1Title>
          {aboutNode.body?.processed && (
            <div
              className="mt-6 text-xl max-w-none prose lg:prose-xl">
                <Body value={aboutNode.body.processed} />
              </div>
            
          )}
        </div>
          
      {aboutNode.field_paragraphed_body.length > 0 && (
        <div className="py-16 columns-1 md:columns-2 xl:columns-3 gap-6">
          {aboutNode.field_paragraphed_body.map(el => {
            return <WorkCard key={el.id} work={el} />
          })}
        </div>
      )}
      </article>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<WorkPageProps>> {
  

  const aboutNode = await drupal.getResource<DrupalNode>(
    "node--page",
    "0711e4d2-8b65-4110-819a-6b0a5ae0171e", /* hardcoded the uuid for the Work node. Might be good to refactor this */
    {
      params: {
        include: "field_paragraphed_body,field_paragraphed_body.field_imagen"
      }
    }
  )
  return {
    props: {
      aboutNode,
    },
  }
}
