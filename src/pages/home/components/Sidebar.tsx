import { useEffect, useRef, useState } from 'react';
import useItems from '../../../context/useItems';
import { usePost } from '../../../utils/Service';
import { deleteToken, getToken, } from '../../../utils/Cookies';
import { Tuser } from '../../../models';
import { sideBarItems } from '../../../data';
import { useNavigate } from 'react-router-dom';
import { IoIosCamera } from "react-icons/io";
import ChangeProfileModal from '../../../components/modals/ChangeProfileModal';

export default function Sidebar({ isOpen,setIsOpen }: { isOpen: boolean ,setIsOpen:(state:boolean)=>void}) {
    const [isChnageProfile,setIsChangeProfile] = useState<boolean>(false)
    const navigate = useNavigate();
    const [user, setUser] = useState<Tuser | null>(null)
    const { setShowNumber } = useItems()
    const { mutate } = usePost()
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        const token = getToken()
        setToken(token)
        if (token) {
            const formData = new FormData();
            formData.append('token', token)
            mutate({ data: formData, endpoint: 'getUser.php' }, {
                onSuccess: (data) => {
                    setUser(data.data)
                }
                , onError: (error) => console.error(error)
            })
        }
    }, [])
    const sidebarRef = useRef(null);
    return (
        <div
            ref={sidebarRef}
            className={` ${isOpen ? 'w-72 duration-75 ease-linear opacity-100 absolute z-30 border border-white/30 right-0 top-2' : 'w-0 opacity-0 duration-75 ease-linear'} 
            absolute lg:static lg:w-[350px] lg:opacity-100 lg:flex flex-col  h-screen px-5 py-16 lg:py-8 overflow-y-hidden bg-slate-950 rounded-l-2xl `}
        >
            {isChnageProfile && <ChangeProfileModal setIsChangeProfile={setIsChangeProfile}/>}
            <div className='w-full flex justify-between  items-center'>
                <div className='w-14 rounded-full h-14 flex bg-white  flex-col'>
                    <img className="w-full h-full rounded-full object-cover " src={
                        user && token ? user.img_src : "https://pixsector.com/cache/50fcb576/av0cc3f7b41cb8510e35c.png"} alt="pfp" />
                    {user?.img_src && <div className='flex bg-slate-900 space-x-1 text-gray-200 p-1 -mt-1 justify-center rounded-xl  items-center cursor-pointer' onClick={()=>setIsChangeProfile(true)}>
                    <span className='text-xs'>تغییر</span>
                    <IoIosCamera className='text-sm'/>
                    </div>}
                </div>
                <h1 className='font-bold text-green-300 capitalize text-3xl'>
                    {user && token  ? user.username : "guest"}
                </h1>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-8 flex flex-col text-right ">

                        {sideBarItems.map(item =>
                            <button onClick={() =>{
                             setShowNumber(item.value)
                             setIsOpen(false)
                             
                             }} key={item.id} type='button' className="flex justify-end items-center  px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">

                                <span className="mx-2 text-sm font-medium ">{item.title}</span>
                                <img src={item.icon} alt='icon' className='w-7 h-7 object-cover'/>
                            </button>
                        )}
                        {token != null ? <button onClick={() => {
                            deleteToken()
                            setToken(null)
                        }} type='button' className="flex text-red-500 justify-end items-center  px-3 py-2  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 ">
                            <span className="mx-2 text-sm font-bold ">خروج</span>
                        </button> :
                            <button onClick={() => navigate('/auth')} type='button' className="flex text-green-500 justify-end items-center  px-3 py-2  transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                                <span className="mx-2 text-sm font-medium ">ورود / ثبت نام</span>
                            </button>}


                    </div>

                </nav>
            </div>
        </div>
    );
}
