import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { TloginForm } from '../../models'
import { usePost } from '../../utils/Service'
import { setToken } from '../../utils/Cookies';
import toast, { Toaster } from 'react-hot-toast';
import useItems from '../../context/useItems';

export default function LogForm() {
    const {setIsLoggedIn} = useItems()
    const { mutate , isPending} = usePost();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm<TloginForm>();

    const onSubmit = (data: TloginForm) => {
        const formData = new FormData();
        formData.append('username', data.username)
        formData.append('password', data.password)

        mutate({ data: formData, endpoint: 'login.php' }, {
            onSuccess: (data) => {
                if (data.status == 200) {
                    setToken(data.token)
                    navigate('/')
                }
                else {
                    toast.error("نام کاربری یا رمز عبور صحیح نمیباشد")
                    reset()
                }
            }
        })
    }

    return (
        <div className="px-4 py-20 mx-auto max-w-7xl  z-20">
            <Toaster />
            <a href="/" title="Kutty Home Page" className="flex items-center justify-center sm:justify-center">
                <img src="/logo.png" alt="logo" className='w-28 h-28' />
            </a>
            <div
                className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5  shadow-lg shadow-black/30"
            >
                <h1 className="mb-10 text-xl font-bold text-center text-gray-800 sm:text-center">ورود</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="pb-1 space-y-4  text-center justify-center flex flex-col items-center px-5">
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">نام کاربری</span>
                        <input {...register("username")} type="text" placeholder="نام کاربری" required />
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">رمز عبور</span>
                        <input {...register("password")} type="password" placeholder="••••••••" required />
                    </label>

                    <div className="flex  items-start justify-between sm:items-center sm:flex-row">
                    {isPending ? <button type='button' className="w-24 p-2 rounded-lg text-gray-100 bg-blue-600">منتظر بمانید</button> :

                        <button type="submit" className="w-24 p-1 rounded-lg text-gray-100 bg-blue-600"  >ورود</button>}
                    </div>
                </form>
            </div>
                    <p className="my-0 text-xs font-medium text-center text-stone-200 sm:my-5 tracking-wide pt-10 lg:pt-3 cursor-pointer">
                        <button type='button' onClick={() => setIsLoggedIn(false)} className="text-stone-200  mr-1">اکانت نداری؟  <strong className='text-blue-600'>ثبت نام</strong></button>
                    </p>

        </div>
    )
}
