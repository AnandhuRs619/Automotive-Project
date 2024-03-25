import { useState, useEffect } from "react";
import { Avatar, Table, Tbody, Td, Text, Th, Thead, Tr, Spinner, VStack, Button, Box} from "@chakra-ui/react";
import { AddUser } from "../common/AddUser";
// import { getCustomers } from "your-api-file-path"; 


export const UserTable = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/listUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setDataSource(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, []);

  const handleEdit = (id) => {
    // Handle edit functionality
  };

  const handleDelete = (id) => {
    // Handle delete functionality
  };

  return (
    <VStack w="90%" bgColor="whitesmoke" spacing={4} align="stretch">
      
        <AddUser/>
     
      <Text p={4} color="black" fontSize="xl" fontWeight="bold">
        Customers
      </Text>
      {loading ? (
        <Spinner size="lg" color="blue.500" />
      ) : (
        <Table variant="simple">
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
                  <Avatar src={user.profilePic} name={user.name} />
                </Td>
                <Td>{user.name}</Td>
                <Td>{user.role}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone}</Td>
                <Td>
                  <Box
                    bgColor={user.isBlock ? "red.200" : "green.200"}
                    borderRadius="md"
                    p={1}
                    textAlign="center"
                    fontSize="sm"
                  >
                    <Text>{user.isBlock ? "Not Active" : "Active"}</Text>
                  </Box>
                </Td>
                <Td>
                  <Button colorScheme="blue" size="sm" onClick={() => handleEdit(user.id)}>Edit</Button>
                  <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(user.id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </VStack>
  );
};
