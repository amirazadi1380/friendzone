import { useEffect, useState } from "react";
import { useGet, usePost } from "../utils/Service";
import { Tuser } from "../models";
import toast, { Toaster } from "react-hot-toast";
import { getToken } from "../utils/Cookies";

export default function Users() {
  const [users, setUsers] = useState<Tuser[] | null>(null);
  const { data } = useGet({ key: 'users', endpoint: 'getAllUsers.php' });
  const [userId, setUserId] = useState<number>();
  const { mutate } = usePost()

  useEffect(() => {
    const token = getToken();

    if (token) {
      const formData = new FormData();
      formData.append('token', token);
      mutate({ data: formData, endpoint: "getUser.php" }, { onSuccess: (data) => setUserId(data.data.id) });
    }
    if (data && data.data) {
      setUsers(data.data);
    }
  }, [data]);

  return (

    <div className="max-w-3xl mx-auto  flex  justify-center ">
      <Toaster />
      <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 my-10">
        <ul role="list" className=" border-b ">
          {users && users.filter(item => item.id != userId).map(item => <li key={item.id} className="py-3 sm:py-4 border-b ">
            <div className="flex items-center   justify-between text-right ">
              <div className="items-center text-xs w-24 justify-center flex font-bold text-gray-900">
                {item.card && <span
                  onClick={() => {
                    if (item.card) {
                      navigator.clipboard.writeText(item.card).then(() => toast.success('شماره کارت کپی شد'))
                        .catch((err) => console.error("خطا در کپی:", err));
                    }
                  }}
                  className="cursor-pointer text-gray-700   border  rounded ml-2 text-[9px]  p-1"
                >
                  کپی کارت
                </span> }
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

  );
}
