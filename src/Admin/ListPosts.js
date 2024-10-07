import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import axios from '../config/axios';

export default function ListPosts() {
  const [allposts, setAllPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/admin/allpost', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        console.log(response.data);
        setAllPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const deleteButtonHandler = async postId => {
    console.log(postId);
    const confirm = window.confirm('Are u sure');
    // console.log(id);
    if (confirm) {
      try {
        const response = await axios.delete('/api/user/deletepost/' + postId, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        console.log(response.data);
        const newPostlist = allposts.filter(
          ele => ele._id !== response.data._id
        );
        setAllPosts(newPostlist);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <Heading textAlign={'center'}>Posts</Heading>

      {allposts.map(ele => (
        <PostCard
          key={ele._id}
          id={ele._id}
          pic={ele.pic.url}
          caption={ele.caption}
          deleteButtonHandler={deleteButtonHandler}
        />
      ))}
    </>
  );
}

function PostCard({ id, caption, pic, deleteButtonHandler }) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(135, 206, 235)'}
      justifyContent={['flex-start', 'center']}
      padding={['4', '8']}
      alignItems={'center'}
      width={['100%', 'auto']}
    >
      <Box textAlign="center">
        <HStack justifyContent={'center'} mb={4} mt={4}>
          <Image src={pic} h={'150'} w={'150'} />
        </HStack>

        <HStack justifyContent={'center'} mb={4}>
          <Text size={'xsm'}>{caption}</Text>
        </HStack>
        <HStack justifyContent={'center'} mb={4}>
          <Button
            color={'red'}
            onClick={() => deleteButtonHandler(id)}
            variant={'ghost'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Box>
    </Stack>
  );
}
