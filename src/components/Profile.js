import { useEffect } from 'react';
import axios from '../config/axios';
import AuthContext from '../context/Auth-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Profile({ user }) {
  const { dispach } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await axios.get('/api/user/profile', {
            headers: { Authorization: localStorage.getItem('token') },
          });
          console.log(response.data);
          dispach({ type: 'LOGIN', payload: response.data });
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [dispach]);

  if (!user) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        {' '}
        <div className="card p-4">
          {' '}
          <div className="d-flex flex-column justify-content-center align-items-center">
            {' '}
            <button className="btn btn-secondary">
              {' '}
              <img
                src={user.profilePic.url}
                height="100"
                width="100"
                alt="profilePic"
              />
            </button>{' '}
            <span className="mt-3">
              <b>User name</b> {user.username}
            </span>{' '}
            <span className="mt-3">
              <b>Bio</b> {user.bio}
            </span>{' '}
            <span className="mt-3">
              <b>role</b> {user.role}
            </span>{' '}
            <span className="mt-3">
              <b>
                <Link to={`/profile/followers/${user._id}`}> Followers</Link>
              </b>{' '}
              {user.followers.length}
            </span>{' '}
            <span className="mt-3">
              <b>
                <Link to={`/profile/following/${user._id}`}>Following</Link>
              </b>{' '}
              {user.following.length}
            </span>{' '}
          </div>
        </div>
      </div>
      {/* <Avatar boxSize={'78'} src={user.profilePic.url} borderRadius={'15px'} />
      <h5>Username: {user.username}</h5>
      <h5>Bio: {user.bio}</h5>
      <h5>Email: {user.email}</h5>
      <span>
        Followers {user.followers.length} Followings {user.following.length}
      </span>
      <Stack
        direction={['column', 'row']}
        alignItems={'center'}
        flexWrap="wrap"
        p="4"
      >
        {mypost.map(ele => (
          <VStack
            w="48"
            m="2"
            key={ele._id}
            boxShadow={'-2px 0 10px rgba(135, 206, 235)'}
            p={'10px'}
          >
            <Image h={'100'} w={'100'} src={ele.pic && ele.pic.url} />
            <HStack>
              <Text>{ele.caption}</Text>
            </HStack>
            
          </VStack>
        ))}
      </Stack> */}
      {/* <Stack
        direction={['column', 'row']}
        alignItems={'center'}
        flexWrap="wrap"
        p="4"
      >
        {mypost.map(ele => (
          <VStack
            w="48"
            m="2"
            key={ele._id}
            boxShadow={'-2px 0 10px rgba(135, 206, 235)'}
            p={'10px'}
          >
            <Image h={'100'} w={'100'} src={ele.pic && ele.pic.url} />
            <HStack>
              <Text>{ele.caption}</Text>
            </HStack>
          </VStack>
        ))}
      </Stack> */}
      {/* <h5>Username: {user.username}</h5> */}
    </>
  );
}
