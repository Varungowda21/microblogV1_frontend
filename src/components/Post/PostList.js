import {
  Heading,
  Stack,
  Image,
  Button,
  Box,
  HStack,
  Text,
} from '@chakra-ui/react';
import PostContext from '../../context/Post-context';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import axios from '../../config/axios';
import { AiFillLike } from 'react-icons/ai';
import { FaCommentAlt } from 'react-icons/fa';
import { format } from 'date-fns';

export default function PostList() {
  const { posts, postDispatch } = useContext(PostContext);
  console.log(posts);
  const deleteButtonHandler = async id => {
    console.log(id);
    const confirm = window.confirm('Are u sure');
    // console.log(id);
    if (confirm) {
      try {
        const response = await axios.delete('/api/user/deletepost/' + id, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        // console.log(response.data);
        postDispatch({ type: 'DEL-POST', payload: response.data });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <Heading textAlign={'center'}>Posts</Heading>

      {posts.data.length > 0 ? (
        posts.data.map(ele => (
          <PostCard
            key={ele._id}
            id={ele._id}
            pic={ele.pic.url}
            caption={ele.caption}
            likes={ele.likes}
            comments={ele.comments}
            deleteButtonHandler={deleteButtonHandler}
          />
        ))
      ) : (
        <Text textAlign={'center'}>No Posts Found please add</Text>
      )}
    </>
  );
}

function PostCard({ id, caption, pic, likes, comments, deleteButtonHandler }) {
  const [profiles, setProfiles] = useState([]);
  const [postId, setPostId] = useState('');
  const handleShowComment = postId => {
    setPostId(postId);
  };
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        '/api/user/allprofiles',
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      // console.log(res.data);
      setProfiles(res.data);
    })();
  }, []);

  const getUsername = userId => {
    const userProfile = profiles.find(ele => ele._id == userId);
    console.log(userProfile);
    if (userProfile) {
      return userProfile.username; // Return the username if userProfile exists
    }
    return 'Unknown User';
  };

  return (
    <Stack
      direction={['column', 'row']}
      m="8"
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
        <HStack justifyContent={'center'}>
          <Text>
            <AiFillLike />
            {likes.length}
          </Text>
          <Text>
            <button onClick={() => handleShowComment(id)}>
              <FaCommentAlt />
              {comments.length}
            </button>
          </Text>
        </HStack>
        <HStack>
          <ul>
            {postId &&
              postId == id &&
              comments.map(item => {
                return (
                  <li key={item._id} className="comment-list-style">
                    {getUsername(item.postedBy)}-
                    {format(new Date(item.createdAt), "dd/MM/yyyy 'at' h:mm a")}
                    -{item.commentBody}
                    <pre></pre>
                    <br></br>
                  </li>
                );
              })}
          </ul>
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
