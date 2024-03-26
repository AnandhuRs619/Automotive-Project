import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import { AddItems } from "./AddItems";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

export const ItemTable = () => {
  const { isOpen: isDeleteAlertOpen, onOpen: openDeleteAlert, onClose: closeDeleteAlert } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [itemData, setItemData] = useState([]);
  const loginUser = useRecoilValue(userAtom);
  const [selectedItem, setSelectedItem] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/items/getitems");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setItemData(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  const handleDelete = (itemId) => {
    if (loginUser.role !== "admin") {
      showToast("Error", "Only admin users can perform this action", "error");
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
      
      <AddItems />
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
                        {item.imagePaths ? (
                          <Image src={item.imagePath} alt={item.name} boxSize="50px" />
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
                          <Button colorScheme="blue" size="sm">
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
