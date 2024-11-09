import { usePost } from "../../utils/Service";
import { useEffect, useState } from "react";
import { Tpayers } from "../../models";
import { MdClose } from "react-icons/md";
import useItems from "../../context/useItems";
import ImageModal from "./ImageModal";
import toast, { Toaster } from "react-hot-toast";

export default function PaymentModal({ selectedReceipt, setIsPaymentModal }: { selectedReceipt: number, setIsPaymentModal: (state: boolean) => void }) {
  const { mutate } = usePost();
  const { isImageModal, setIsImageModal } = useItems();
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [payers, setPayers] = useState<Tpayers[] | []>([])
  useEffect(() => {

    const formData = new FormData();
    formData.append("receipt_id", selectedReceipt.toString())
    mutate({ data: formData, endpoint: "getPaymentsByReceipt.php" }, {
      onSuccess: (data) => {
        setPayers(data.data)
      }
    })
  }, [])
  return (
    <div className="fixed inset-0 bg-black/80  z-50 overflow-auto">
      <Toaster />
      {isImageModal && <ImageModal setIsImageModal={setIsImageModal} selectedImage={selectedImage} />}

      <div className="p-4 relative max-w-md mx-auto bg-slate-950 border border-white/30 rounded-lg  shadow-md sm:p-8 my-10">
        <MdClose className=" text-3xl  text-white/60 z-50" onClick={() => setIsPaymentModal(false)} />
        <div className="w-full  flex justify-center text-gray-200 py-8">
          <p className="text-[10px] text-right opacity-70 w-72">در صورت تکمیل و تایید تمام پرداخت ها در جهت تکمیل فاکتور  و عدم نمایش آن به کاربران بر روی *تایید پرداخت کل هزینه فاکتور* کلیک کنید</p>
        </div>
        <ul role="list" className="py-10">
          {payers && payers.map(item => <li key={item.payment_id} className="py-3 sm:py-4 border-b ">
            <div className="flex items-center   justify-between text-right ">
              <div className="flex space-x-2 items-center">
                  {item.is_paid == 1 ? 
                  <div className="flex justify-center items-center space-x-2">
                  <img src="/icons/checked.png" alt="checked" className="w-8 h-8" />

                  </div>
                   :
                   <div className="flex flex-col space-y-2">
                   <span className="text-white bg-blue-600 text-xs cursor-pointer p-1 rounded" onClick={() => {
                     setSelectedImage(item.receipt_image)
                     setIsImageModal(true)
 
                   }}>مشاهده رسید</span>

                      <span className="text-xs bg-green-600 text-white p-1 rounded" onClick={() => {
                        const formData = new FormData();
                        formData.append("contributor_id", item.contributor_id.toString());
                        mutate({ data: formData, endpoint: "setPaid.php" })
                        toast.success("پرداخت با موفقیت تایید شد")
                      }}>تایید پرداخت</span></div>}
              </div>
              <div className="flex justify-end space-x-2 items-center w-52 ">
                <div className=" flex flex-col">
                  <p className="text-base font-extrabold  capitalize text-gray-200 ">
                    {item.username}
                  </p>
                  {item.amount &&
                    <div className="text-sm space-x-1 text-gray-200   flex">
                      <h3 className="opacity-30">تومـان</h3>
                      <h5>{Number(item.amount).toLocaleString()}</h5>
                    </div>}
                </div>
                <div>
                  <img className="w-12 h-12 rounded-full object-cover" src={item.profile} alt="profile" />
                </div>
              </div>
            </div>
          </li>)}

        </ul>
        <div className="flex flex-col items-center justify-center sm:items-center sm:flex-row space-y-5">
          <button type="button" className=' inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  justify-center space-x-1' onClick={() => setIsPaymentModal(false)}>
            <span>منتظر بقیه پرداخت ها می مانم</span>
            <img src="/icons/pay.png" alt="receipt" className="w-5 h-5" />
          </button>
          <button type="button" className=' inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  justify-center space-x-1' onClick={() => {
            const formData = new FormData();
            formData.append("receipt_id", selectedReceipt.toString())
            mutate({ data: formData, endpoint: "doneReceipt.php" })
            setIsPaymentModal(false)
          }}>
            <span>تایید پرداخت کل هزینه های فاکتور</span>
            <img src="/icons/bill.png" alt="receipt" className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  )
}
