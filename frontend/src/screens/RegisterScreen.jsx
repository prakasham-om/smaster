import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { register } from "../actions/userAction";
import FormContainer from "../components/shared/FromContainer";

const RegisterScreen = ({ location, history }) => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    if (password !== confirmPassword) {
      setMessage("Password do not macth");
    } else {
      const formData = new FormData();

      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("avatar", avatar);
      dispatch(register(formData));
    }
  };

  const onChangeHandler = (event) => {
    if (event.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };
  return (
    <>
      <FormContainer>
        <h1>Register</h1>
        {error && <Message varient="danger">{error}</Message>}
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler} encType="multipart/form-data">
          <Form.Group controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="enter Name"
              value={name}
              onChange={(e) => onChangeHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => onChangeHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autoComplete="true"
              placeholder="enter password"
              value={password}
              onChange={(e) => onChangeHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              autoComplete="true"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="avatar">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control
              type="file"
              name="avatar"
              placeholder="choose an image.."
              onChange={(e) => onChangeHandler(e)}
              accept="images/*"
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            varient="primary"
            disabled={loading ? true : false}
          >
            REGISTER
          </Button>
        </Form>
        <Row>
          <Col>
            Have an account !
            <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
      <img src={avatarPreview} width="100" height="150" alt={name} />
    </>
  );
};

export default RegisterScreen;
