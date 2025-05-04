import { useProductStore } from '@/store/product';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';  // Import useColorModeValue
import { toaster } from '@/components/ui/toaster'; // Import toaster
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useColorModeValue } from '@/components/ui/color-mode';


const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  }); 
  
  const { createProduct } = useProductStore();
  const navigate = useNavigate();  // Initialize navigate function

  // Define the border color for light and dark mode
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log("success:", success);
    console.log("message:", message);
  
    if (!success) {
      // Trigger error toast
      toaster.create({
        title: "Error",
        description: message,
        type: "error",  // Custom type (depending on your toaster setup)
      });
    } else {
      // Trigger success toast
      toaster.create({
        title: "Success",
        description: message,
        type: "success",  // Custom type
      });
      
      // Redirect to homepage after success
      navigate('/');  // Navigate to the homepage
    }
    
    // Reset the form
    setNewProduct({name: "", price: "", image: ""});
  };

  return (
    <Container maxW={'2xl'}>
      <VStack gap={8}>
        <Heading as={'h1'} fontSize={'3 xl'} textAlign={"center"} mb={8}
        bgGradient={'to-r'}
        gradientFrom={'cyan.400'} gradientTo={'blue.600'}
        bgClip={'text'}>
          Create New Product 
        </Heading>
        <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack gap={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              borderColor={inputBorderColor} // Apply dynamic border color
            />

            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              borderColor={inputBorderColor} // Apply dynamic border color
            />

            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              borderColor={inputBorderColor} // Apply dynamic border color
            />

            <Button colorPalette={"blue"} onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
