import {Form, Button} from 'react-bootstrap'
import {request} from "../helpers/request";
import {Navigate} from 'react-router-dom'
import {useState} from "react";

export default function SignUp () {

    const [user, setUser] = useState(null)

    const newAccount = (e) => {
        e.preventDefault()
        const user = e.target

        request().post('/user/new', {
            name: user['name'].value,
            lastName: user['lastName'].value,
            userName: user['username'].value,
            email: user['email'].value,
            password: user['password'].value
        }).then((res) => {
            console.log(res)
            setUser(res.data)
        })
            .catch((err) => {
                console.log(err)
            })
    }

    if(user) {
        return <Navigate to={'/loginAccount'} />
    }

    return (
        <div>
            <Form onSubmit={newAccount} className={'b-1 login-form'}>
                <h3 className={'h4 text-center text-primary fw-bold'}>Registration form</h3>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className={'label'}>Your first name</Form.Label>
                    <Form.Control required name={'name'} type="text" placeholder="Enter your first name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label className={'label'}>Your last name</Form.Label>
                    <Form.Control required name={'lastName'} type="text" placeholder="Enter your last name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label className={'label'}>Username</Form.Label>
                    <Form.Control required name={'username'} type="text" placeholder="Enter your username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label className={'label'}>Email address</Form.Label>
                    <Form.Control required name={'email'} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className={'label'}>Password</Form.Label>
                    <Form.Control required name={'password'} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>

    )
}