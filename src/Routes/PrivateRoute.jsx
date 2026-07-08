import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { router } from './Route';

const PrivateRoute = ({children}) => {
    const {user} = use(AuthContext)
    if(!user){
        return router.navigate('/login')
    }
    return children
};

export default PrivateRoute;