import React, { useEffect } from 'react';
import { socket } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAction } from '../redux/ducks/getUsersDuck';
// components
import UserDisplay from './UserDisplay';
// styled
import styled from 'styled-components';

const UserListWrapp = styled.div`
    border: 1px solid blue;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-gap: 1em;
    margin-top: 2em;
    padding: .5em;
    width: auto;
`;

function UserList() {
    const dispatch = useDispatch();
    const users = useSelector(store => store.getUserReducer.users);

    useEffect(() => {
        socket.on('userAddedResponse', (resp) => {
            console.log("resp");
            console.log(resp);
        });

        dispatch(getUsersAction());
    });

    return (
        <UserListWrapp>
            {users.length > 0 && users.map(user => <UserDisplay key={user.id} firstName={user.firstName} lastName={user.lastName} />)}
        </UserListWrapp>
    );
}

export default UserList;