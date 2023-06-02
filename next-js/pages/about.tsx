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

interface AboutPageProps {
  aboutNode: DrupalNode
}

export default function AboutPage({ aboutNode }: AboutPageProps) {
  
  const mouse = useRef([0, 0])
  return (
    <Layout>
      <Head>
        <title>Mauricio Stekl personal site</title>
        <meta
          name="description"
          content="Hi. This is my personal website"
        />
      </Head>
      <div key="about" className="flex flex-col justify-center items-center relative  overflow-hidden">
        <div className="container z-10">
          <div className="w-4/5 xl:w-3/5 2xl:w-2/5 p-16 items-center justify-center rounded-xl group  bg-slate-100  shadow-xl ">
            <Body value={aboutNode.body.processed} />
          </div>
        </div>
        <div className="absolute top-0 left-1/4 w-full h-full">
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [- 9, 10, 6]
            }}
          >

<ambientLight />


             <Float
  speed={1} // Animation speed, defaults to 1
  rotationIntensity={1} // XYZ rotation intensity, defaults to 1
  floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
  floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
>

              <SkillsCloud />
            
              <Particles count={450} mouse={mouse} />
            </Float>
          </Canvas></div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<AboutPageProps>> {
  

  const aboutNode = await drupal.getResource<DrupalNode>(
    "node--page",
    "106df538-7bdb-4d6c-8651-da1c5f580b6f" /* hardcoded the uuid for the About node. Might be good to refactor this */
  )
  // console.log("COSO", aboutNode)
  return {
    props: {
      aboutNode,
    },
  }
}
