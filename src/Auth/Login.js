import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/Auth-context';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
// import Loader from '../Loader';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function Login({ isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginClientErrors, setLoginClientError] = useState({});

  const LoginErrors = {};

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile'); // Redirect to profile or any other page
    }
  }, [isLoggedIn, navigate]);

  const runLoginClientValidation = () => {
    if (!validator.isEmail(email)) {
      LoginErrors.email = 'Enter valid email';
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
      LoginErrors.password = 'Password should be strong...!';
    }
  };

  const { handleLogin } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    runLoginClientValidation();
    if (Object.keys(LoginErrors).length == 0) {
      try {
        handleLogin(formData);
        setLoginClientError({});
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoginClientError(LoginErrors);
    }
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-5">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                {loginClientErrors.email && (
                  <span style={{ color: 'red' }}>
                    {loginClientErrors.email}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                {loginClientErrors.password && (
                  <span style={{ color: 'red' }}>
                    {loginClientErrors.password}
                  </span>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                isLoading
                colorScheme="teal"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
