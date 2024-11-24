import { useForm } from "react-hook-form";
import {  Toaster, toast } from "react-hot-toast";
import { usePost } from "../utils/Service";
import { getToken } from "../utils/Cookies";
import { useNavigate } from "react-router-dom";
import useItems from "../context/useItems";

type TaddCardForm = {
    card: string;
};

export default function AddCard() {
    const navigate = useNavigate()
    const { mutate } = usePost()
    const { register, handleSubmit, formState: { errors } } = useForm<TaddCardForm>();
    const {setShowNumber} = useItems();

    const onSubmit = (data: TaddCardForm) => {
        const token = getToken()
        if (token) {
            const formData = new FormData();
            formData.append('card', data.card)
            formData.append('token', token)
            mutate({ data: formData, endpoint: 'addCard.php' }, {
                onSuccess: () => toast.success('شماره حساب با موفقیت اضافه شد')
            })
            setTimeout(() => { 
                setShowNumber(4);
            }, 1500);
        }
        else {
            navigate('/auth')
        }
    };

    return (
        <div className="px-4 py-20 mx-auto max-w-7xl  z-20">
            <div className="w-full  flex justify-end text-gray-200 py-8">
                <p className="text-[9px] text-center opacity-70 ">در صورت اینکه قبلا شماره کارتی را ثبت کرده اید شماره کارت جدید جایگزین شماره کارت ثبت شده قبل میشود</p>
            </div>
            <Toaster />
            <a href="/" title="Kutty Home Page" className="flex items-center justify-center sm:justify-center">
                <img src="/logo.png" alt="logo" className='w-28 h-28' />
            </a>
            <div
                className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5  shadow-lg shadow-black/30"
            >
                <h1 className="mb-10 text-xl font-bold text-center text-gray-800 sm:text-center">ثبت شماره کارت</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="pb-1 space-y-4  text-center justify-center flex flex-col items-center px-5">
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">شماره کارت</span>
                        <input
                            {...register("card", {
                                required: "شماره کارت الزامی است", // Required validation
                                pattern: {
                                    value: /^\d{16}$/, // 16 digits pattern
                                    message: "شماره کارت باید ۱۶ رقم و بدون حروف باشد" // Custom error message
                                }
                            })}
                            type="text"
                            placeholder="شماره کارت"
                            className={`w-full p-2 border ${errors.card ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                        />
                        {errors.card && <p className="text-red-500 text-sm mt-1">{errors.card.message}</p>}
                    </label>

                    <div className="flex items-start justify-between sm:items-center sm:flex-row">
                        <button type="submit" className="w-24 p-1 rounded-lg text-gray-100 bg-blue-600">ثبت</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
