import {
  Heading,
  VStack,
  Input,
  Button,
  Box,
  Avatar,
  FormLabel,
} from '@chakra-ui/react';
import axios from '../../config/axios';
import { useState, useContext } from 'react';
import PostContext from '../../context/Post-context';
import toast from 'react-hot-toast';

export default function PostForm() {
  const { postDispatch } = useContext(PostContext);
  const [caption, setCaption] = useState('');
  const [pic, setPic] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  
  const handleAddPost = async e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('caption', caption);
    myForm.append('file', pic);
    try {
      const response = await axios.post(
        '/api/user/createpost',
        myForm,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      console.log(response.data);
      postDispatch({ type: 'ADD-POST', payload: response.data });
      toast.success('Post added suceessfully..!');
      setCaption('');
      setImagePrev('');
      setPic('');
    } catch (err) {
      console.log(err);
    }
  };

  const changeImgHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePrev(reader.result);
      setPic(file);
    };
  };

  return (
    <>
      <Heading textAlign={'center'}>Add Post</Heading>
      <div style={{ boxShadow: '-2px 0 10px rgba(107,70,193,0.5)' }}>
        <form onSubmit={handleAddPost}>
          <VStack spacing={'4'}>
            <Box
              my={'4'}
              display={'flex'}
              justifyContent={'center'}
              border={'2px black'}
            >
              <Avatar src={imagePrev} size={'1xl'} h={'150'} w={'150'} />
            </Box>
            <FormLabel htmlFor="postPic">Choose picture</FormLabel>
            <Input
              accept="image/*"
              required
              id="postPic"
              type="file"
              onChange={changeImgHandler}
            ></Input>
            <FormLabel htmlFor="caption">Caption</FormLabel>
            <Input
              type={'text'}
              value={caption}
              id="caption"
              onChange={e => setCaption(e.target.value)}
              placeholder="caption"
            />

            <Button w="full" type="submit" mb={'10px'}>
              Add
            </Button>
          </VStack>
        </form>
      </div>
    </>
  );
}
