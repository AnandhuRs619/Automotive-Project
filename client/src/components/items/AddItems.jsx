import { AddIcon } from "@chakra-ui/icons"
import { Button, Flex } from "@chakra-ui/react"


export const AddItems = () => {
  return (
    <Flex ml={"90%"} w="100%">
    <Button  size={"md"} colorScheme="blue" leftIcon={<AddIcon />} onClick={() => console.log("Add item clicked")}>
        Add Item
      </Button>
      </Flex>
  )
}
