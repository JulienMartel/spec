import { act, Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from '@react-spring/three'
import { AspectRatio, Box, Flex, useBreakpointValue, useColorMode, useColorModeValue } from "@chakra-ui/react";

// https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene
export const SplashBackground = ({amountOfSpheres=9}) => {
  
  const degrees = 360 / amountOfSpheres
  const radians = degrees * (Math.PI / 180)

  const spheres = new Array(amountOfSpheres).fill().map((_, i) => { // x=r∗sin(θ) ,y=r∗cos(θ)
    const r = 4
    const theta = ((i + 1) * radians)

    const x = r * Math.sin(theta)
    const y = r * Math.cos(theta)
    return [x, y, 0];
  })

  const purple = useColorModeValue("#805AD5","#D6BCFA")
  const sphereColor = useColorModeValue("#1A202C","#ffffff")

  return <Flex h="full" w={["100%",,,"50%"]}>
    <Canvas camera={{position: [0,0,9], pov: 60, aspect: 1 }} >

      <ambientLight intensity={0.4} />
      <pointLight intensity={0.4} position={[0,0,0]} args={[0xffffff]} /> 
      
      <directionalLight intensity={0.4} position={[5, 0, 0]} />
      <directionalLight intensity={0.2} position={[-5, 0, 0]} />

      <Spheres spheres={spheres} {...{purple, sphereColor}} />
    </Canvas>
  </Flex>
}

const Spheres = ({spheres, purple, sphereColor}) => {
  const amountOfSpheres = spheres.length
  
  const groupRef = useRef()
  useFrame(({ clock }) => {
    groupRef.current.rotation.y += Math.sin(clock.getElapsedTime() / 2 ) / 50
    groupRef.current.rotation.z += 0.015
  })

  return <group position={[0, 0, 0]}  ref={groupRef}>
    {spheres.map((pos, i) => <Sphere {...{
      pos, 
      i, 
      amountOfSpheres,
      sphereColor,
      purple
    }} />)}
  </group>
}

const Sphere = ({pos, i, amountOfSpheres, sphereColor, purple}) => {

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState((i % amountOfSpheres === 0))

  const getScale = () => {
    const scale = 1 - (window.scrollY / 400)
    if (scale < 0) return 0
    return scale
  }
  // find the position of the window for initial loading
  const [{ scale }, animate] = useSpring(() => ({
    from: {
      scale: getScale()
    }
  }))

  useWindowscroll(() => {
    animate({scale: getScale()})
  })

  return <animated.mesh
    scale={scale} 
    key={i} 
    position={pos}
    onClick={e => setActive(!active)}
    onPointerOver={e => setHover(true)}
    onPointerOut={e => setHover(false)}
  >
    <sphereGeometry />
    <meshStandardMaterial 
      args={[{
        color: 
          hovered || active ?
          purple : sphereColor
      }]} 
    />
  </animated.mesh>
}

const useWindowscroll = (callback) => {
  useEffect(() => {
    window.addEventListener('scroll', callback)
    return () => {
      window.removeEventListener('scroll', callback)
    }
  }, [callback])
}