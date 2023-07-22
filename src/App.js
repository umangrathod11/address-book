import React, { useCallback, useMemo, useRef } from 'react';
import "./styles.css";
import { getInitialAppState, reducerFn } from './context/reducer';
import { CommunityContext } from './context/context';
import { getCommunityActions } from './context/communityActions';

export default function App() {
  const [myState, dispatch] = React.useReducer(reducerFn, getInitialAppState());

  const communityActions = useMemo(() => {
    return getCommunityActions(dispatch);
  }, [dispatch]);

  const idRef = useRef(null);
  const passRef = useRef(null);

  const doLogin = () => {
    var raw = JSON.stringify({
      "phoneNumber": idRef.current.value,
      "password": passRef.current.value
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: raw
    };

    fetch(`http://localhost:3000/login/v1`, requestOptions)
      .then(response => response.json())
      .then(r => console.log('login response ', r))
      .catch(error => console.log('error', error));
  };

  const doFetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(res => {
        console.log('all users are  ', res);
      })
      .catch(e => {
        console.log('Something went wrong', e);
      })
  }
  return (
    <div className="App">
      <CommunityContext.Provider value={{ state: myState, communityActions }}>
        <div>
          <input ref={idRef} type='text' placeholder='enter phone number here' />
          &nbsp;&nbsp;&nbsp;
          <input ref={passRef} type='text' placeholder='enter password here' />
        </div>
        <br />
        <button type='button' onClick={doLogin}>Login</button>
        <br />
        <button type='button' onClick={doFetchUsers}>Fetch Users</button>
      </CommunityContext.Provider>
    </div>
  );
}

