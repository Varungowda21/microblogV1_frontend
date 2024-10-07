import { useReducer, useEffect } from 'react';
import axios from '../../config/axios';
import homeReducer from '../../reducer/Home-Reducer';
import HomeContext from '../../context/Home-context';
import AllPostList from './All-post-List';

export default function Home() {
  const [homePosts, homePostsDispatch] = useReducer(homeReducer, {
    data: [],
  });
  console.log(homePosts);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          '/api/user/home',
          {
            headers: { Authorization: localStorage.getItem('token') },
          }
        );
        console.log(response.data);
        homePostsDispatch({ type: 'SET-ALL-POST', payload: response.data });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return  <>
  <HomeContext.Provider value={{homePosts,homePostsDispatch}}>
   <AllPostList/>
  </HomeContext.Provider>
  </>


};
