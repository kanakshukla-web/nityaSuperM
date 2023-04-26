import React from 'react'
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NoAuth = () => {
    return (
        <Card style={{ width: '24rem', margin: '0 auto' }}>
            <Card.Img variant="top" height={'324px'} width={'297px'} src="authentication-icon.jpg" />
            <Card.Body>
                <Card.Title>Authentication Error , Please Login..</Card.Title>
                <Card.Text>
                    It seems either session timeout or you haven't login yet.
                </Card.Text>
                <NavLink to={"../login"}>
                    <button>Login Now</button>
                </NavLink>

            </Card.Body>
        </Card>
    )
}

export default NoAuth