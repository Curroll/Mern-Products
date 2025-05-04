import { Box, Button, CloseButton, Dialog, Heading, HStack, Image, Input, Portal, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toaster } from "@/components/ui/toaster";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '@/store/product';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  
  // Corrected initialization of state
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image
  });

  const [isOpen, setIsOpen] = useState(false); // for Dialog control

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    try {
      const { success, message } = await updateProduct(pid, updatedProduct);
      
      // Show success or error message
      if (success) {
        toaster.create({
          title: "Product Updated",
          description: "The product was successfully updated!",
          type: "success",
        });
        setIsOpen(false); // Close the dialog if update is successful
      } else {
        toaster.create({
          title: "Update Failed",
          description: message || "Something went wrong while updating the product.",
          type: "error",
        });
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Something went wrong while updating the product.",
        type: "error",
      });
      console.error("Error updating product:", error);
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack gap={2}>
          {/* Edit Button will open the Dialog */}
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
              <Button variant="subtle" colorPalette="blue" onClick={() => setIsOpen(true)}>
                <FaEdit />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack gap={4}>
                      <Input
                        placeholder="Product Name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                      />
                      <Input
                        placeholder="Price"
                        name="price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                      />
                      <Input
                        placeholder="Image URL"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                      />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    {/* Cancel Button */}
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    {/* Update Button */}
                    <Button colorPalette="blue" onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                      Update
                    </Button>
                  </Dialog.Footer>
                  {/* Close Button (X) */}
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" onClick={() => setIsOpen(false)} />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          {/* Delete Button */}
          <Button
            variant="subtle"
            colorPalette="red"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDelete />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
