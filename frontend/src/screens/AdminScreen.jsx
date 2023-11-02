import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { adminProducts, deleteProduct } from "../actions/productActions";

const AdminScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const {
    products,
    loading: productLoading,
    error: adminError,
  } = useSelector((state) => state.productList);



  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(adminProducts());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };
 const deleteProductHandler=(id)=>{
  dispatch(deleteProduct(id))
 }
  return (
    <>
      {user.role ? (
        <Row>
          <Col md={3}>
            <h1>Update Information</h1>
            {error && <Message varient="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader />}
            {message && <Message variant="danger">{message}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
            <Link className="btn btn-success" to='/newproduct'>Create Product</Link>
          </Col>
          <Col md={9}>
            <h1>All Orders</h1>
            {productLoading ? (
              <Loader />
            ) : adminError ? (
              <Message variant="danger">{adminError}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <td>NAME</td>
                    <td>ID</td>
                    <td>DATE</td>
                    <td>STOCK</td>
                    <td>DETAIL</td>
                    <td>ACTION</td>
                    <td>ACTION</td>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product._id}</td>
                      <td>{product.createdAt.substring(0, 10)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <LinkContainer to={`/product/${product._id}`}>
                          <Button variant="light">Details</Button>
                        </LinkContainer>
                      </td>
                      <td>
                        <Button variant="danger" onClick={(e)=>deleteProductHandler(product._id)}>DELETE</Button>
                      </td>
                      <td>
                        <Button variant="warning">EDIT</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      ) : (
        <Message variant="danger">
          Protected Route Please login as admin!
        </Message>
      )}
    </>
  );
};

export default AdminScreen;
