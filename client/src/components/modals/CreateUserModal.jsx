import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Flex, Avatar, Select } from '@chakra-ui/react';
import useShowToast from '../../hooks/useShowToast';

// eslint-disable-next-line react/prop-types
export const CreateUserModal = ({ isOpen, onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    password: ''
  });
  const showToast = useShowToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleSubmit = async () => {
    try {
        console.log(formData);
        const dataToSend = new FormData();
        dataToSend.append('profilePic', profilePic);
        for (const [key, value] of formData.entries()) {
            dataToSend.append(key, value);
        }
        console.log(dataToSend);
      const res = await fetch('/api/admin/createUser', {
        method: 'POST',
        body: dataToSend
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      showToast("Success", "Profile updated successfully", "success");
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" onChange={handleProfilePicChange} />
            {profilePic && (
              <Avatar src={URL.createObjectURL(profilePic)} size="xl" mt={2} />
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Enter name" />
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select name="role" value={formData.role} onChange={handleInputChange} placeholder="Select role">
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">Employee</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Enter email" />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Enter phone number" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Enter password" />
          </FormControl>
          <Flex justify="flex-end" mt={4}>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Submit</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
