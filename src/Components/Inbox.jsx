import React, { useEffect, useState } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { GoImage } from 'react-icons/go';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdKeyboardVoice } from 'react-icons/md';
import { Link, useParams } from 'react-router';

const Inbox = () => {
    const {id} = useParams()
    // console.log(id);
    const [friend, setFriend] = useState(null)
    useEffect(()=>{
        fetch('/users.json').then(res=>res.json()).then(data=>{
            const foundFriend = data.find(d => d.id === Number(id))
            setFriend(foundFriend)
        })
    }, [id])   
    console.log(friend);
    
    return (
        <div className='min-h-screen bg-white relative'>
            <div className='flex items-center gap-5 border-b-2 border-sky-600 px-5 py-2'>
                <Link to={'/'} className='text-3xl'>
                    <IoArrowBackOutline />
                </Link>
                <div className='flex w-full justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <div>
                            <img className='w-11 aspect-square rounded-full' src={friend?.avatar} alt="" />
                        </div>
                        <div>
                            <p className='text-lg font-semibold'>{friend?.name}</p>
                            <p>Active Now</p>
                        </div>
                    </div>
                    <BiInfoCircle className='text-3xl text-sky-600'/>
                </div>
            </div>
            <div>
                
            </div>
            <div className='flex items-center gap-2 absolute w-full bottom-0 bg-white p-4 border-t-2 border-sky-600'>
                <GoImage className='text-3xl text-sky-600'/>
                <input className='py-2 px-2 bg-gray-300 rounded-full w-full' type="text" placeholder='Message...'/>
                <MdKeyboardVoice className='text-3xl text-sky-600'/>
            </div>
        </div>
    );
};

export default Inbox;