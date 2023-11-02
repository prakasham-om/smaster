import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const HomeScreen = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { products, loading, error, resPerPage, productCount } = useSelector(
    (state) => state.productList
  );

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(listProducts(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
    
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={3}>
              <ProductScreen product={product} />
            </Col>
          ))}
        </Row>
      )}
      <div className="d-flex justify-content-center mt-5">
        {productCount ? (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            nextPageText="Next"
            prevPageText="Prev"
            lastPageText="Last"
            firstPageText="First"
            itemClass="page-item"
            linkClass="page-link"
          />
        ) : (
          'Loading..'
        )}
      </div>
    </>
  );
};

export default HomeScreen;
