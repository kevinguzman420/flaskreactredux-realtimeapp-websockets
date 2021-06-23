import React from 'react';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import generateStore from './redux/store';
import { getUsersAction } from './redux/ducks/getUsersDuck';
// components
import CreateNewUser from './components/CreateNewUser';
import UserList from './components/UserList';
// styled
import styled from 'styled-components';

export const socket = io('http://127.0.0.1:5000/');

const WrapApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: auto;
`;

function App() {
  const store = generateStore();
  store.dispatch(getUsersAction());
  return (
    <Provider store={store}>
      <WrapApp>
        <h1>All Users</h1>
        <CreateNewUser />
        <UserList />
      </WrapApp>
    </Provider>
  );
}

export default App;
