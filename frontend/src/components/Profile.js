import React, {useEffect, useState} from 'react'
import Navbar from "./Navbar";
import {Button, Card, Col, Form, Row, Toast} from "react-bootstrap";
import {request} from "../helpers/request";
import {getUser} from "../helpers/auth";

const Profile = () => {

    const [posted, setPosted] = useState(false)
    const [posts, setPosts] = useState([])
    const [deleted, setDeleted] = useState(false)
    const [message, setMessage] = useState('')

    const newPost = async (e) => {
        e.preventDefault()
        const post = e.target

        await request().post('/post/new', {
            title: post['title'].value, content: post['content'].value, hashtag: post['hashtag'].value, author: getUser()._id
        }).then((res) => {
            post['title'].value = ''
            post['content'].value = ''
            post['hashtag'].value = ''

            setPosted(true)
        }).catch((err) => {
            console.log(err)
        })

    }

    const deletePost = async (id) => {
        await request().delete(`/post/delete/${id}`)
            .then((res) => {
                setDeleted(true)
                setMessage(res.data.errorMessage)
            })
            .catch((err) => {
                setDeleted(false)
            })

    }

    useEffect(() => {
        request().get(`/post/all/${getUser()._id}`)
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [posted, deleted]);

    const allPosts = posts.map((post) => (
        <Col key={post._id} xs={12} md={6} lg={4}>
            <Card>
                <Card.Header><h4>{post.title}</h4></Card.Header>
                <Card.Body>
                    <p className={'fst-italic'}>{post.content}</p>
                    <p className={'font-monospace'}>
                        {post.hashtag.split("#").map((hashtag, i) => (
                            <span key={i}>
                                #{hashtag}
                            </span>
                        ))}
                    </p>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => deletePost(post._id)} className={'btn btn-danger'}>
                        Delete post
                    </Button>
                </Card.Footer>
            </Card>

        </Col>
    ))


    return (<>
        <Navbar/>
        <Row className={'gy-3'}>
            <Col xs={12} md={6} lg={8}>
                <Card>
                    <Card.Body>
                        <Form onSubmit={newPost} className={'b-1'}>
                            <h3 className={'h4 text-center text-primary fw-bold'}>New post</h3>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label className={'label'}>Title</Form.Label>
                                <Form.Control required name={'title'} type="text" placeholder="Title text"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label className={'label'}>Post content</Form.Label>
                                <Form.Control as={'textarea'} style={{height: "120px"}} required name={'content'} type="text"
                                              placeholder="Content text"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="hashtag">
                                <Form.Label className={'label'}>#Hashtag</Form.Label>
                                <Form.Control required name={'hashtag'} type="text" placeholder="hashtag text"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Post
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </Col>
            <Col xs={12} md={12} lg={12}>
                <Toast onClose={() => setDeleted(false)} show={deleted} delay={3000} autohide>
                    <Toast.Header className={'text-success'}>
                        Info
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
                <Row className={'gy-3'}>
                    {allPosts}
                </Row>
            </Col>
        </Row>
    </>)
}

export default Profile