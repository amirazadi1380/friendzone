import { useForm } from "react-hook-form";
import { getToken } from "../../utils/Cookies";
import toast from "react-hot-toast";
import { usePost } from "../../utils/Service";

type TchnageProfile = {
    img_src: FileList
}
export default function ChangeProfileModal({ setIsChangeProfile }: { setIsChangeProfile: (state: boolean) => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm<TchnageProfile>()
    const {mutate} = usePost()
    const onSubmit = (data: TchnageProfile) => {
        const token = getToken();
        if (token) {
            const formData = new FormData()
            formData.append('token', token);
            formData.append('img_src', data.img_src[0]);
            mutate({data:formData,endpoint:"changeProfile.php"},{onSuccess:(data)=>{
                if (data.status == 200) {
                    setIsChangeProfile(false)
                    window.location.reload()
                }}
            })
        }
        else{
            toast.error("خطایی رخ داده دوباره امتحان کنید")
        }
    }
    return (
        <div className="fixed inset-0 bg-black/80  z-50 overflow-auto">
            <div className="absolute left-1/2 -translate-x-1/2 top-40 bg-slate-950 border border-white/30 text-gray-200 w-80 text-center py-10 rounded-2xl z-50 ">
                <form className=" flex flex-col justify-center items-center space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <label className="block w-64">
                        <span className="block mb-1 text-sm font-medium text-gray-200">پروفایل جدید</span>
                        <input type="file" {...register('img_src', { required: 'ثبت عکس الزامیست' })} />
                        <p className='text-[10px] text-red-600 font-medium'>{errors.img_src?.message}</p>
                    </label>
                    <div className="flex flex-col justify-center items-center">
                        <button type="submit" className="mt-2 text-sm p-2 rounded-lg text-gray-100 bg-blue-600"  >ثبت پروفایل جدید</button>
                        <button type="button" className="mt-2 text-sm p-2 rounded-lg text-gray-100 bg-green-700 opacity-80" onClick={() => setIsChangeProfile(false)}> پروفایل قبل</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
