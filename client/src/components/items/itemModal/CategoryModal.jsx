import { useState } from "react";
import {
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Spinner,
  VStack,
  Button,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"; 
import { useFetchCategories } from "../../../hooks/useGetCategory";



export const CategoryModal = () => {
    const { isOpen: isDeleteAlertOpen, onOpen: openDeleteAlert, onClose: closeDeleteAlert } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { categories, loading } = useFetchCategories();
  
   
  
    // const handleEdit = (category) => {
    //   // Handle edit action
    // };
  
    const handleDelete = (category) => {
      setSelectedCategory(category);
      openDeleteAlert();
    };
  
    const handleCloseDeleteAlert = () => {
      setSelectedCategory(null);
      closeDeleteAlert();
    };
  
    const handleConfirmDelete = async () => {
      try {
        // Perform delete action here using selectedCategory.id
        // Implement delete logic
        closeDeleteAlert();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    };
  
    return (
      <VStack spacing={4} align="stretch">
        <Button colorScheme="blue" onClick={() => console.log("Add new category clicked")}>Add New Category</Button>
        <Box>
          <Text p={4} color="black" fontSize="xl" fontWeight="bold">
            Category List
          </Text>
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
                    <Td>{category.name}</Td>
                    <Td>{category.dateEntered}</Td>
                    <Td>
                      <Button leftIcon={<EditIcon />} colorScheme="blue" variant="outline" size="sm" 
                    //   onClick={() => handleEdit(category)}
                      >
                        Edit
                      </Button>
                      <Button leftIcon={<DeleteIcon />} colorScheme="red" variant="outline" size="sm" ml={2} onClick={() => handleDelete(category)}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
        {/* Delete Category Confirmation Alert */}
        <AlertDialog isOpen={isDeleteAlertOpen} onClose={closeDeleteAlert}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Delete Category</AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete {selectedCategory && selectedCategory.name}?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="red" onClick={handleConfirmDelete}>Delete</Button>
                <Button onClick={handleCloseDeleteAlert}>Cancel</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </VStack>
    );
  };