import { useState, useEffect } from "react";
import {
  Avatar,
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
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { AddUser } from "../common/AddUser";
import { EditUserModal } from "../users/modals/EditUserModal";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import useShowToast from "../../hooks/useShowToast";

export const UserTable = () => {
  const loggedInUser = useRecoilValue(userAtom);
  const { isOpen: isDeleteAlertOpen, onOpen: openDeleteAlert, onClose: closeDeleteAlert } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/listUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDataSource(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleEdit = (user) => {
    if (loggedInUser.role !== "admin") {
      showToast("Error", "Only admin users can perform this action", "error");
      return;
    }
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user) => {
    if (loggedInUser.role !== "admin") {
      showToast("Error", "Only admin users can perform this action", "error");
      return;
    }
    setSelectedUser(user);
    openDeleteAlert();
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    try {
      closeDeleteAlert();
      const response = await fetch(`/api/admin/deleteUser/${selectedUser._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      showToast("Success", "User deleted successfully", "success");
      const updatedUsers = dataSource.filter((user) => user._id !== selectedUser._id);
      setDataSource(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast("Error", "Failed to delete user", "error");
    }
  };

  return (
    <VStack w="100%" spacing={4} align="stretch">
      {loggedInUser.role === "admin" && <AddUser />}
      {loading ? (
        <Spinner size="lg" color="blue.500" />
      ) : (
        <Box>
          <Card m={'10'} borderRadius={"5"} bgColor={"whitesmoke"}>
            <CardHeader p={4} color="black" fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">User List</CardHeader>
            <CardBody>
              <Table variant="simple" >
                <Thead>
                  <Tr>
                    <Th>Photo</Th>
                    <Th>First Name</Th>
                    <Th>Roles</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Active Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataSource.map((user) => (
                    <Tr color="black" key={user.id}>
                      <Td>
                        <Avatar src={`http://localhost:5000/images/${user.profilePic[0]}`} name={user.name} size={{ base: "sm", md: "md" }} />
                      </Td>
                      <Td>{user.name}</Td>
                      <Td>{user.role}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.phone}</Td>
                      <Td>
                        <Box bgColor={user.isBlock ? "red.200" : "green.200"} borderRadius="md" p={1} textAlign="center" fontSize="sm">
                          <Text>{user.isBlock ? "Not Active" : "Active"}</Text>
                        </Box>
                      </Td>
                      <Td>
                        <>
                          <Button colorScheme="blue" size={{ base: "xs", md: "sm" }} onClick={() => handleEdit(user)}>
                            Edit
                          </Button>
                          <Button colorScheme="red" size={{ base: "xs", md: "sm" }} ml={2} onClick={() => handleDelete(user)}>
                            Delete
                          </Button>
                        </>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </Box>
      )}
      {/* Edit User Modal */}
      {editModalOpen && selectedUser && <EditUserModal isOpen={editModalOpen} onClose={handleCloseEditModal} user={selectedUser} />}
      {/* Delete User Confirmation Alert */}
      <AlertDialog isOpen={isDeleteAlertOpen} onClose={closeDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete User</AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to delete {selectedUser && selectedUser.name}?</AlertDialogBody>
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
