import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { data, Link } from 'react-router';
import { router } from '../Routes/Route';

const Login = () => {
    const {loginWithGoogle, loginWithFacebook, loginWithEmail} = use(AuthContext)    
    const {register, handleSubmit, formState:{errors}} = useForm()
    
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then((result)=>console.log(result.user))
    }
    const handleFacebookLogin = () => {
        loginWithFacebook()
            .then((result)=>console.log(result.user))
    }
    const handleEmailLogin = (data) => {
        loginWithEmail(data.email, data.pass)
            .then(result=>{
                if(result){
                    router.navigate('/')
                }
            })
    }
    return (
        <div>
            <div className='min-h-screen flex justify-center items-center'>
                <div className='bg-white p-5 rounded-xl shadow-xl border-2 border-sky-500'>
                    <h3 className='text-3xl font-bold'>Welcome Back</h3>
                    <p className='mt-2 font-semibold'>Login With SNChat</p>
                    <form onSubmit={handleSubmit(handleEmailLogin)}>
                        <p className='mt-5 font-semibold'>Email</p>
                        <input {...register('email', {required: true})} placeholder='Enter Your Email' className='mt-1 p-2 border border-gray-300 w-80 h-10 rounded' type="email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Eamil required</p>}

                        <p className='mt-5 font-semibold'>Password</p>
                        <input {...register('pass', {required: true})} placeholder='Enter Your Password' className='mt-1 p-2 border border-gray-300 w-80 h-10 rounded' type="password" />
                        {errors.pass?.type === 'required' && <p className='text-red-500'>Password required</p>}
                        
                        <Link to={'/forgetpass'}>
                            <p className='text-[#03373D] underline 
                            cursor-pointer my-2'>Forget Password?</p>
                        </Link>

                        <input className='w-80 mt-3 h-10 btn bg-linear-to-b from-sky-800 to-sky-400 text-black font-semibold px-6 border-[#CAEB66] text-lg shadow-none' value={'Login'} type="submit" />
                    </form>

                    <p className='mt-2 mb-5'>Don't have an account? <Link to={'/signup'}><span className='text-sky-500 font-bold'>Register</span></Link></p>
                    <div className='divider'>OR</div>
                    <button onClick={handleGoogleLogin} className="btn bg-white text-black shadow-none w-80 border-gray-300">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button> <br />
                    
                </div>
            </div>
        </div>
    );
};

export default Login;