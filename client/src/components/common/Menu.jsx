
import { Box, Text, VStack } from '@chakra-ui/react';

function MenuComponent() {
  return (
    <Box display="flex">

    
    <VStack
    bg="gray.100"
    w="250px"
    h="100vh"
    p="4"
    
    borderRight="1px"
    borderColor="red.200"
    position="fixed"
    left="0"
    top="0"
  >
   <Box py="2" px="4" bg="white" w="100%" borderBottom="1px" borderColor="gray.200">
      <Text>Dashborad</Text>
    </Box>
   <Box py="2" px="4" bg="white" w="100%" borderBottom="1px" borderColor="gray.200">
      <Text>Customers</Text>
    </Box>
   <Box py="2" px="4" bg="white" w="100%" borderBottom="1px" borderColor="gray.200">
      <Text>Products</Text>
    </Box>
    
  </VStack>
  </Box>
  );
}





export default MenuComponent;
