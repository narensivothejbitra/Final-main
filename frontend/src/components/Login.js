import {Button, Form, Toast} from 'react-bootstrap'
import {request} from "../helpers/request";
import {useState} from "react";
import {getUser, saveUser} from "../helpers/auth";
import {Link, Navigate} from 'react-router-dom'

export default function Login() {

    const [error, setError] = useState({
        msg: '',
        type: 'Error'
    })

    const [user, setUser] = useState(null)

    const loginAccount = async (e) => {
        e.preventDefault()
        const user = e.target

        await request().post("/user/login", {
            email: user['email'].value,
            password: user['password'].value
        })
            .then((res) => {
                saveUser(res.data)
                setUser(res.data)
            })
            .catch((err) => {
                if(err.response.data){
                    setError((error) => ({
                        ...error,
                        msg: err.response.data.errorMessage
                    }))
                }
            })
    }

    if(getUser() && user) {
        return <Navigate to={'/'} replace={true} />
    }

    return (
        <div>
            <Toast onClick={() => setError({...error, msg: ''})} show={error.msg.length > 0} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{error.msg}</Toast.Body>
            </Toast>
            <Form onSubmit={loginAccount} className={'b-1 login-form'}>
                <h3 className={'h4 text-center text-primary fw-bold'}>Registration form</h3>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label className={'label'}>Email address</Form.Label>
                    <Form.Control required name={'email'} type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className={'label'}>Password</Form.Label>
                    <Form.Control required name={'password'} type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="primary" type="submit" className={'mb-4'}>
                    Log in
                </Button>
                <Link to={'/newAccount'}>
                    <span className="fs-5 pt-5 text-decoration-none">Need an account? Create One!</span>
                </Link>
            </Form>
        </div>

    )
}