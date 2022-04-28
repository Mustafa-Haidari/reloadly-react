import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CredentialsContext from '../store/CredentialsContext';
import Todos from './Todos';

const Welcome = () => {
  const credentialsCtx = useContext(CredentialsContext);

  const logout = () => {
    credentialsCtx.setCredentialsState({username: '', password: ''})
  }
  return (
    <div>
      {credentialsCtx.credentialsState.username && <button onClick={logout}>Logout</button>}
        <h1>Welcome {credentialsCtx.username !== '' && credentialsCtx.credentialsState.username}</h1>
        {credentialsCtx.credentialsState.username === '' && <Link to='/register'>Register</Link>}<br />
        {credentialsCtx.credentialsState.username === '' && <Link to='/login'>Login</Link>}
        {credentialsCtx.credentialsState.username !== '' && <Todos />}
    </div>
  )
}

export default Welcome