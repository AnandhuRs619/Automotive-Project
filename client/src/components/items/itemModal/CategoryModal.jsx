import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Table, Tbody, Td, Th, Thead, Spinner, Stack, useDisclosure, Tr } from "@chakra-ui/react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { useFetchCategories } from "../../../hooks/useGetCategory";
import { AddCategoryModal } from "./AddCategoryModal";
import { EditCategoryModal } from "./EditCategoryModal";
import useShowToast from "../../../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../../../atoms/userAtom";


export const CategoryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories, loading } = useFetchCategories();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const loginUser = useRecoilValue(userAtom);
  const showToast = useShowToast()

  const handleEdit = (category) => {
    if (loginUser.role !== "admin" && loginUser.role !== "manager") {
        showToast("Error", "Only admin and manager can perform this action", "error");
        return;
      }
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleAddCategory = () => {
    if (loginUser.role !== "admin" && loginUser.role !== "manager") {
        showToast("Error", "Only admin and manager can perform this action", "error");
        return;
      }
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <Button size="md" colorScheme="blue" onClick={onOpen} minWidth="auto">
        Show Category 
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Category List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={handleAddCategory}>
                Add New Category
              </Button>
              {loading ? (
                <Spinner size="lg" color="blue.500" />
              ) : (
                <Table variant="simple" overflowX="auto">
                  <Thead>
                    <Tr>
                      <Th>Category Name</Th>
                      <Th>Date Entered</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {categories.map((category) => (
                      <Tr color="black" key={category.id}>
                        <Td>{category.category}</Td>
                        <Td>{category.dateEntered}</Td>
                        <Td>
                          <Stack direction="row" spacing={2}>
                            <Button leftIcon={<EditIcon />} colorScheme="blue" variant="outline" size="sm" onClick={() => handleEdit(category)}>
                              Edit
                            </Button>
                          </Stack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AddCategoryModal isOpen={isAddModalOpen} onClose={handleAddModalClose} />
      {selectedCategory && (
        <EditCategoryModal isOpen={isEditModalOpen} onClose={handleEditModalClose} category={selectedCategory} />
      )}
    </>
  );
};

export default CategoryModal;
