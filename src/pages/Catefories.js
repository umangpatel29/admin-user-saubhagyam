import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((response) => {
        setCategories(response);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center m-2">
              <h3 className="text-center">Product List</h3>
              <Link to="/">
                <Button className="btn btn-warning px-4">Back</Button>
              </Link>
            </div>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Categories</th>
                  <th>Check Detail</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item}</td>
                    <td>
                      <Link to={`/product/${item}`}>
                        <Button>See Product</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination */}
            <ul className="pagination">
              {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
