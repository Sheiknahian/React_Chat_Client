import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';

const TopNav = () => {
    const [members, setMembers] = useState([])
    useEffect(()=>{
        fetch('/users.json').then(res=>res.json()).then(data=>setMembers(data))
    }, [])
    console.log(members);
    
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
                    <p className='w-18'>Add Story</p>
                </div>
            {
                members?.map((member, index)=>
                <div key={index} className='flex flex-col gap-2 items-center'>
                    <div className='w-16 aspect-square'>
                        <img className='rounded-full' src={member.avatar} alt="" />
                    </div>
                    <p>{member.name.split(' ')[0]}</p>
                </div>
                )
            }
            </div>
        </div>
    );
};

export default TopNav;