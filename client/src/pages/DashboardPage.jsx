import { Box, Flex, Text } from "@chakra-ui/react"
import MenuComponent from "../components/common/Menu"


export const DashboardPage = () => {
  return (
  <>
   <MenuComponent/>
    <Flex w='auto'
    h="100vh"
    
    >
    <Box flex="1" p="4">
    <Text>This is the main content area</Text>
  </Box>

    </Flex>
  </>
   
  )
}
