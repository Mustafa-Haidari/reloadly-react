import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CredentialsContext from '../store/CredentialsContext';
import Todos from './Todos';

const Welcome = () => {
  const credentialsCtx = useContext(CredentialsContext);
  console.log(credentialsCtx.credentialsState)
  return (
    <div>
        <h1>Welcome {credentialsCtx.username !== '' && credentialsCtx.credentialsState.username}</h1>
        {credentialsCtx.credentialsState.username === '' && <Link to='/register'>Register</Link>}<br />
        {credentialsCtx.credentialsState.username === '' && <Link to='/login'>Login</Link>}
        {credentialsCtx.credentialsState.username !== '' && <Todos />}
    </div>
  )
}

export default Welcome