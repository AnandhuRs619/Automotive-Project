import { Box, Text, Icon } from '@chakra-ui/react';
// import { AiOutlineUser } from 'react-icons/ai'; // Example icon

// eslint-disable-next-line react/prop-types
export const DashbordCard = ({ title, value, color, icon }) => {
  console.log(icon); // Add this line to check if the icon is being passed correctly
  return (
    <Box m={'5'} bgGradient={color} p="10" width="300px" boxShadow="md" borderRadius="lg">
      <Box display="flex" alignItems="center" mb="4">
        <Icon  as={icon} color="black" boxSize={8} mr="2" />
        <Text color="black" fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
      </Box>
      <Text color="black" fontSize="3xl">{value}</Text>
    </Box>
  );
};
