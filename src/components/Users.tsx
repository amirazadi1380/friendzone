import { useEffect, useState } from "react";
import { useGet } from "../utils/Service";
import { Tuser } from "../models";
import toast, { Toaster } from "react-hot-toast";
import useItems from "../context/useItems";

export default function Users() {
  const {setShowNumber} = useItems()
  const [users, setUsers] = useState<Tuser[] | null>(null);
  const { data } = useGet({ key: 'users', endpoint: 'getAllUsers.php' });

  useEffect(() => {
    if (data && data.data) {
      setUsers(data.data);
    }
  }, [data]);

  return (

    <div className="max-w-3xl mx-auto  flex  justify-center ">
      <Toaster/>
      <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 my-10">
        <ul role="list" className=" border-b ">
          {users && users.map(item => <li key={item.id} className="py-3 sm:py-4 border-b ">
            <div className="flex items-center   justify-between text-right ">
             <div className="items-center text-xs w-24 justify-center flex font-bold text-gray-900">
             {item.card ?  <span
                  onClick={() => {
                    if (item.card) {
                      navigator.clipboard.writeText(item.card).then(() => toast.success('شماره کارت کپی شد'))
                        .catch((err) => console.error("خطا در کپی:", err));
                    }
                  }}
                  className="cursor-pointer text-gray-700   border  rounded ml-2 text-[9px]  p-1"
                >
                  کپی شماره کارت
                </span> : <span
                 onClick={()=>setShowNumber(5)}
                  className="cursor-pointer text-white bg-blue-500 border  rounded ml-2 p-1 text-[9px] "
                >
                  افزودن شماره کارت
                </span>}
              </div>
              <div className="flex justify-end space-x-2 items-center w-52 ">
                <div className=" flex flex-col">
                  <p className="text-base font-extrabold  capitalize text-gray-900 ">
                    {item.username}
                  </p>
                  {item.card && 
                  <p className="text-xs text-gray-500  ">
                    {item.card}
                  </p>}
                </div>
                <div>
                  <img className="w-12 h-12 rounded-full object-cover" src={item.img_src} alt="profile" />
                </div>
              </div>
            </div>
          </li>)}

        </ul>
      </div>

    </div>
    // <div className='mt-10'>
    //   <Toaster/>
    //   <div className='py-8 px-5 flex justify-between '>
    //     <HiOutlineUsers className='w-8 h-8 text-gray-300' />
    //     <h1 className='text-xl text-gray-300  font-extrabold'>لیست کاربران</h1>
    //   </div>
    //   <div className='grid pb-5 grid-cols-2 lg:grid-cols-4 gap-10 text-gray-200 max-w-sm lg:max-w-4xl place-items-center mx-auto mt-5'>
    //     {users && users.map(item => (
    //       <div key={item.id} className='flex-col flex items-center hover:scale-110 duration-150 ease-linear cursor-pointer group'>
    //         <div className='w-14 h-14'>
    //           <img src={item.img_src} alt="pfp" className='rounded-full w-full h-full object-cover object-center' />
    //         </div>
    //         <h1 className='group-hover:text-green-500 duration-150 ease-linear'>{item.username}</h1>
    //         <div className='w-10 h-[1px] mt-1 bg-white group-hover:w-20 duration-300 ease-linear' />

    //         {item.card && (
    //           <div className='group-hover:text-green-500 duration-150 ease-linear'>
    //             <span className="text-[10px]">{item.card}</span>
    //             <span 
    //                 onClick={() => {
    //                   if (item.card) {
    //                     navigator.clipboard.writeText(item.card).then(()=>toast.success('کپی شد'))
    //                       .catch((err) => console.error("خطا در کپی:", err));
    //                   }
    //                 }} 
    //               className="cursor-pointer text-stone-500 border px-1 border-white/20 rounded ml-2 text-xs"
    //             >
    //               کپی
    //             </span>
    //           </div>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
