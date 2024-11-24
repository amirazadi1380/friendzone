import toast, { Toaster } from 'react-hot-toast'
import useItems from '../../context/useItems'
import { useForm } from 'react-hook-form';
import { TsignForm } from '../../models';
import { usePost } from '../../utils/Service';
export default function SignForm() {
    const { setIsLoggedIn } = useItems()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TsignForm>()
    const { mutate, isPending } = usePost();
    const onSubmit = (data: TsignForm) => {
        if (data.password == data.rpassword) {
            const formData = new FormData();
            formData.append('username', data.username)
            formData.append('password', data.password)
            formData.append('profile', data.image[0])

            mutate({ data: formData, endpoint: 'signup.php' }, { onSuccess: () => {
                setIsLoggedIn(true) }})
        }
        else {
            toast.error('پسورد ها مطابقت ندارد')
            reset()
        }
    }
    return (
        <div className="px-4 py-0 mx-auto max-w-7xl z-20">
            <Toaster
                reverseOrder={false} />
            <a href="/" title="آزادی" className="flex items-center justify-center sm:justify-center">
                <img src="/logo.png" alt="logo" className='w-28 h-28' />
            </a>
            <div
                className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 z-50 border-gray-200 rounded-lg bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5  shadow-lg shadow-black/30"
            >
                <h1 className="mb-5 text-xl font-bold text-center text-gray-800 sm:text-center">ثبت نام</h1>
                <form className="pb-1 space-y-4  text-right px-5" onSubmit={handleSubmit(onSubmit)}>
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">نام</span>
                        <input {...register("username", { required: "نام کاربری معتبر نمیباشد" })} type="text" placeholder="نام کاربری" />
                        <p className='text-[10px] text-red-600 font-medium'>{errors?.username?.message}</p>
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">رمز عبور</span>
                        <input
                            {...register('password', {
                                required: 'پسورد را به صورت صحیح وارد کنید',
                                minLength: {
                                    value: 8,
                                    message: 'پسورد نباید کمتر از ۸ کاراکتر باشد',
                                },
                            })}
                            type="password"
                            placeholder="••••••••"
                        />
                        <p className='text-[10px] text-red-600 font-medium'>{errors?.password?.message}</p>
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">تکرار رمز عبور</span>
                        <input {...register('rpassword', { required: 'پسورد را به صورت صحیح وارد کنید' })} type="password" placeholder="••••••••" />

                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">پروفایل</span>
                        <input type="file" {...register('image', { required: "عکس پروفایل الزامیست" })} />
                        <p className='text-[10px] text-red-600 font-medium'>{errors?.image?.message}</p>
                    </label>
                    <div className="flex  items-start justify-center sm:items-center sm:flex-row space-x-20">
                        {/* <label className="flex items-center">
                            <input type="checkbox" className="w-4" />
                            <span className="block ml-2 text-[8px]  lg:text-[9px] font-medium text-gray-700 cursor-pointer">موافقت با قوانین و مقررات</span>
                        </label> */}
                        {isPending ? <button type='button' className="w-24 p-2 rounded-lg text-gray-100 bg-blue-600 text-xs">منتظر بمانید</button> :
                            <button type="submit" className="w-24 p-1 rounded-lg text-gray-100 bg-blue-600"  >ثبت نام</button>}
                    </div>
                </form>
            </div>
            <p className="my-0 text-xs font-medium text-center text-gray-200 sm:my-5 tracking-wide pt-10 lg:pt-3">
                <button type='button' onClick={() => setIsLoggedIn(true)} className="text-purple-700 hover:text-purple-900 mr-1">ورود</button>
                قبلا ثبت نام کردی؟
            </p>
        </div>)
}
