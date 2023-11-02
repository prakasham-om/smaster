import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { newProduct } from "../actions/productActions";
import FormContainer from "../components/shared/FromContainer";

const NewProductScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessiores",
    "Headphones",
    "Books",
    "Cloth/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  useEffect(() => {
    if (success) {
      history.push("/admin");
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(newProduct(formData));
  };

  const changeHandler = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
    <FormContainer>
      <h1>CREATE PRODUCT</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler} encType="multipart/form-data">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as={"textarea"}
            rows={`8`}
            name="text"
            placeholder="enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </Form.Group>
        <Form.Group controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            placeholder="add stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="seller_name">
          <Form.Label>Seller Name</Form.Label>
          <Form.Control
            type="text"
            name="seller_name"
            placeholder="type seller name"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="images">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            type="file"
            placeholder="select images.."
            onChange={(e) => changeHandler(e)}
            accept="images/*"
            multiple
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          varient="primary"
          disabled={loading ? true : false}
        >
          CREATE PRODUCT
        </Button>
      </Form>
    </FormContainer>
    {imagesPreview.map((item, index)=>{
      return <Card.Img key={index} src={item.url} variant="top" />
    })}
    </>
  );
};

export default NewProductScreen;
