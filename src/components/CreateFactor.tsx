import { useForm } from "react-hook-form"
import { TcreateReceiptForm } from "../models";
import { usePost } from "../utils/Service";
import { getToken } from "../utils/Cookies";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function CreateFactor() {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState:{errors} } = useForm<TcreateReceiptForm>();
  const { mutate } = usePost();

  const onSubmit = (data: TcreateReceiptForm) => {
    const token = getToken();
    if (token) {
      const date = new Date()
      const currentTimeStamp = date.getTime();
      const formData = new FormData()
      formData.append('token', token)
      formData.append('total_amount', data.total_amount.toString())
      formData.append('image_url', data.image_url[0])
      formData.append('description', data.description)
      formData.append('created_at', (currentTimeStamp /1000).toString())

      mutate({ data: formData, endpoint: 'createReceipt.php' })
      reset()
      toast.success(
        'فاکتور با موفقیت ثبت شد\n\nلطفا در قسمت فاکتورها افراد مورد نظر را اضافه کنید',
        {
          duration: 5000,
          style: {
            textAlign: 'center'
          },
        }
      );
    }
    else {
      navigate('/auth');
    }
  }
  return (
    <div className="px-4 py-20 mx-auto max-w-7xl  z-20">
      <Toaster />
      <div
        className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5  shadow-lg shadow-black/30"
      >
        <h1 className="mb-10 text-xl font-bold text-center text-gray-800 sm:text-center">ثبت فاکتور</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-1 space-y-4  text-center justify-center flex flex-col items-center px-5">
          <label className="block">
            <span className="block mb-1 text-xs font-medium text-gray-700">عنوان فاکتور</span>
            <input {...register("description",{required:"عنوان فاکتور الزامیست"})} type="text" placeholder="توضیح کوتاه راجع به فاکتور" />
            <p className='text-[10px] text-red-600 font-medium'>{errors?.description?.message}</p>
          </label>
          <label className="block">
            <span className="block mb-1 text-xs font-medium text-gray-700">قیمت کل</span>
            <input {...register("total_amount",{required:"قیمت کل الزامیست"})} type="number" placeholder="تومان" />
            <p className='text-[10px] text-red-600 font-medium'>{errors?.total_amount?.message}</p>

          </label>
          <label className="block">
            <span className="block mb-1 text-xs font-medium text-gray-700">عکس فیش پرداختی</span>
            <input {...register("image_url")} type="file" />
          </label>

          <div className="flex  items-start justify-between sm:items-center sm:flex-row">
            <button type="submit" className="w-24 p-2 rounded-lg text-gray-100 bg-blue-600" >ثبت فاکتور</button>
          </div>
        </form>
      </div>

    </div>
  )
}
