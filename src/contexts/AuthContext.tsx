import {createContext} from 'react'

const initialState={
    user:{
        name: '',
        email: ''
    },
    setUser({name, email})=:{}
}

const AuthContext = createContext()