import React, { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

const Users = () => {
    const [members, setMembers] = useState([])
        useEffect(()=>{
            fetch('/users.json').then(res=>res.json()).then(data=>setMembers(data))
        }, [])        
    return (
        <div className='mt-5 mx-5'>
            <div className='flex justify-between items-center'>
                <p className='font-semibold text-xl'>Chats</p>
                <HiDotsHorizontal className='text-2xl'/>
            </div>
            <div className='flex flex-col gap-5 mt-5'>
            {
                members?.map((member, index)=>
                <div key={index} className='flex gap-5 items-center'>
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
                </div>
                )
            }
            </div>
        </div>
    );
};

export default Users;