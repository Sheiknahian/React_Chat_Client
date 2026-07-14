import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { RiContactsLine, RiHome9Line, RiNotification3Line } from 'react-icons/ri';
import { NavLink } from 'react-router';

const BottomNav = () => {
    return (
        <div className='bg-white py-3 flex justify-between items-center px-5 text-2xl'>
            <NavLink to={'/'} className={({isActive}) => isActive ? 'bg-sky-600 p-3 rounded-full' : 'p-3 rounded-full'}>
                <RiHome9Line />
            </NavLink>
            <NavLink to={'/contacts'} className={({isActive}) => isActive ? 'bg-sky-600 p-3 rounded-full' : 'p-3 rounded-full'} >
                <RiContactsLine />
            </NavLink>
            <NavLink to={'/notification'} className={({isActive}) => isActive ? 'bg-sky-600 p-3 rounded-full' : 'p-3 rounded-full'} >
                <RiNotification3Line />
            </NavLink>
            <NavLink to={'/profile'} className={({isActive}) => isActive ? 'bg-sky-600 p-3 rounded-full' : 'p-3 rounded-full'} >
                <CgProfile />
            </NavLink>
            <NavLink to={'/setting'} className={({isActive}) => isActive ? 'bg-sky-600 p-3 rounded-full' : 'p-3 rounded-full'} >
                <FiSettings />
            </NavLink>
        </div>
    );
};

export default BottomNav;