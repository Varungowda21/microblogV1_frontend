import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
// import { Image } from '@chakra-ui/react';
import AuthContext from '../../context/Auth-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function SeeProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);

  console.log(id);
  const handleFollow = async profileId => {
    const formData = { profileId };
    try {
      const res = await axios.put(
        '/api/user/profile/follow',
        formData,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      console.log(res.data.updateFollowers);
      // profileDispatch({
      //   type: 'UPD-FOLLOW',
      //   payload: res.data.updateFollowers,
      // });
      setProfile(prevProfile => ({
        ...prevProfile,
        followers: res.data.updateFollowers.followers,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnfollow = async profileId => {
    const formData = { profileId };
    try {
      const res = await axios.put(
        '/api/user/profile/unfollow',
        formData,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      console.log(res.data.updateFollowers);
      setProfile(prevProfile => ({
        ...prevProfile,
        followers: res.data.updateFollowers.followers,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          '/api/user/showprofile/' + id,
          {
            headers: { Authorization: localStorage.getItem('token') },
          }
        );
        console.log(response.data);
        setProfile(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);
  if (!profile) {
    return <h1>Loading...!</h1>;
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
                src={profile.profilePic.url}
                height="100"
                width="100"
                alt="profilePic"
              />
            </button>{' '}
            <span className="mt-3">
              <b>User name</b> {profile.username}
            </span>{' '}
            <span className="mb-3">
              <b>Bio</b> {profile.bio}
            </span>{' '}
            {profile.followers.includes(user._id) ? (
              <button
                onClick={() => handleUnfollow(profile._id)}
                className="btn btn-secondary"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollow(profile._id)}
                className="btn btn-secondary"
              >
                Follow
              </button>
            )}
            <span>
              <Link to={`/profile/followers/${profile._id}`}> Followers</Link>{' '}
              {profile.followers.length}
            </span>
            <span>
              {' '}
              <Link to={`/profile/following/${profile._id}`}>
                Following
              </Link>{' '}
              {profile.following.length}
            </span>
          </div>
        </div>
      </div>
      {/* <h1>Profile</h1>
      
      <Image
        src={profile.profilePic.url}
        width={150}
        height={150}
        alt="person"
      />
      <br></br>
      {profile.followers.includes(user._id) ? (
        <button onClick={() => handleUnfollow(profile._id)}>Unfollow</button>
      ) : (
        <button onClick={() => handleFollow(profile._id)}>Follow</button>
      )}
      <h3>Username {profile.username}</h3>
      <h3>Bio {profile.bio}</h3>
      <h3>Followers {profile.followers.length}</h3>
      <h3>Followings {profile.following.length}</h3> */}
    </>
  );
}
