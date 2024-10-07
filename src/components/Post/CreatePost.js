import { Grid, Box } from '@chakra-ui/react';
import PostList from './PostList';
import PostForm from './PostForm';
import { useReducer, useEffect } from 'react';
import axios from '../../config/axios';
import PostContext from '../../context/Post-context';

import postReducer from '../../reducer/Post-Reducer';
const initialValue = {
  data: [],
};

export default function CreatePost() {
  const [posts, postDispatch] = useReducer(postReducer, initialValue);
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/user/posts', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log(res.data);
      postDispatch({ type: 'SET-POST', payload: res.data });
    })();
  }, []);
  if (!posts) {
    return <h1>Loading..!</h1>;
  }
  return (
    <>
      <PostContext.Provider value={{ posts, postDispatch }}>
        <Grid templateColumns={['1fr', '3fr 1fr']} gap={'20px'} mt={'20'}>
          <Box px={['0', '16']}>
            <PostList />
          </Box>
          <Box mr={'10px'}>
            <PostForm />
          </Box>
        </Grid>
      </PostContext.Provider>
    </>
  );
}
