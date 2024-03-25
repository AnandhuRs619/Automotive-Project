import { Box,  } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardPage } from './pages/DashboardPage';
import { AuthPage } from './pages/AuthPage';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
import { UsersListPage } from './pages/UsersListPage';

function App() {
  const user = useRecoilValue(userAtom);

  return (
      
    <Box bgColor={"white"} w="full">
        <Routes>
          <Route path="/" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/" />} />
          <Route path="/users" element= {<UsersListPage/>} />
        </Routes>
    </Box>
     
  );
}

export default App;
