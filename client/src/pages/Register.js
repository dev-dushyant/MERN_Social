import React, {useState} from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const Register = () => {
    const [values, setValues] = useState({
        user_name: '',
        email:'',
        password: '',
        confirmPassword:''
    })

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        variables:values
    })

    const onSubmit = (event) => {
        event.preventDefault();
        addUser()
    }
   
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
                <h1> Register </h1>
                <Form.Input 
                    label="Username"
                    placeholder="Username.."
                    name="user_name"
                    value={values.user_name}
                    onChange={onChange}
                />
                <Form.Input 
                    label="email"
                    placeholder="email.."
                    name="email"
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input 
                    label="password"
                    type="password"
                    placeholder="password.."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input 
                    label="confirmPassword"
                    type="password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $user_name: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                user_name: $user_name
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email user_name createdAt token
        }
    }
`

export default Register;
