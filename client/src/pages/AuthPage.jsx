import { Box } from '@chakra-ui/react';
import { LoginCard } from '../components/common/LoginCard';

export const AuthPage = () => {
  return (
    <Box bgColor="white" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <LoginCard />
    </Box>
  );
};
