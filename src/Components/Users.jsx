import React, { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router';

const Users = () => {
    const [members, setMembers] = useState([])
        useEffect(()=>{
            fetch('/users.json').then(res=>res.json()).then(data=>setMembers(data))
        }, [])        
    return (
        <div className='mt-5'>
            <div className='flex justify-between items-center mx-5'>
                <p className='font-semibold text-xl'>Chats</p>
                <HiDotsHorizontal className='text-2xl'/>
            </div>
            <div className='flex flex-col mt-2'>
            {
                members?.map((member, index)=>
                <Link to={`/inbox/${member.id}`} key={index} className='flex px-5 py-3 gap-5 items-center active:bg-gray-200'>
                    <div className=''>
                        <img className='w-16 aspect-square rounded-full' src={member.avatar} alt="" />
                    </div>
                    <div className='flex justify-between iems-center w-full'>
                        <div>
                            <p className='text-lg font-semibold'>{member.name}</p>
                            <p className='text-gray-700'>{member.lastMessage}</p>
                        </div>
                        <div>
                            <p className='text-gray-700'>{member.time}</p>
                        </div>
                    </div>
                </Link>
                )
            }
            </div>
        </div>
    );
};

export default Users;