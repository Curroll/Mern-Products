import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode } from './ui/color-mode';
import { LuSun } from 'react-icons/lu';
import { FaMoon } from "react-icons/fa6";



const Navbar = () => {
    const {colorMode,toggleColorMode} = useColorMode()
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex h={16 }
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{base:"column", sm :"row"}}>
             <Text  fontSize={{base:"22", sm: "28"}}
             fontWeight={"bold"}
             textTransform={"uppercase"}
             textAlign={"center"}
             bgGradient={"to-r"}
             gradientFrom={"cyan.400"}
             gradientTo={"blue.500"}
             bgClip={"text"}
             >
                <Link to={"/"}>Product Store 🛒</Link>
             </Text>

             <HStack spacing={2} alignItems={"center "}>
                 <Link to={"/create"}> 
                 <Button variant="subtle" >
                 <CiSquarePlus fontSize={20} />
                 
                 </Button>
                  </Link>
                  <Button variant="subtle" onClick={toggleColorMode }>
                    {colorMode == "light"? <FaMoon />:<LuSun fontSize={20} />}
                 </Button>
             </HStack>
        </Flex>
    </Container  >
  )
}

export default Navbar