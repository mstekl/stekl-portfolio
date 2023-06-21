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

  const skillsList = ["Next.js", "Drupal", "Wordpress", "Javascript", "PHP", "HTML", "CSS", "React", "Three.js", "R3F", "jQuery", 
  "Linux", "Nginx", "Apache", "MySQL", "MongoDB", "Bash", "SASS", "Git", "Symfony", "Gatsby", "Jekyll", "Bootstrap", 
  "SEO", "TailwindCSS"] /** refactor this. needs to fetched from Drupal taxonomy or something  */


  
  const mouse = useRef([0, 0])
  return (
    <Layout>
      <Head>
        <title>About Mauricio Stekl</title>
        <meta
          name="description"
          content="Who is Mauricio?"
        />
      </Head>

      <div key="about" className="flex flex-col justify-center items-center relative  overflow-hidden w-screen">
        
        <div className="container z-10 px-4 pt-32 md:pt-0">
          <div className="
              py-8 p-6 md:p-16 items-center justify-center rounded-xl group  bg-slate-100  shadow-xl
              max-[650px]:w-full min-[651px]:w-3/5 xl:w-3/5 2xl:w-1/2  
              ">
            <article className="prose prose-slate xl:prose-xl  ">
              <Body value={aboutNode.body.processed} />
            </article>
          </div>
        </div>

        <div className="absolute -top-1/2 left-0 sm:-top-[15%] md:left-[20%] w-full h-full ">
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [- 9, 8, 6]
            }}
          >
            <ambientLight />
            <Float
                  speed={1} 
                  rotationIntensity={1} 
                  floatIntensity={1} 
                  floatingRange={[-1, 1]} 
                >

              <SkillsCloud  skillsList={skillsList} />
              
              <Particles count={300} mouse={mouse} />
            </Float>
          </Canvas>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<AboutPageProps>> {
  

  const aboutNode = await drupal.getResource<DrupalNode>(
    "node--page",
    "106df538-7bdb-4d6c-8651-da1c5f580b6f" /* hardcoded the uuid for the About node. Might be good to refactor this */
  )
  
  return {
    props: {
      aboutNode,
    },
  }
}
