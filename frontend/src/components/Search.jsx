import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form className="d-flex " style={{ width: "60%" }} onSubmit={formHandler}>
      <Form.Control
        type="search"
        placeholder="Search..."
        className="me-2 "
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="btn btn-primary">Search</button>
    </Form>
  );
};

export default Search;
