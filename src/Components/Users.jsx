import { useQuery } from '@tanstack/react-query';
import React, { use, useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';
import { socket } from '../Socket.Io/socket';

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
const Users = () => {
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [activeUsers, setActiveUsers] = useState([])

    const {data: members = [], isLoading} = useQuery({
        queryKey: ['members'],
        queryFn: async() => {
            const res = await axiosSecure('/users')
            return res.data
        }
    })
    const {data: conversations = [], refetch} = useQuery({
        queryKey: ['conversations'],
        queryFn: async() => {
            const res = await axiosSecure(`/conversations/${user.email}`);
            return res.data
        }
    })      
    // console.log(conversations);

    useEffect(() => {
        socket.on('activeUsers', (data) => {
            setActiveUsers(data)
        })
        socket.on('receiveMessage', () => {
            refetch()
        })
        return () => {
            socket.off('activeUsers')
        }
    }, [refetch])
    // console.log(import.meta.env.VITE_apiKey);

    
    if(isLoading){
        return <div className='flex items-start pt-10 justify-center min-h-screen'><p className='loading loading-spinner loading-lg'></p></div>
    }
    return (
        <div className='mt-5 pb-20'>
            <div className='flex justify-between items-center mx-5'>
                <p className='font-semibold text-xl'>Chats</p>
                <HiDotsHorizontal className='text-2xl'/>
            </div>
            <div className='flex flex-col mt-2'>
            {
                members?.map((member, index)=>{
                    const conversation = conversations.find(conv=>
                        conv.participants.includes(member.email)
                    )
                    // console.log(conversation);
                    // console.log(member.email);
                    
                    if (!conversation) {
                        return null
                    }
                    // console.log(
                    // member.email,
                    // conversation?.lastMessageSeen,
                    // typeof conversation?.lastMessageSeen
                    // );
                    return(
                        <Link to={`/inbox/${member._id}`} key={index} className={`flex px-5 py-3 gap-5 items-center active:bg-gray-200 ${member.email === user?.email && 'hidden'}`}>
                            <div className='relative'>
                            {
                                activeUsers.includes(member.email) &&
                                <div className='absolute w-3 right-0 aspect-square rounded-full bg-green-500'></div>
                            }
                                <img className='w-16 aspect-square rounded-full' src={member.photoURL} alt="" />
                            </div>
                            <div className='flex justify-between iems-center w-full'>
                                <div>
                                    <p className='text-lg font-semibold'>{member.name}</p>
                                    <p className={conversation?.lastMessageSeen ? 'text-gray-700' : 'text-black font-semibold'}>{conversation?.lastMessageSender === user.email && 'You: '}{conversation ? conversation.lastMessage : 'No Message Yet'}</p>
                                </div>
                                <div className='flex flex-col items-center gap-2'>
                                    <p className={conversation?.lastMessageSeen ? 'text-gray-700' : 'text-black font-semibold'}>{conversation?.lastMessageTime ? formatTime(conversation.lastMessageTime) : ''}</p>
                                    <div className={conversation?.lastMessageSeen ? '' : 'bg-sky-600 w-2 aspect-square rounded-full'}></div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    );
};

export default Users;