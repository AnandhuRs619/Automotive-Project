import { Flex } from "@chakra-ui/react"
import { SideMenu } from "../components/common/SideMenu"
import { Navbar } from "../components/common/Navbar"
import { UserTable } from "../components/users/UserTable"


export function UsersListPage() {
  return (
    <Flex direction={{ base: "column", md: "row" }} minHeight="100vh">
    <SideMenu />
    <Flex direction="column" flex="1">
      <Navbar />
      <Flex justify={"center"} align="center">
       <UserTable/>
      </Flex>
    </Flex>
  </Flex>
  )
}

