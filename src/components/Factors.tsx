import { useEffect, useState } from "react";
import { usePost } from "../utils/Service"
import { Treceipts } from "../models";
import { getToken } from "../utils/Cookies";
import { useNavigate } from "react-router-dom";
import UserModal from "./modals/UserModal";
import PaymentModal from "./modals/PaymentModal";
import toast, { Toaster } from "react-hot-toast";
import useItems from "../context/useItems";

export default function Factors() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectedReceipt, setSelectedReceipt] = useState<number>(0);
  const [receipts, setReceipts] = useState<Treceipts[] | null>(null);
  const [isPaymentModal, setIsPaymentModal] = useState<boolean>(false);
  const { mutate } = usePost();
  const navigate = useNavigate();
  const {setShowNumber} = useItems()
  useEffect(() => {
    const token = getToken();
    if (token) {
      const formData = new FormData();
      formData.append('token', token);
      mutate({ data: formData, endpoint: 'getAllReceipts.php' }, {
        onSuccess: (data) => {
          setReceipts(data.data)
        }
      });
    }
    else {
      navigate('/auth');
    }
  }, [])
  return (
    <div className='mt-10 relative'>
      <Toaster/>
      {isModal && <UserModal selectedReceipt={selectedReceipt} setIsModal={setIsModal} />}
      {isPaymentModal && <PaymentModal selectedReceipt={selectedReceipt} setIsPaymentModal={setIsPaymentModal} />}
      <div className='py-8 px-5 flex justify-between '>
        <img src="/icons/receipt4.png" alt="receiptIcon" className="w-8 h-8" />
        <h1 className='text-xl text-gray-300  font-extrabold'>لیست فاکتور ها</h1>
      </div>
      <div className='grid pb-5 grid-cols-1  gap-10 text-slate-800 max-w-sm lg:max-w-4xl place-items-center mx-auto mt-5 pt-5 z-0'>

        {receipts && receipts.length > 0 ? receipts.map(item =>
          <div key={item.id} className={`${item.is_done == 1 ? 'opacity-20' : 'opacity-100'} max-w-sm p-6 bg-white border px-10 border-gray-200 rounded-lg shadow  text-center flex flex-col items-center space-y-4 w-80 `}>
            <div className="flex  text-gray-800 space-x-2">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{Number(item.total_amount).toLocaleString()}</h5>
              <span className="text-gray-900 font-bold text-lg opacity-50">: قیمت کل</span>
            </div>
            <div className="flex mb-2 text-base font-bold tracking-tight text-gray-900  justify-center  items-center space-x-2">
              <h5 className="font-bold text-base text-gray-800/80 ">
                {item.description.length > 18 && (
                  <button type="button" onClick={() =>{

                   toast.success(item.description,   {
                    duration: 5000,
                    style: {
                      textAlign: 'center'
                    },
                  })
                  }} className="text-blue-500 text-xs mr-1">بیشتر</button>
                )}
                {item.description.length > 18
                  ? `...${item.description.slice(0, 18)}`
                  : item.description
                }
              </h5>
              <span className="text-sm opacity-50">: موضوع</span>
            </div>
            <div className="flex flex-col  px-8 items-center space-y-3 ">

              <button type="button" disabled={item.is_done == 1} className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  justify-center space-x-2" onClick={() => {
                setSelectedReceipt(item.id)
                setIsModal(true)
              }}>
                <span>افزودن افراد</span>
                <img src="/icons/users.png" alt="users" className="w-6 h-6" />
              </button>
              <button disabled={item.is_done == 1} type="button" className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg justify-center space-x-2" onClick={() => {
                setSelectedReceipt(item.id)
                setIsPaymentModal(true)
              }}>
                    <span>مشاهده پرداختی</span>
                <img src="/icons/checked.png" alt="users" className="w-6 h-6" />
                
      
              </button>
            </div>
          </div>
        ) : <div className="mt-10 font-bold text-green-600 text-lg relative  py-5 px-3 rounded-lg shadow shadow-white/50 border bg-white flex justify-center items-center flex-col space-y-5">
          <img src="/icons/receipt2.png" alt="debit" className="w-10 h-10 absolute left-1/2 -translate-x-1/2 -top-6" />
          <h1>تاکنون فاکتوری ایجاد نکرده اید</h1>
              <button type="button" className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg justify-center space-x-2" onClick={() => {setShowNumber(3)}}>
                    <span>ساخت فاکتور جدید</span>
                <img src="/icons/receipt.png" alt="users" className="w-6 h-6" />
                
      
              </button>
        </div>
        }

      </div>
    </div>
  )
}
