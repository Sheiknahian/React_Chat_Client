import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { router } from './Route';

const PublicRoute = ({children}) => {
    const {user, loading} = use(AuthContext)
    if(loading){
        
      return <div className='flex items-start pt-10 justify-center min-h-screen'><p className='loading loading-spinner loading-lg'></p></div>
    }
    if(user){
      return router.navigate('/')  
    }
    return children
};

export default PublicRoute;