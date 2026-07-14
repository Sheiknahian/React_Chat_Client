import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { socket } from '../Socket.Io/socket';
import { Link } from 'react-router';

const TopNav = () => {
    const axiosSecure = useAxiosSecure()
    const [activeUsers, setActiveUsers] = useState([]);
    const {data: members = []} = useQuery({
        queryKey: ['members'],
        queryFn: async() => {
            const res = await axiosSecure('/users')
            return res.data
        }
    })
    useEffect(() => {
        socket.on('activeUsers', (data) => {
            setActiveUsers(data)
        })
        socket.emit('getActiveUsers')
        return () => {
            socket.off('activeUsers')
        }
    }, [])
    // console.log(activeUsers);
    
    return (
        <div>
            <div className='mx-5 py-5 flex justify-between items-center'>
                <div>
                    <h3 className='font-bold text-3xl'><span className='text-sky-600'>SN</span>Chat</h3>
                </div>
                <FaSearch className='text-2xl'></FaSearch>
            </div>
            <div className='pl-5 mt-3 flex items-center gap-5 overflow-scroll'>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='flex items-center justify-center text-2xl bg-gray-200 rounded-full w-16 aspect-square border-1 text-sky-500 border-sky-500'>
                        <FaPlus></FaPlus>
                    </div>
                    <p className='w-20 text-center'>Add Story</p>
                </div>
            {
                members?.map((member, index)=>
                <Link to={`/inbox/${member._id}`} key={index} className='flex flex-col gap-2 items-center'>
                    <div className='w-16 relative aspect-square'>
                    {
                        activeUsers.includes(member.email) &&
                        <div className='absolute w-3 right-0 aspect-square rounded-full bg-green-500'></div>
                    }
                        <img className='rounded-full' src={member.photoURL} alt="" />
                    </div>
                    <p>{member.name.split(' ')[0]}</p>
                </Link>
                )
            }
            </div>
        </div>
    );
};

export default TopNav;