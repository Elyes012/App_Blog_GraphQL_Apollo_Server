import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function PostCards({ post: { body, createdAt, id, userName, likeCount, commentCount, likes } }) {

    function likePost () {
        console.log('Like post !')
    }

    function commentOnPost () {
        console.log('comment post !')
    }
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{userName}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                }).format(createdAt)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick ={likePost}> 
                    <Button color='teal' basic>
                        <Icon name='like' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                       {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick ={commentOnPost}> 
                    <Button color='blue' basic>
                        <Icon name='comment' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                       {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}
