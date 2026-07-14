import React from 'react';
import { Outlet } from 'react-router';
import BottomNav from '../Components/BottomNav';

const PublicLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
            <div className='fixed z-10 bottom-0 w-full border-t border-gray-700'>
                <BottomNav></BottomNav>
            </div>
        </div>
    );
};

export default PublicLayout;