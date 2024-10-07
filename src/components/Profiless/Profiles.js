import { useContext, useEffect, useReducer, useState } from 'react';
import profileReducer from '../../reducer/Profile-Reducer';
import axios from '../../config/axios';
import {
  VStack,
  Image,
  HStack,
  Text,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth-context';
import { RiDeleteBin7Fill } from 'react-icons/ri';

export default function Profiles() {
  const [profiles, profilesDispatch] = useReducer(profileReducer, []);
  console.log(profiles);
  const { user } = useContext(AuthContext);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    (async () => {
      const formData = {
        keyword,
      };
      const res = await axios.get(
        `/api/user/allprofiles?keyword=${formData.keyword}`,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      console.log(res.data);
      profilesDispatch({ type: 'SET-ALL-PROFILES', payload: res.data });
    })();
  }, [keyword]);



  const handleDeleteProfile = async userId => {
    console.log(userId);
    //user and profilepic delete
    //omkar followers one ,charan foll 2
    //allpost delete of the user with image
    //remove like  //remove comment char avatar like 1,c 0 onepiece l 2, c2
    const confirm = window.confirm('Are u sure');
    // console.log(id);
    if (confirm) {
      try {
        const response = await axios.delete('/api/admin/deleteUser/' + userId, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        console.log(response.data);
        profilesDispatch({ type: 'REM-PROFILE', payload: response.data });
      } catch (err) {
        console.log(err);
      }
    }
  };

  if(!profiles){
    return <h1>Loading...!</h1>
  }

  return (
    <>
      <Flex justify="center" m="15px">
        <Input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search a Profile..."
        />
      </Flex>
      <ul>
        {profiles.map(ele => {
          return (
            ele.role !== 'admin' &&
            user._id !== ele._id && (
              <VStack
                w="48"
                m="2"
                key={ele._id}
                boxShadow={'-2px 0 10px rgba(135, 206, 235)'}
                p={'10px'}
                mb={'15'}
              >
                <Image
                  h={'100'}
                  w={'100'}
                  src={ele.profilePic && ele.profilePic.url}
                />
                <HStack>
                  <Link to={`/user/${ele._id}`}>
                    <Text>{ele.username}</Text>
                  </Link>
                </HStack>
                <HStack>
                  {' '}
                  {user.role == 'admin' && (
                    <Button
                      color={'red'}
                      onClick={() => handleDeleteProfile(ele._id)}
                    >
                      <RiDeleteBin7Fill />
                    </Button>
                  )}
                </HStack>
              </VStack>
            )
          );
        })}
      </ul>
    </>
  );
}
