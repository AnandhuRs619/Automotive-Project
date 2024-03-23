import { Box, Container } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardPage } from './pages/DashboardPage';
import { AuthPage } from './pages/AuthPage';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Box position="relative" w="full">
      <Container>
        <Routes>
          <Route path="/" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/" />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
