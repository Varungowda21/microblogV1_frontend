import { useState, useEffect } from 'react';
import axios from '../config/axios';

import { Link, useParams } from 'react-router-dom';
import { Flex, Heading } from '@chakra-ui/react';
import { Image } from 'react-bootstrap';
export default function Followers() {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [ProfileFollowings, setProfileFollowings] = useState([]);
  const [allprofiles, setAllProfiles] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/user/showprofile/' + id, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        console.log(response.data);
        setUsername(response.data.username);
        setProfileFollowings(response.data.following);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/user/allprofiles`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log(res.data);
      setAllProfiles(res.data);
    })();
  }, []);
  const getUsername = userId => {
    const userProfile = allprofiles.find(profile => profile._id == userId);
    return userProfile ? userProfile.username : 'UnKnown';
  };
  const getUserProfilePic = userId => {
    const userProfile = allprofiles.find(profile => profile._id == userId);
    return userProfile ? userProfile.profilePic.url : 'Not available';
  };
  console.log(ProfileFollowings);
  return (
    <>
      <div>
        <Flex justify={'center'} m={'20'}>
          <Heading>
            <b>{username}</b> Followings
          </Heading>
        </Flex>
        <Flex justify={'center'}>
          <ul>
            {ProfileFollowings.map((ele, i) => {
              return (
                <li key={i}>
                  <Link to={`/user/${ele}`}>
                    <Image
                      src={getUserProfilePic(ele)}
                      roundedCircle
                      height={'50px'}
                      width={'50px'}
                    />{' '}
                    {getUsername(ele)}
                    <br></br>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Flex>
      </div>
    </>
  );
}

// export default function Followers(){
//   return <h1>Floowers</h1>
// }
