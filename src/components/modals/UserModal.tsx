import { useEffect, useState } from "react";
import { useGet, usePost } from "../../utils/Service";
import { Tcontributes, Tuser } from "../../models";
import toast, { Toaster } from "react-hot-toast";
import { getToken } from "../../utils/Cookies";

export default function UserModal({ selectedReceipt, setIsModal }: { selectedReceipt: number, setIsModal: (state: boolean) => void }) {
    const { mutate } = usePost();
    const [users, setUsers] = useState<Tuser[] | null>(null);
    const { data } = useGet({ key: 'users', endpoint: 'getAllUsers.php' });
    const [user, setUser] = useState<Tuser | null>(null);
    const [contributorsNum, setContributorsNum] = useState<number>(0);
    const [contributors, setContributors] = useState<Tcontributes[] | []>([]);

    useEffect(() => {
        setUsers(data?.data);
        const token = getToken();
        if (token) {

            const formData1 = new FormData();
            formData1.append("token", token);

            mutate({ data: formData1, endpoint: "getUser.php" }, {
                onSuccess: (data) => {
                    setUser(data.data);

                    const formData2 = new FormData();
                    formData2.append("receipt_id", selectedReceipt.toString());
                    mutate({ data: formData2, endpoint: "getAllContributors.php" }, {
                        onSuccess: (data) => setContributors(data.data),
                    });
                },
                onError: (error) => {
                    console.error("Error in getUser.php:", error);
                },
            });
        }
    }, [selectedReceipt,data,contributorsNum]);


    const isContributor = (userId: number) => {
        return contributors.some(contributor => contributor.user_id === userId);
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-auto">
            <Toaster />
            <div className="absolute left-1/2 -translate-x-1/2 top-2 bg-black border border-white/30 text-gray-200 w-96 text-center py-8 rounded-2xl z-50">
                <div>
                    <h1 className="font-bold">افراد مورد نظر را انتخاب کن</h1>
                </div>
                <div className="p-4 max-w-xs mx-auto bg-white rounded-lg border shadow-md my-10">
                    <ul role="list" className="border-b">
                        {users && users.filter(item => item.id != user?.id).map(item => (
                            <li key={item.id} className="py-3 sm:py-4 border-b">
                                <div className="flex items-center space-x-0 justify-between text-right">
                                    <div className="items-center text-base font-semibold text-gray-900 flex justify-center text-center w-28 ">
                                        <span
                                            onClick={() => {
                                                if (isContributor(item.id)) return;
                                                const formData = new FormData();
                                                formData.append("userID", item.id.toString());
                                                formData.append("receiptID", selectedReceipt.toString());
                                                mutate({ data: formData, endpoint: 'createContributors.php' }, {
                                                    onSuccess: (data) => {
                                                        if (data.status === 200) {
                                                            setContributorsNum(contributorsNum + 1);
                                                            toast.success('کاربر با موفقیت اضافه شد');
                                                        } else if (data.status === 201) {
                                                            toast.error('کاربر قبلا اضافه شده است');
                                                        }
                                                    }
                                                });
                                            }}
                                            className={` rounded-lg text-gray-100 text-xs py-2 ${isContributor(item.id) ? 'bg-green-500' : 'bg-blue-600'} w-full `}
                                        >
                                            {isContributor(item.id) ? 'افزوده شده' : 'افزودن'}
                                        </span>
                                    </div>
                                    <div className="flex justify-center items-center space-x-5">
                                        <div>
                                            <p className="text-base font-extrabold capitalize text-gray-900">
                                                {item.username}
                                            </p>
                                        </div>
                                        <div>
                                            <img className="w-12 h-12 rounded-full object-cover" src={item.img_src} alt="profile" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-start justify-center sm:items-center sm:flex-row">
                    <button onClick={() => setIsModal(false)} type="button" className="w-24 p-2 rounded-lg text-gray-100 bg-blue-600">پایان</button>
                </div>
            </div>
        </div>
    );
}
