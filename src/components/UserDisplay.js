import React from 'react';
import styled from 'styled-components';

const UserWrapp = styled.div`
    padding: .5em;
    width: auto;
    height: auto;
    background-color: #171717;

    p {
        color: #fff;
        margin: 0;
    }
`;

function UserDisplay({firstName, lastName}) {
    return (
        <UserWrapp>
            <p>{firstName}</p>
            <p>{lastName}</p>
        </UserWrapp>
    )
}

export default UserDisplay;