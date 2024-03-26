import { Flex, Input, InputGroup, InputLeftElement, IconButton, Avatar, Menu, MenuButton, MenuItem, MenuList, MenuDivider, Text } from "@chakra-ui/react";
import { SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import useLogout from "../../hooks/useLogout"; 

export  function Navbar() {
  const user = useRecoilValue(userAtom)
  const logout = useLogout();
  const handleLogout = async () => {
    logout(); // Call the logout function when the logout button is clicked
  };
  return (
    <Flex
      m={5}
      as="nav"
      align="center"
      justify="space-between"
      padding="2"
      height={"100px"}
      bgColor={"whitesmoke"}
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      {/* Route name on the left */}
      <Text color={"black"} fontSize={"lg"} fontWeight="bold">Dashborad </Text>

      {/* Search bar in the center */}
      <InputGroup maxW="lg">
        <InputLeftElement
          pointerEvents="none"
          
          // eslint-disable-next-line react/no-children-prop
          children={<SearchIcon color="gray.300" />}
        />
        <Input bgColor={"white"} type="text" textColor={"gray"} placeholder="Search" />
      </InputGroup>

      {/* Avatar icon and settings on the right */}
      <Flex gap={3} align="center">
        {/* Avatar */}
        <Avatar size="md" src={`http://localhost:5000/images/${user.profilePic[0]}`} name={user.name} />
        
        {/* Settings */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Settings"
            bgColor={"gray"}
            icon={<SettingsIcon />}
            variant="ghost"
            size="md"
            mr="5"
            
          />
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}


