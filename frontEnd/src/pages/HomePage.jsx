import { useProductStore } from '@/store/product'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'



const HomePage = () => {
  const {fetchProducts, products } = useProductStore();
  useEffect(()=>{
    fetchProducts();
  },[fetchProducts ])
  console.log("products:", products)
  return (
   <Container maxW={"Container.xl"} py={12}>
    <VStack spacing={8} >
      <Text
      fontSize={"l"}
      fontWeight={"bold"}
      bgGradient={"to-r"}
      gradientFrom={"cyan.400"}
      gradientTo={"blue.500"} 
      bgClip={"text"}
      textAlign={"center"}
      >
        Current Products 🚀
      </Text>

      <SimpleGrid columns={{
        base:1,
        md:2,
        lg:3
      }} 
      gap={'40px'}
      w={'full'}> 
      { products.map((product)=>(
        <ProductCard key={product._id} product={product}/>
      ))}
      </SimpleGrid>
      {products.length===0 && (
          <Text fontSize={'sm'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
          No Product Found {" "}
          <Link to={'/create'}>
          <Text as={'span'} color={'blue.500'} _hover={{textDecoration:'underline'}}>
            Create a Product
          </Text>
          </Link>
         </Text> 
      )}
     
    </VStack>

   </Container>
  )
}

export default HomePage