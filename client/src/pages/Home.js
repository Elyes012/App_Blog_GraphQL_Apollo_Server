import React, {useContext} from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCards';
import {AuthContext} from '../context/Auth';
import PostForm from '../components/PostForm';
import {FETCH_POSTS_QUERY} from '../utils/GraphQL';

export default function Home() {

    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
    const {user} = useContext(AuthContext);

    if(loading) return (<div><h1>loading posts ...</h1></div>)
    if(error) return (<div><h1>{error.message}</h1></div>)
    return (
        <Grid columns={3}>
            <Grid.Row className ="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
        <Grid.Row>
            {user && (
                <Grid.Column>
                    <PostForm/>
                </Grid.Column>
            )}

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


    ;