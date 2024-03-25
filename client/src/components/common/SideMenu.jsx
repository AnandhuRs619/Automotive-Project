import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Icon, Text, Box, IconButton, Avatar } from "@chakra-ui/react";
import { Menu, MenuItem } from "@chakra-ui/react";
import {
  AiOutlineAppstore,
  AiOutlineShop,
  AiOutlineUser,
  AiOutlineMenu,
} from "react-icons/ai";

export function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Use the navigate function from react-router-dom

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (key) => {
    navigate(key); // Navigate to the specified key
  };

  // Sample admin details (replace with actual data)
  const adminDetails = {
    name: "John Doe",
    role: "Administrator",
    profilePic: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
  };

  return (
    <Flex
      bg="white"
      w={{ base: "100%", md: "250px" }}
      boxShadow="md"
      borderRadius={{ base: "5px", md: "5px 0 0 5px" }}
      borderRight="1px solid"
      borderColor="gray.200"
      className="SideMenu"
      direction="column"
    >
      <Box mb={"2px"} p={4}>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" >Inventory Manangement </Text>
        <Text textAlign={"center"} fontSize="lg" fontWeight="bold" color="gray.700" >System </Text>
      </Box>
      {/* Admin details section */}
      <Box mb={"25px"} p="4" bgColor={"whitesmoke"} alignItems="center" borderRadius={"5px"} display="flex">
        <Avatar name={adminDetails.name} size="md" mr="2" />
        <Flex direction="column">
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            {adminDetails.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {adminDetails.role}
          </Text>
        </Flex>
        <IconButton
          backgroundColor={"black"}
          aria-label="Menu"
          icon={<Icon as={AiOutlineMenu} />}
          onClick={toggleMenu}
          variant="ghost"
          ml="auto"
          display={{ base: "block", md: "none" }}
        />
      </Box >
      <Menu
        className="SideMenuVertical"
        orientation="vertical"
        onClick={(item) => {
          navigate(item.key); // Navigate to the clicked menu item's key
        }}
        selectedKeys={[selectedKeys]}
        display={isMenuOpen ? "block" : "none"}
      >
        <MenuItem
          key="/dashboard"
          icon={<Icon boxSize={8} size="md" color="black" as={AiOutlineAppstore} />}
          fontSize="xl" // Increase the font size
          py="4" // Increase the vertical padding
          _hover={{ bg: "gray.100" }}
          onClick={() => handleMenuItemClick("/dashboard")}
        >
          <Text fontWeight="bold" color="gray.700">
            Dashboard
          </Text>
        </MenuItem>
        <MenuItem
          key="/users"
          icon={<Icon boxSize={8} color="black" as={AiOutlineUser} />}
          fontSize="xl" // Increase the font size
          py="4" // Increase the vertical padding
          _hover={{ bg: "gray.100" }}
          onClick={() => handleMenuItemClick("/users")}
        >
          <Text fontWeight="bold" color="gray.700">
            Users
          </Text>
        </MenuItem>
        <MenuItem
          key="/inventory"
          icon={<Icon boxSize={8} color="black" as={AiOutlineShop} />}
          fontSize="xl" // Increase the font size
          py="4" // Increase the vertical padding
          _hover={{ bg: "gray.100" }}
          onClick={() => handleMenuItemClick("/inventory")}
        >
          <Text fontWeight="bold" color="gray.700">
            Inventory
          </Text>
        </MenuItem>
      </Menu>
    </Flex>
  );
}
