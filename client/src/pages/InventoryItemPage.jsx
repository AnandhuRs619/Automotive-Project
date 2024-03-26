import { Flex, Box } from "@chakra-ui/react";
import { SideMenu } from "../components/common/SideMenu";
import { Navbar } from "../components/common/Navbar";
import { ItemTable } from "../components/items/ItemTable";

export const InventoryItemPage = () => {
  return (
    <Flex direction={{ base: "column", md: "row" }} minHeight="100vh">
      <SideMenu />
      <Flex direction="column" flex="1">
        <Navbar />
        <Box flex="1" overflow="hidden">
          <ItemTable />
        </Box>
      </Flex>
    </Flex>
  );
};
