import { useQuery } from '@tanstack/react-query';
import React, { use, useEffect, useRef, useState } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { GoImage } from 'react-icons/go';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdKeyboardVoice } from 'react-icons/md';
import { TbSend2 } from 'react-icons/tb';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';
import { socket } from '../Socket.Io/socket';

const Inbox = () => {
    const {id} = useParams()
    const axiosSecure = useAxiosSecure()
    const {user} = use(AuthContext)
    const [messages, setMessages] = useState([])
    const [active, setActive] = useState(false)
    const inputRef = useRef(null)

    const {data: friend = {}, isLoading} = useQuery({
        queryKey: ['friend'],
        queryFn: async() => {
            const res = await axiosSecure(`/users/${id}`)
            return res.data
        }
    })
    // console.log(friend);

    const {data: prevMessages = [], isLoading: messagesLoading, refetch} = useQuery({
        queryKey: ['messages', user?.email, friend.email],
        queryFn: async() => {
            const res = await axiosSecure(`/messages?sender=${user?.email}&receiver=${friend?.email}`)
            return res.data
        }
    })

    const {data: conversation = {}, refetch: refetchConv} = useQuery({
        queryKey: ['conversation'],
        enabled: !!user?.email && !!friend?.email,
        queryFn: async() => {
            const res = await axiosSecure(`/conversation?user1=${user?.email}&user2=${friend?.email}`)
            return res.data
        }
    })
    // console.log(conversation)

    useEffect(() => {
        setMessages(prevMessages)
    }, [prevMessages])

    const handleMsgSubmit = async(e) => {
        e.preventDefault()
        inputRef.current?.focus()
        const message = e.target.message.value
        const msgData = {
            message: message,
            senderEmail: user.email,
            receiverEmail: friend.email,
            seen: false,
            createdAt: new Date()
        }

        const res = await axiosSecure.post('/messages', msgData)

        if(res.data.insertedId){
            refetch()
            e.target.reset()
            socket.emit('sendMessage', {
                message,
                receiver: friend.email
            })
            // console.log(message);
            
            await axiosSecure.post(`/conversations?user1=${user?.email}&user2=${friend?.email}`, {message})
            await refetchConv()
        }

    }

    useEffect(() => {
        const markSeen = async() => {
            await axiosSecure.patch(
                `/conversations?user1=${user?.email}&user2=${friend?.email}`
            );

            socket.emit('seenMessage', {
                receiver: friend?.email
            });
        };

        if(user?.email && friend?.email){
            if (
                conversation?.lastMessageSender === friend?.email &&
                conversation?.lastMessageSeen === false
            ) {
                markSeen();
            }
        }
    }, [friend?.email, user?.email, axiosSecure, conversation?.lastMessageSeen, conversation?.lastMessageSender]);
    useEffect(() => {
        const handleReceiveMessage = async(data) => {
            // console.log(data);            
            setMessages((prev) => [data, ...prev])
            axiosSecure.patch(`/messages/seen?senderEmail=${friend?.email}&receiverEmail=${user?.email}`, {seen: true})

            socket.emit('seenMessage', {seen: true, receiver: friend?.email})
        };
        const handleSeenMessage = async() => {
            // setSeen(true);
            await refetchConv()
        };
        const handleActiveUsers = async(data) => {
            // console.log(data);
            setActive(data.includes(friend?.email))
        }
        
        socket.on('receiveMessage', handleReceiveMessage);
        socket.on('seenMessage', handleSeenMessage);
        socket.emit('getActiveUsers')
        socket.on('activeUsers', handleActiveUsers)
        
        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
            socket.off('seenMessage', handleSeenMessage);
            socket.off('activeUsers', handleActiveUsers)
        };
    }, [refetch, axiosSecure, user, friend, refetchConv])
    // console.log(messages);
    

    
    

    const chatRef = useRef(null)
    // useEffect(() => {
    //     chatRef.current?.scrollIntoView({
    //         behavior: "smooth"
    //     });
    // }, [messages, prevMessages, friend]);

    useEffect(() => {
        if (prevMessages.length > 0) {
            setTimeout(() => {
                chatRef.current?.scrollIntoView();
            }, 300);
        }
    }, [prevMessages]);

    if(isLoading || messagesLoading){
        return <div className='flex items-start pt-10 justify-center min-h-screen'><p className='loading loading-spinner loading-lg'></p></div>
    }
    return (
        <div className='h-dvh bg-white flex flex-col'>
            <div className='flex items-center gap-3 border-b-1 border-sky-600 px-5 py-2'>
                <Link to={'/'} className='text-3xl'>
                    <IoArrowBackOutline />
                </Link>
                <div className='flex w-full justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <div>
                            <img className='w-11 aspect-square rounded-full' src={friend?.photoURL} alt="" />
                        </div>
                        <div>
                            <p className='text-lg font-semibold'>{friend?.name}</p>
                            <p>{active ? 'Online Now' : 'Offline Now'}</p>
                        </div>
                    </div>
                    <BiInfoCircle className='text-3xl'/>
                </div>
            </div>

            <div className='overflow-y-scroll flex-1 flex flex-col pt-3 pb-2'>
                <div className='flex flex-col-reverse justify-start gap-2'>
                {
                    messages?.map((message, index)=>{
                        const isFriend = message.senderEmail === friend.email
                        const showProfile = isFriend && (index === messages.length-1 || messages[index-1]?.senderEmail !== friend.email)
                        
                        // console.log(message.senderEmail);
        
                        if(showProfile){
                            return(
                                <div className={`flex ${message.senderEmail === user.email && 'justify-end'} items-end gap-1`} key={index}>
                                    <img className='w-8 h-8 rounded-full ml-1' src={friend.photoURL} alt="" />
                                    <p className='bg-sky-300 px-3 py-2 rounded-2xl max-w-[75%] break-words'>{message.message}</p>
                                </div>
                            )
                        }
                        // console.log(messages[0]?.message);
                        // console.log(conversation.lastMessage);
                        // console.log(conversation.lastMessageSeen);
                        return(
                            <div className={`flex flex-col ml-10 ${message.senderEmail === user.email ? 'items-end' : 'items-start'}`} key={index}>
                                <p className='bg-sky-300 px-3 py-2 rounded-2xl max-w-[75%] break-words'>{message.message}</p>
                            {
                                message.senderEmail === user?.email  && index === 0 && (
                                        <p>{conversation.lastMessageSeen ? 'Seen' : 'Sent'}</p>
                                    )
                                
                                
                            }
                            </div>
                        )
                        
                    })
                }
                </div>
                <div ref={chatRef}>
                    
                </div>
            </div>

            <form onSubmit={handleMsgSubmit} className='flex items-center gap-2 w-full bottom-0 bg-white p-4 border-t-1 border-sky-600'>
                <GoImage className='text-4xl text-sky-600'/>
                <MdKeyboardVoice className='text-4xl text-sky-600'/>
                <input ref={inputRef} className='py-2 px-2 bg-gray-300 rounded-full w-full' name='message' type="text" placeholder='Message...'/> 
                <button type='submit'>
                    <TbSend2 className='text-2xl text-sky-600 transition 
                    active:bg-gray-300 rounded-full'/>
                </button>
            </form>
        </div>
    );
};

export default Inbox;