import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/Auth-context';
import { useNavigate } from 'react-router-dom';

import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import validator from 'validator';

export default function Register({ isLoggedIn }) {
  const { handleRegister } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [imgPrev, setImgPrev] = useState('');

  const [RegisterClientErrors, setRegisterClientError] = useState({});
  const RegisterErrors = {};

  const navigate = useNavigate();

  const changeImgHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPrev(reader.result);
      setImage(file);
    };
  };

  const runRegisterClientValidation = () => {
    if (username.trim().length == 0) {
      RegisterErrors.username = 'username cannot be empty';
    }
    if (bio.trim().length == 0) {
      RegisterErrors.bio = 'bio cannot be empty';
    }
    if (!validator.isEmail(email)) {
      RegisterErrors.email = 'Enter valid email';
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      RegisterErrors.password = 'Password should be strong...!';
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('username', username);
    myForm.append('bio', bio);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    runRegisterClientValidation();
    if (Object.keys(RegisterErrors).length == 0) {
      try {
        await handleRegister(myForm);
        setRegisterClientError({});
      } catch (err) {
        console.log(err);
      }
    } else {
      setRegisterClientError(RegisterErrors);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile'); // Redirect to profile or any other page
    }
  }, [isLoggedIn, navigate]);
  //avatar
  //username
  //bio
  //
  //
  //file

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-4">Register</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  minLength={'4'}
                  maxLength={'20'}
                />
                {RegisterClientErrors.username && (
                  <span style={{ color: 'red' }}>
                    {RegisterClientErrors.username}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicBio">
                <Form.Control
                  type="text"
                  placeholder="Enter Bio"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  minLength={'4'}
                  maxLength={'20'}
                />
                {RegisterClientErrors.bio && (
                  <span style={{ color: 'red' }}>
                    {RegisterClientErrors.bio}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                {RegisterClientErrors.email && (
                  <span style={{ color: 'red' }}>
                    {RegisterClientErrors.email}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {RegisterClientErrors.password && (
                  <span style={{ color: 'red' }}>
                    {RegisterClientErrors.password}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicImage">
                <span>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    required
                    onChange={changeImgHandler}
                  />{' '}
                  <Image
                    src={imgPrev}
                    roundedCircle
                    height={'100px'}
                    width={'100px'}
                  />
                </span>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
