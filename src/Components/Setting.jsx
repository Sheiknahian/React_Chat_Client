import React, { use } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { AuthContext } from '../Context/AuthContext';

const Setting = () => {
    const {logout} = use(AuthContext)
    return (
        <div className='min-h-screen pt-5 bg-white'>
            <h2 className='text-3xl font-bold mx-5 text-center'>Settings</h2>

            <div onClick={logout} className='flex justify-between items-center mt-5 px-5 py-2 border-t-1 border-b-1 border-gray-500 active:bg-gray-200'>
                <div className='flex items-center gap-1'>
                    <MdLogout className='text-xl'/>
                    <h3 className='text-xl font-semibold'>Log Out</h3>
                </div>
                <IoIosArrowForward className='text-xl' />
            </div>
        </div>
    );
};

export default Setting;