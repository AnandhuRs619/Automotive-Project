import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Flex, useToast, Image, Stack, ModalFooter, IconButton, Select, Textarea } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';
import userAtom from '../../../atoms/userAtom';
import { useFetchCategories } from '../../../hooks/useGetCategory';

export const EditItemModal = ({ isOpen, onClose, item }) => {
    const loggedInUserId = useRecoilValue(userAtom);
    const [editedItem, setEditedItem] = useState({ ...item });
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const showToast = useToast();

    const { categories } = useFetchCategories();

    useEffect(() => {
        setEditedItem({ ...item });
        setImagePreviews(item?.imagePath.map(image => `http://localhost:5000/images/${image}`));
    }, [item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles([...imageFiles, ...files]);

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...previews]);
    };

    const removeImage = (index) => {
        const updatedFiles = [...imageFiles];
        const updatedPreviews = [...imagePreviews];

        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setImageFiles(updatedFiles);
        setImagePreviews(updatedPreviews);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', editedItem.name);
            formData.append('category', editedItem.category);
            formData.append('quantity', editedItem.quantity);
            formData.append('price', editedItem.price);
            formData.append('description', editedItem.description);
            formData.append('enteredBy', loggedInUserId._id);
            imageFiles.forEach((file) => formData.append('images', file));

            const res = await fetch(`/api/items/updateItems/${editedItem._id}`, {
                method: 'PUT',
                body: formData,
            });
            const data = await res.json();
            if (data.error) {
                showToast('Error', data.error, 'error');
                console.log(data.error)
                return;
            }
            showToast('Success', 'Item updated successfully', 'success');
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error updating item:', error);
            showToast('Error', 'Failed to update item', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Item</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction="row">
                        <FormControl flex="1" mr={4}>
                            <FormLabel>Name</FormLabel>
                            <Input name="name" value={editedItem.name} onChange={handleInputChange} type="text" placeholder="Enter name" />
                        </FormControl>
                        <FormControl flex="1">
                            <FormLabel>Category</FormLabel>
                            <Select name="category" value={editedItem.category} onChange={handleInputChange} placeholder="Select category">
                                {categories.map((category) => (
                                    <option key={category._id} value={category.category}>{category.category}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Flex>
                    <Flex direction="row" mt={4}>
                        <FormControl flex="1" mr={4}>
                            <FormLabel>Quantity</FormLabel>
                            <Input name="quantity" value={editedItem.quantity} onChange={handleInputChange} type="number" placeholder="Enter quantity" />
                        </FormControl>
                        <FormControl flex="1">
                            <FormLabel>Price</FormLabel>
                            <Input name="price" value={editedItem.price} onChange={handleInputChange} type="number" placeholder="Enter price" />
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea name="description" value={editedItem.description} onChange={handleInputChange} placeholder="Enter description" />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Images</FormLabel>
                        <Input name="images" type="file" onChange={handleImageChange} multiple accept="image/*" />
                        <Stack direction={"row"} spacing={4} mt={2}>
                            {imagePreviews.map((preview, index) => (
                                <Flex key={index} align="center" position="relative">
                                    <Image src={preview} alt={`Image ${index + 1}`} maxH="100px" maxW="100px" />
                                    <IconButton
                                        position="absolute"
                                        top={0}
                                        right={0}
                                        aria-label="Remove image"
                                        icon={<CloseIcon />}
                                        onClick={() => removeImage(index)}
                                        variant="ghost"
                                        colorScheme="red"
                                        zIndex="1" 
                                    />
                                </Flex>
                            ))}
                        </Stack>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={isSubmitting} colorScheme="blue" mr={3} onClick={handleSubmit}>Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

// Define propTypes for your component
EditItemModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
}