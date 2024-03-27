import { useState} from "react";
import {
  Table,
  Tbody,
  Td,
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
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
} from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import { AddItems } from "./AddItems";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import { EditItemModal } from "./itemModal/EditItemsModal";
import { CategoryModal } from "./itemModal/CategoryModal";
import { useFetchItems } from "../../hooks/useGetProduct";


export const ItemTable = () => {
  const { isOpen: isDeleteAlertOpen, onOpen: openDeleteAlert, onClose: closeDeleteAlert } = useDisclosure();
 
  const loginUser = useRecoilValue(userAtom);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const showToast = useShowToast();
const {loading,itemData,setItemData}= useFetchItems()

const handleEdit = (item) =>{
    if (loginUser.role !== "admin" && loginUser.role !== "manager") {
        showToast("Error", "Only admin and manager  can perform this action", "error");
        return;
      }
      setSelectedItem(item)
      setEditModalOpen(true)

}
const handleCloseEditModal = () => {
    setEditModalOpen(false)
    setSelectedItem(null)
}

  const handleDelete = (itemId) => {
    if (loginUser.role !== "admin" && loginUser.role !== "manager") {
      showToast("Error", "Only admin and manager can perform this action", "error");
      return;
    }
    setSelectedItem(itemId);
    openDeleteAlert();
  };

  const handleConfirmDelete = async () => {
    try {
      closeDeleteAlert();
      const res = await fetch(`/api/items/deleteItems/${selectedItem}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      showToast("Success", "Item deleted successfully", "success");
      const updatedItems = itemData.filter((item) => item._id !== selectedItem);
      setItemData(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
      showToast("Error", "Failed to delete item", "error");
    }
  };

  return (
    <VStack w="100%" spacing={4} align="stretch">
     <Flex gap={2} justifyContent="flex-end">
     { (loginUser.role === "admin" || loginUser.role === "manager") && <AddItems /> }
{ (loginUser.role === "admin" || loginUser.role === "manager") && <CategoryModal /> }
        
        
      </Flex>
      <Box>
        <Card m={'10'} borderRadius={"5"} bgColor={"whitesmoke"}>
          <CardHeader color="black" fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">Inventory Items</CardHeader>
          <CardBody>
            {loading ? (
              <Spinner size="lg" color="blue.500" />
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Image</Th>
                    <Th>Name</Th>
                    <Th>Category</Th>
                    <Th>Quantity</Th>
                    <Th>Price</Th>
                    <Th>Description</Th>
                    <Th>Entered By</Th>
                    <Th>Date Entered</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {itemData.map((item) => (
                    <Tr color="black" key={item._id}>
                      <Td>
                        {item.imagePath ? (
                          <Image src={`http://localhost:5000/images/${item.imagePath[0]}`} alt={item.name} boxSize="50px" />
                        ) : (
                          <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                            alt="Dummy Image"
                            boxSize="50px"
                          />
                        )}
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>{item.category}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>{item.price}</Td>
                      <Td>{item.description}</Td>
                      <Td>
                        {item.enteredBy.name}
                        <br />
                        {item.enteredBy.role}
                      </Td>
                      <Td>{item.dateEntered}</Td>
                      <Td>
                        <>
                          <Button colorScheme="blue" size="sm" onClick={()=> handleEdit(item)}>
                            Edit
                          </Button>
                          <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(item._id)}>
                            Delete
                          </Button>
                        </>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </CardBody>
          <CardFooter />
        </Card>
      </Box>
        {editModalOpen && selectedItem &&<EditItemModal isOpen={editModalOpen} onClose={handleCloseEditModal} item={selectedItem}/>}
      <AlertDialog isOpen={isDeleteAlertOpen} onClose={closeDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Item</AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to delete this item?</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={handleConfirmDelete}>
                Delete
              </Button>
              <Button onClick={closeDeleteAlert}>Cancel</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};
