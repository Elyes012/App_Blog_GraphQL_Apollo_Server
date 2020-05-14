import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCards';

export default function Home() {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  
    if(loading) return (<div><h1>loading posts ...</h1></div>)
    if(error) return (<div><h1>{error.message}</h1></div>)
    return (
        <Grid columns={3}>
            <Grid.Row className ="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
        <Grid.Row>
          {
                   data && data.getPosts.map(post => (
                    <Grid.Column key={post.id} style={{marginBottom : 30}}>
                    <PostCard post={post}/>
                  </Grid.Column>
                 ))
          }
        </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
{
    getPosts {
        id 
        body
        likeCount
        createdAt
        userName
        likes {
            username
        }
        commentCount
        comments {
            id
            username
            createdAt
            body
        }
    }
}
`
    ;