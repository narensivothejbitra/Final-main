import React, {useState} from "react";
import {Container, Nav, Navbar} from 'react-bootstrap'
import {deleteUser, getUser} from "../helpers/auth";
import {Navigate} from "react-router-dom";

export default function NavbarCustom() {
    const [logout, setLogout] = useState(false)

    if (logout || !getUser()) {
        return <Navigate to={'/loginAccount'} replace={true}/>
    }

    const logOut = () => {
        deleteUser()
        setLogout(true)
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    {!getUser() ? (<>
                        <Nav.Link href="loginAccount">Login</Nav.Link>
                        <Nav.Link href="newAccount">Sign up</Nav.Link>
                    </>) : (
                        <Nav.Link href={`/profile/${getUser()._id}`}>Profile</Nav.Link>
                    )}

                </Nav>
                <Navbar.Collapse className="justify-content-end text-light">
                    <Navbar.Text>
                        Signed in as: &nbsp;
                        <a className={'text-light'} href={`/profile/${getUser()._id}`}>
                            {`${getUser().name} ${getUser().lastName}`}
                        </a>
                    </Navbar.Text>
                    <Navbar.Text>
                        <Nav.Link onClick={() => logOut()} className={'text-light'}>Log out</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}