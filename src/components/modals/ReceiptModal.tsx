
import { useForm } from "react-hook-form";
import { TpaymentForm, Treceipts } from "../../models";
import { getToken } from "../../utils/Cookies";
import { usePost } from "../../utils/Service";
import { MdClose } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";


export default function ReceiptModal({ setIsModal, receiptInfo }: { setIsModal: (state: boolean) => void, receiptInfo: Treceipts[] }) {
    const { register, handleSubmit } = useForm<TpaymentForm>()
    const { mutate } = usePost();
    const onSubmit = (data: TpaymentForm) => {
        const formData = new FormData();
        const token = getToken();
        if (token) {
            const date = new Date()
            const currentDate = date.getTime() / 1000;
            formData.append("token", token);
            formData.append("amount", data.amount.toString());
            formData.append("receipt_image", data.receipt_image[0]);
            formData.append("receipt_id", receiptInfo[0].id.toString());
            formData.append('payment_date', currentDate.toString())
            mutate({ data: formData, endpoint: "createPayment.php" }, {
                onSuccess: () => {
                            toast.success("پرداخت شما با موفقیت ثبت شد")
                            setIsModal(false)
                    
                }
            })
        }
    }
    return (
        <div className="fixed inset-0 bg-black/80  z-50 overflow-auto">
            <Toaster/>
            <div className="absolute left-1/2 -translate-x-1/2 top-40 bg-slate-950 border border-white/30 text-gray-200 w-80 text-center py-10 rounded-2xl z-50 ">
                <MdClose className="absolute left-1 top-1 text-5xl text-white z-50" onClick={() => setIsModal(false)} />

                <div className='flex text-gray-300 max-w-sm lg:max-w-4xl place-items-center mx-auto mt-8 '>
                    {receiptInfo && receiptInfo.map(item => <div key={item.id} className=' flex-col flex items-center  space-y-2 mx-auto max-w-md justify-center'>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                            <label className="block space-y-2">
                                <span className="block mb-1 text-xs font-medium text-gray-400">مقدار پرداختی</span>
                                <input className="text-black/80" type="text" placeholder="رقم خود را وارد کنید" {...register('amount', { required: "مقدار نباید خالی باشد" })} />
                            </label>
                            <label className="block  my-5">
                                <span className="block mb-1 text-xs font-medium text-gray-400">فیش واریز</span>
                                <input type="file" {...register('receipt_image')} />
                            </label>
                            <input type="submit" value="ثبت پرداخت" className="bg-blue-600 text-center " />
                        </form>
                    </div>)}

                </div>

            </div>
        </div>
    )
}
