import Head from "next/head"
// import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { Canvas, extend, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from 'three'
import { CameraControls, Float, MeshPortalMaterial, Plane, Text, Text3D, useTexture } from "@react-three/drei"
import { geometry } from 'maath'

extend(geometry)



// const GOLDENRATIO = 1.61803398875


export default function IndexPage({ nodes }) {

  

  return (
    <Layout>
      <Head>
        <title>Mauricio Stekl personal site</title>
        <meta
          name="description"
          content="Hi. This is my personal website"
        />
      </Head>
      <div key="home" className="flex absolute px-4 top-32 md:top-52 z-50 ">
        <p className="text-center">Hi, I&apos;m <strong>Mauricio Stekl</strong>,<br />
        <span className="italic">a full-stack web developer, photographer, father, vintage enthusiast.</span></p>
      </div>

      <div className="absolute top-0 left-0  w-full h-full z-30">
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200
            }}
          >
            
            <ambientLight />
            <Float
                  speed={1} 
                  rotationIntensity={2} 
                  floatIntensity={.1} 
                  floatingRange={[-.5, .5]} 
                  
                >

                <Portal id="01" title="Coder" bg="#ccfbf1" position={[-4.75, 0, 0]} rotation={[0, 0, 0]} width={2} height={2}>
                  <mesh  position={[-1.5, -.5, -2]}>
                    <Text3D 
                      font="/fonts/Inter_Bold.json"
                      curveSegments={32}
                      bevelEnabled
                      bevelSize={0.04}
                      bevelThickness={0.1}
                      height={0.5}
                      lineHeight={0.5}
                      letterSpacing={-0.06}
                      size={1}
                      >{`</>`}
                        <meshNormalMaterial />
                      </Text3D>
                    
                  </mesh>
                </Portal> 

              <Portal id="02" title="Photos" bg="#14b8a6" position={[-2.25, 0, 0]} rotation={[0, 0, 0]} width={2} height={2}>
              <mesh  position={[-1.5, -.1, -5]}>
                    <Text3D 
                      font="/fonts/Inter_Bold.json"
                      curveSegments={32}
                      bevelEnabled
                      bevelSize={0.04}
                      bevelThickness={0.1}
                      height={0.5}
                      lineHeight={0.5}
                      letterSpacing={-0.06}
                      size={1}
                      >{`Photos`}
                        <meshNormalMaterial />
                      </Text3D>
                    
                  </mesh>
              </Portal>
              
              <Portal id="03" title="Father" bg="#0f766e" position={[.25, 0, 0]} rotation={[0, 0, 0]} width={2} height={2}>
                
                    <Foto  position={[0, 0, -4]} fotoPath={'/fotos/con_los_gurises.jpg'}  size={[3, 3]} />
                  
              </Portal>

              <Portal id="04" title="Vintage Enthusiast" bg="#134e4a" position={[2.75, 0, 0]} rotation={[0, 0, 0]} width={2} height={2}>
              
                <Foto position={[-2, 1, -7]} fotoPath={'/fotos/fusca_1.jpg'}  size={[3, 3]} />
                <Foto position={[2, 1, -7]} fotoPath={'/fotos/fusca_2.jpg'}  size={[4, 3]} />
                <Foto position={[-2, -3, -7]} fotoPath={'/fotos/kombi_1.jpg'}  size={[3, 4]} />
                <Foto position={[1.45, -3, -7]} fotoPath={'/fotos/kombi_2.jpg'}  size={[3, 4]} />

              </Portal>

            </Float>

              


            <Rig />
          </Canvas>
        </div>
    </Layout>
  )
}

function Foto({fotoPath, position = [0, 0, 0], size = [1, 1], ...props}) {
  const foto = useTexture(fotoPath)
  return (<group position={position}>
    <mesh>
      <Plane args={size} position={[0, 0, 0]}>
        <meshBasicMaterial attach="material" map={foto} />
      </Plane>
    </mesh>
      <mesh  >
        <Plane position={[0, 0, -0.1]} args={[size[0] *1.1, size[1] *1.1]}>
          <meshBasicMaterial color="#FFFFFF" />
        </Plane>
      </mesh>
    </group>)
}


function Portal({ id, title, bg, width = 1, height = 1.67, children, ...props }) {
  const portal = useRef();

  const fontProps = {
        font: '/fonts/IBMPlexSans-Medium.ttf', /** @todo: find a better font, please!! */
        fontSize: .25,
        letterSpacing: 0,
        lineHeight: 1, 
        'material-toneMapped': false
    }



  return <group {...props}>

    <mesh name={id} position={[0, 0, 0]}>
      <roundedPlaneGeometry args={[width, height, 0.09]}  />
      <MeshPortalMaterial ref={portal} >
        <ambientLight />
        <color attach="background" args={[bg]} />
        {children}
      </MeshPortalMaterial>
      
    </mesh>
    <mesh name={id} position={[0, 0, -0.001]}>
        <roundedPlaneGeometry args={[width + 0.02, height + 0.02, 0.1]} />
        <meshBasicMaterial color="#115E59" side={THREE.DoubleSide} />
      </mesh>

  </group>

}


function Rig({ position = new THREE.Vector3(0, 0, 14), focus = new THREE.Vector3(-1, .25, 0) }) {
  const { controls, scene } = useThree()
  
  useEffect(() => {
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })

  return <CameraControls makeDefault minPolarAngle={-1 * Math.PI / 2} maxPolarAngle={Math.PI } draggingSmoothTime={.5}  />
}
