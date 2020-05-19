import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import {setContext} from 'apollo-link-context';

// Authorization header
const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    console.log('>TOKEN ==>', token)
    return {
        headers : {
            Authorization : token ? `Bearer ${token}` : '' 
        }
    }
});

const httpLink = createHttpLink({
    uri : 'http://localhost:8700'
});

const client= new ApolloClient({
    link : authLink.concat(httpLink),
    cache: new InMemoryCache()
});


export default(
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>
)