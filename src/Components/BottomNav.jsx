import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { RiContactsLine, RiHome9Line, RiNotification3Line } from 'react-icons/ri';

const BottomNav = () => {
    return (
        <div className='bg-white py-2 flex justify-between items-center mx-5 text-3xl'>
            <div className='bg-sky-600 p-3 rounded-full text-white'>
                <RiHome9Line />
            </div>
            <div>
                <RiContactsLine />
            </div>
            <div>
                <RiNotification3Line />
            </div>
            <div>
                <CgProfile />
            </div>
        </div>
    );
};

export default BottomNav;