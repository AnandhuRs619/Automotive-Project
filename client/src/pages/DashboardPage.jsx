import { Flex } from "@chakra-ui/react";
import { Navbar } from "../components/common/Navbar";
import { SideMenu } from "../components/common/SideMenu";
import { DashbordCard } from "../components/dashbord/DashbordCard";
import { GraphComponent } from "../components/dashbord/GraphComponent";
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineInventory2 } from "react-icons/md";
import { useFetchItems } from "../hooks/useGetProduct";

export const DashboardPage = () => {
  const userGradient = "linear(to-r, red.400, pink.400)";
  const itemsGradient = "linear(to-r, yellow.400, orange.400)";
  const {itemData} = useFetchItems()

  return (
    <Flex direction={{ base: "column", md: "row" }} minHeight="100vh">
      <SideMenu />
      <Flex direction="column" flex="1">
        <Navbar />
        <Flex  gap={10}  align="flex-start">
          <DashbordCard title="Total users" value={10} color={userGradient} icon={AiOutlineUser}  />
          <DashbordCard title="Total Items" value={500} color={itemsGradient} icon={MdOutlineInventory2}  />
          <GraphComponent productData={itemData} />
        </Flex>
      </Flex>
    </Flex>
  );
};
