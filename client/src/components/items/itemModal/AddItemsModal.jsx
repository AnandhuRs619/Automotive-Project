import { useState} from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Flex,  useToast, Image, Stack, ModalFooter, IconButton, Select, Textarea } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';
import userAtom from '../../../atoms/userAtom';
import { useFetchCategories } from '../../../hooks/useGetCategory';

// eslint-disable-next-line react/prop-types
export const AddItemModal = ({ isOpen, onClose }) => {
    const loggedInUserId =useRecoilValue(userAtom)
    console.log(loggedInUserId._id)
  const [itemData, setItemData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    description: '',
    enteredBy: ''
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showToast = useToast();
  const { categories } = useFetchCategories();
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
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
      formData.append('name', itemData.name);
      formData.append('category', itemData.category);
      formData.append('quantity', itemData.quantity);
      formData.append('price', itemData.price);
      formData.append('description', itemData.description);
      formData.append('enteredBy',loggedInUserId._id)
      imageFiles.forEach((file) => formData.append('images', file));

      const res = await fetch('/api/items/additems', {
        method: 'POST',
        body: formData
      });
      console.log(formData,"hai formdata ")
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      showToast('Success', 'Item added successfully', 'success');
      onClose();
      window.location.reload()
    } catch (error) {
      console.error('Error adding item:', error);
      showToast('Error', 'Failed to add item', 'error');
    }finally{
        setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="row">
            <FormControl flex="1" mr={4}>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={itemData.name} onChange={handleInputChange} type="text" placeholder="Enter name" />
            </FormControl>
            <FormControl flex="1">
              <FormLabel>Category</FormLabel>
              <Select name="category" value={itemData.category} onChange={handleInputChange} placeholder="Select category">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.category}</option>
                ))}
              </Select>
            </FormControl>
          </Flex>
          <Flex direction="row" mt={4}>
            <FormControl flex="1" mr={4}>
              <FormLabel>Quantity</FormLabel>
              <Input name="quantity" value={itemData.quantity} onChange={handleInputChange} type="number" placeholder="Enter quantity" />
            </FormControl>
            <FormControl flex="1">
              <FormLabel>Price</FormLabel>
              <Input name="price" value={itemData.price} onChange={handleInputChange} type="number" placeholder="Enter price" />
            </FormControl>
          </Flex>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={itemData.description} onChange={handleInputChange} placeholder="Enter description" />
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
