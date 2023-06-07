import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../store/userSlice';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [key, setKey] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rusername, setRusername] = useState('');
  const [rpassword, setRpassword] = useState('');
  const dispatch = useDispatch();


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    axios.post(`/api/loginuser`, {username, password})
      .then(function (res) {
        dispatch(loginSuccess(res.data));
      })
      .catch(function (error) {
        dispatch(loginFailure());
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    axios.post(`/api/createuser`, {rusername, rpassword})
      .then(function (res) {
        dispatch(loginSuccess(res.data));
      })
      .catch(function (error) {
        dispatch(loginFailure());
      });
  };

  return (
    <div className="container">
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
      <Col xs={8} md={6}>
      <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
        <Tab.Pane eventKey="login" title='Login'>
            <h3>Login</h3>
            <Form onSubmit={handleLogin}>
              {/* Login form fields */}
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </Form.Group>

              <Button variant="primary mt-4" type="submit">
                Login
              </Button>
            </Form>
          </Tab.Pane>
          <Tab.Pane eventKey="register" title='Register'>
            <h3>Register</h3>
            <Form onSubmit={handleRegister}>
              {/* Registration form fields */}
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={rusername} onChange={(e) => setRusername(e.target.value)} placeholder="Enter Username" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={rpassword} onChange={(e) => setRpassword(e.target.value)} placeholder="Password" />
              </Form.Group>

              <Button variant="primary mt-4" type="submit">
                Register
              </Button>
            </Form>
          </Tab.Pane>
    </Tabs>
        <Tab.Content>
          
        </Tab.Content>
      </Tab.Container>
      </Col>
      </Row>
    </div>
  );
};

export default Auth;
