import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const Product = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      });
  }, [slug]);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) =>
        item.brand.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center m-2">
              <h3 className="text-center">Product List for {slug}</h3>
              <Link to="/categories">
                <Button className="btn btn-warning px-4">Back</Button>
              </Link>
            </div>

            <div className='text-center my-3'>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className='input-search w-50 my-2'
              />
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Check Detail</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.title}</td>
                    <td>{item.brand}</td>
                    <td>{item.price}</td>
                    <td>{item.rating}</td>
                    <td>
                      <Link to={`/productdetail/${item.id}`}>
                        <Button>See Product</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(filteredProducts.length / itemsPerPage) },
                (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
