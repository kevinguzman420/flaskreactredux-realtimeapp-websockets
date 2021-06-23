import React, { useReducer } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { socket } from '../App';

const Form = styled.form`
    border: 1px solid #7c4dff;
    background-color: #e6e6e6;
    width: auto;
    height: 200px;
    padding: 1em .5em;

    div {
        margin: 1em 0;

        input {
            height: 2em;
        }

        button {
            width: 100%;
            padding: .5em 0;
            color: #fff;
            background-color: #7c4dff;
            border: none;
        }
    }
`;

// To handle state with userReducer
const initialFormState = {
    firstName: "",
    lastName: ""
}

const formReducer = (state, action) => {
    switch(action.type) {
        case "HANDLE_INPUT_TEXT":
            return {...state, [action.field]: action.payload};
        default:
            return state;
    }
}

function CreateNewUser() {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const handleTextChange = (e) => {
        dispatch({
            type: "HANDLE_INPUT_TEXT",
            field: e.target.name,
            payload: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await axios.post('/api/users/', formState);
        console.log(resp.data.resp);

        socket.emit('UserAdded', {'data': {'user': formState}})
        // socket.send('UserAdded', {'data': formState})
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="firstName"
                    value={formState.firstName}
                    onChange={(e) => handleTextChange(e)}
                    placeholder="Enter your first name"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="lastName"
                    value={formState.lastName}
                    onChange={(e) => handleTextChange(e)}
                    placeholder="Enter your first name"
                />
            </div>
            <div>
                <button type="submit">Send</button>
            </div>
        </Form>
    );
}

export default CreateNewUser;