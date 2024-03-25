import { useState } from 'react';
import { Button, Flex, Icon } from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa'; // Import the user plus icon
import { CreateUserModal } from '../modals/CreateUserModal';

export const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const handleClose = () => setIsOpen(false); 

  return (
    <Flex justify={"right"} w="100%">
      <Button colorScheme="blue" size="lg" onClick={() => setIsOpen(true)} leftIcon={<Icon as={FaUserPlus} />}>
        Add User
      </Button>
      <CreateUserModal isOpen={isOpen} onClose={handleClose} /> {/* Pass isOpen and onClose props */}
    </Flex>
  );
};
