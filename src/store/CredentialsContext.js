import React from 'react'

const CredentialsContext = React.createContext({
    credentialsState: [],
    setCredentialsState: () => {}
})

export default CredentialsContext