import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Input, ModalFooter } from "@chakra-ui/react";
import useShowToast from "../../../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../../../atoms/userAtom";

export const EditCategoryModal = ({ isOpen, onClose, category }) => {
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const loginUser = useRecoilValue(userAtom);
  const showToast = useShowToast();

  useEffect(() => {
    if (category) {
      setEditedCategoryName(category.category || "");
    }
  }, [category]);

  const handleUpdateCategory = async () => {
    try {
      const trimmedCategoryName = editedCategoryName.trim();
      if (trimmedCategoryName === "") {
        showToast("Category name cannot be empty", "error");
        return;
      }

      const response = await fetch(`/api/items/editCategory/${category._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: trimmedCategoryName,
          enteredBy:loginUser._id
        }),
      });

      const data = await response.json();
      if(data.error){
        showToast("Error",data.error,"error")
      }

      showToast("Category updated successfully", "success");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating category:", error.message);
      showToast(error.message, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter edited category name"
            value={editedCategoryName}
            onChange={(e) => setEditedCategoryName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateCategory}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
EditCategoryModal.propTypes = {
    isOpen: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired, 
    onAdd: PropTypes.func.isRequired, 
    category: PropTypes.func.isRequired, 
    
  };