import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { AddItemModal } from "./itemModal/AddItemsModal";
import { useState } from "react";


export const AddItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <Flex justifyContent="flex-end"> 
      <AddItemModal isOpen={isOpen} onClose={onClose} />
      <Button
        size={"md"}
        colorScheme="blue"
        leftIcon={<AddIcon />}
        onClick={onOpen}
      >
        Add Item
      </Button>
    </Flex>
  );
};
