import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Flex, Avatar, Select } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../../../atoms/userAtom';
import useShowToast from '../../../hooks/useShowToast';

export const EditUserModal = ({ isOpen, onClose, user }) => {
  const loggedInUser = useRecoilValue(userAtom);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    email: user.email,
    phone: user.phone,
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
      if (loggedInUser.role !== 'admin') {
        showToast('Error', 'You are not authorized to edit users.', 'error');
        return;
      }

      const dataToSend = new FormData();
      if (profilePic) {
        dataToSend.append('profilePic', profilePic);
      }
      dataToSend.append('name', formData.name);
      dataToSend.append('role', formData.role);
      dataToSend.append('email', formData.email);
      dataToSend.append('phone', formData.phone);

      const res = await fetch(`/api/admin/updateUser/${user._id}`, {
        method: 'PUT',
        body: dataToSend
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      showToast("Success", "Profile updated successfully", "success");
      onClose();
      window.location.reload();
    } catch (error) {
      showToast('Error', error.message, 'error');
      console.error(error.message);
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl mb={4}>
        <FormLabel>Profile Picture</FormLabel>
        {/* Show existing profile picture if available */}
    {(user.profilePic && !profilePic) && (
        <Avatar src={`http://localhost:5000/images/${user.profilePic[0]}`} size="xl" mt={2} />
        )}
    <Input type="file" onChange={handleProfilePicChange} />
        {/* Show new profile picture if uploaded */}
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
              <option value="user">User</option>
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
          <Flex justify="flex-end" mt={4}>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Submit</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// PropTypes validation for user prop
EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    profilePic: PropTypes.string 
  }).isRequired
};
