import React, { useMemo } from 'react';
import Community from './pages/Community';
import "./styles.css";
import { getInitialAppState, reducerFn } from './context/reducer';
import { CommunityContext } from './context/context';
import { getCommunityActions } from './context/communityActions';

export default function App() {
  const [myState, dispatch] = React.useReducer(reducerFn, getInitialAppState());
  
  const communityActions = useMemo(() => {
    return getCommunityActions(dispatch);
  }, [dispatch]);

  console.log('myState ', myState);
  return (
    <div className="App">
      <CommunityContext.Provider value = {{ state: myState, communityActions }}>
          <Community />
      </CommunityContext.Provider>
    </div>
  );
}

