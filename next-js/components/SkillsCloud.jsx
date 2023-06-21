/**
 * grabbed the idea from https://codesandbox.io/s/yup2o
 */
import { Text, useGLTF, useScroll } from "@react-three/drei"
import {  useFrame } from "@react-three/fiber"
import { useMemo } from "react"
import { useRef } from "react"
import * as THREE from 'three'
import { lerp } from "three/src/math/MathUtils"


const SkillTerm = ( { children, ...props}) => {

    const fontProps = {
        font: '/fonts/IBMPlexSans-Medium.ttf', /** @todo: find a better font, please!! */
        fontSize: .25,
        letterSpacing: 0,
        lineHeight: 1, 
        'material-toneMapped': false
    }

    const ref = useRef()


    useFrame(({camera}) => {
        ref.current.lookAt(camera.position)
    })

    return <Text color={"#999"} ref={ref} {...props} {...fontProps}>{children}</Text>

}


const SkillsCloud = ({skillsList, ...props} ) => {

    

    const termsGroup = useRef()
    

    const cloudTerms = useMemo(() => {
        

        const terms = []
        const spherical = new THREE.Spherical()
        const param = 6
        const phiSpan = Math.PI / (param  + 1)
        const thetaSpan = (Math.PI * 2)  / param 

        for(let i = 1; i < param  + 1 ; i++){
            for(let j = 0; j < param  ; j++){
                terms.push([new THREE.Vector3().setFromSpherical(spherical.set(3, phiSpan* i , thetaSpan * j )), skillsList[Math.floor(Math.random() * skillsList.length)]])
            }
        }
        return terms
    }, skillsList)
   
    useFrame((f) => {
        const c = f.clock.getElapsedTime();
        const speed = .05
        termsGroup.current.rotation.y += f.mouse.y * speed * .25
        termsGroup.current.rotation.z += f.mouse.x * speed * .25
        termsGroup.current.rotation.x = c * 1.5 * speed

        

    })

  
    return (

        

        <group {...props} ref={termsGroup}>{
            cloudTerms.map( ([pos, term], index) => <SkillTerm key={index} position={pos}>{term}</SkillTerm> )
        }</group>

        
    )


    
}


export default SkillsCloud