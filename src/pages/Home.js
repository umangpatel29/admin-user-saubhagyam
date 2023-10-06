import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserDetail = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:3001/data`)
            .then((response) => {
                if (response.data.length === 0) {
                    alert("Invalid username or password.");
                } else {
                    const user = response.data[0];
                    if (user.role === "admin") {
                        const usersWithRoleUser = response.data.filter((item) => item.role === "user");
                        setUsers(usersWithRoleUser)
                    } else {
                        alert('not found')
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-between align-items-center m-2">
                        <h3 className="text-center">Users List</h3>
                        <Link to="/">
                            <Button className="btn btn-warning px-3">Back</Button>
                        </Link>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>number</th>
                                <th>city</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.number}</td>
                                    <td>{item.city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default UserDetail