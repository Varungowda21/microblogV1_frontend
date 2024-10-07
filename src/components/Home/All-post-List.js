import HomeContext from '../../context/Home-context';
import { useContext, useState, useEffect } from 'react';
import { VStack, Stack, Heading, Image, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import AuthContext from '../../context/Auth-context';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaCommentAlt } from 'react-icons/fa';
import { format } from 'date-fns';

export default function AllPostList() {
  const { homePosts } = useContext(HomeContext);

  return (
    <Stack
      direction={['column', 'row']}
      flexWrap="wrap"
      justifyContent={['flex-start', 'space-evenly']}
      alignItems={['flex-start', 'center']}
    >
      {homePosts && homePosts.data.length > 0 ? (
        homePosts.data.map(ele => (
          <PostCard
            key={ele._id}
            id={ele._id}
            userId={ele.user}
            pic={ele.pic.url}
            caption={ele.caption}
            likes={ele.likes}
            comments={ele.comments}
          />
        ))
      ) : (
        <Heading>Please follow somebody to see posts</Heading>
      )}
    </Stack>
  );
}

const PostCard = ({ id, userId, pic, caption, likes, comments }) => {
  const [profiles, setProfiles] = useState([]);
  const { user } = useContext(AuthContext);
  const [commentBody, setCommentBody] = useState('');
  const [postId, setPostId] = useState('');
  const { homePostsDispatch } = useContext(HomeContext);
  console.log(profiles);
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
  const handleLike = async postId => {
    console.log(postId);
    const formData = { postId };
    try {
      const res = await axios.put(
        '/api/user/home/like',
        formData,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      homePostsDispatch({ type: 'UPD-LIKE', payload: res.data });
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnlike = async postId => {
    console.log(postId);
    const formData = { postId };
    try {
      const res = await axios.put(
        '/api/user/home/unlike',
        formData,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      homePostsDispatch({ type: 'UPD-LIKE', payload: res.data });
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCommentSubmit = async (commentBody, postId) => {
    const formData = {
      commentBody,
      postId,
    };
    try {
      const res = await axios.put(
        '/api/user/home/comment',
        formData,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      // console.log(res);
      homePostsDispatch({ type: 'ADD-COMMENT', payload: res.data });
      setCommentBody('');
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowComment = postId => {
    setPostId(postId);
  };
  return (
    <VStack
      alignItems={['flex-start', 'center']}
      boxShadow={'-2px 0 10px rgba(135, 206, 235)'}
      p={'20px'}
      width="100%"
      maxW="300px"
      borderRadius={'10px'}
      mt={'20px'}
    >
      <HStack>
        <Link to={`/user/${userId}`}>
          <Text textAlign={'center'}>{getUsername(userId)}</Text>
        </Link>
      </HStack>
      <Image src={pic} height={'150px'} width={'200px'} />
      <Text
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
      >
        {caption}
      </Text>
      <HStack>
        {likes.includes(user._id) ? (
          <button onClick={() => handleUnlike(id)}>
            <AiFillLike />
          </button>
        ) : (
          <button onClick={() => handleLike(id)}>
            <AiOutlineLike />
          </button>
        )}
        <Text>Likes {likes.length}</Text>
      </HStack>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleCommentSubmit(commentBody, id);
        }}
      >
        <input
          type="text"
          placeholder="Add comment"
          value={commentBody}
          onChange={e => setCommentBody(e.target.value)}
          minLength={4}
          required
        />
        <input type="submit" value="Add" />
      </form>{' '}
      <button onClick={() => handleShowComment(id)}>
        <FaCommentAlt />
        {comments.length}
      </button>
      <ul>
        {postId &&
          postId == id &&
          comments.map(item => {
            return (
              <li key={item._id} className="comment-list-style">
                {getUsername(item.postedBy)}-
                {format(new Date(item.createdAt), "dd/MM/yyyy 'at' h:mm a")}-
                {item.commentBody}
                <pre></pre>
                <br></br>
              </li>
            );
          })}
      </ul>
    </VStack>
  );
};
