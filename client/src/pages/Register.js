import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../utils/hooks';
import {AuthContext} from '../context/Auth';

export default function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({})
    const { onChange, onSubmit, values } = useForm(registerUser, {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, {data : {register : userData}}) {
            context.login(userData)
            props.history.push('/')
        },
        // Handel errors
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },

        variables: values
    });

    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <h1>Register</h1>
                <Form.Input

                
                    label="Username"
                    placeholder="Username.."
                    name="userName"
                    type="text"
                    value={values.userName}
                    error={errors.userName ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map((value) => (
                            <li key={value} > {value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      signup: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
       
      }
    ) {
      id
      email
      userName
      createAt
      token
    }
  }
`;