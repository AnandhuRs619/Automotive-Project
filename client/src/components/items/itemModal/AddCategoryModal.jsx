import { useState } from "react";
import PropTypes from 'prop-types';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Input, ModalFooter } from "@chakra-ui/react";
import useShowToast from "../../../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../../../atoms/userAtom";
 
export const AddCategoryModal = ({ isOpen, onClose }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const loginUser = useRecoilValue(userAtom);
  const showToast = useShowToast();


  const handleAddCategory = async () => {
    try {
      const response = await fetch('/api/items/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: newCategoryName,
          enteredBy: loginUser._id, 
        }),
      });

      const data = await response.json();
      if(data.error){
        showToast("Error",data.error,"error")
      }

      
      showToast("Category added successfully", "success");
      setNewCategoryName('');
      onClose(); 
      window.location.reload()
    } catch (error) {
      console.error('Error adding category:', error.message);
      showToast(error.message, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddCategory}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
AddCategoryModal.propTypes = {
    isOpen: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired, 
    onAdd: PropTypes.func.isRequired, 
  };