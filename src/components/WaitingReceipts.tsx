import { useEffect, useState } from "react";
import { usePost, } from "../utils/Service"
import { getToken } from "../utils/Cookies";
import { Treceipts, TwatingReceipts } from "../models";
import ReceiptModal from "./modals/ReceiptModal";
import ImageModal from "./modals/ImageModal";
import useItems from "../context/useItems";
import toast, { Toaster } from "react-hot-toast";

export default function watingReceipts() {
  const { mutate } = usePost()
  const [watingReceipts, setWaitingReceipts] = useState<TwatingReceipts[] | null>(null)
  const [isModal, setIsModal] = useState<boolean>(false)
  const { isImageModal, setIsImageModal } = useItems();
  const [receiptInfo, setReceiptInfo] = useState<Treceipts[] | []>([])
  const [selectedImage, setSelectedImage] = useState<string>('')

  useEffect(() => {
    const token = getToken();
    if (token) {
      const formData = new FormData();
      formData.append('token', token);
      mutate({ data: formData, endpoint: 'getAllWatingFactors.php' }, {
        onSuccess: (data) => {
          const sortedData = data.data.sort((a: TwatingReceipts, b: TwatingReceipts) => a.is_paid - b.is_paid);
          setWaitingReceipts(sortedData);

        }
      });
    }

  }, [])
  return (
    <div className='mt-10 relative'>
      <Toaster />

      {isModal && <ReceiptModal setIsModal={setIsModal} receiptInfo={receiptInfo} />}
      {isImageModal && <ImageModal setIsImageModal={setIsImageModal} selectedImage={selectedImage} />}
      <div className='py-8 px-5 flex justify-between '>
        <img src="/icons/pay.png" alt="receiptIcon" className="w-8 h-8" />
        <h1 className='text-xl text-gray-300  font-extrabold'>در انتظار پرداخت های من</h1>
      </div>
      <div className="w-full  flex justify-center text-gray-200 py-8">
        <p className="text-xs text-center opacity-70 w-72">مبلغی که مشاهده میکنید مبلغ کل است و شما تنها سهم خود را محاسبه و پرداخت کنید</p>
      </div>
      <div className='grid pb-5 grid-cols-1  gap-y-20  gap-10 text-slate-800 max-w-sm lg:max-w-4xl place-items-center mx-auto mt-5 pt-5 z-0 space-y-5'>
        {watingReceipts ? watingReceipts.map(item =>
          <div key={item.id} className={` ${item.is_paid == 1 ? 'opacity-20' : 'opacity-100'} relative max-w-sm py-6 bg-white  shadow-lg shadow-white/10   rounded-md  text-center space-y-4  w-80 `}>
            {item.is_paid == 1 &&
              <div className="absolute inset-0 flex items-start z-50 p-2">
                <img src="/icons/checked.png" alt="checked" className="opacity-100 w-8 " />
              </div>
            }
            <div className="  tracking-tight text-gray-900  rounded-full  absolute -top-12 left-1/2 -translate-x-1/2 flex items-center space-x-1  flex-col w-full z-20">
              <img src={item.img_src} alt="profile" className="w-16 h-16 object-center rounded-full object-cover" />

            </div>
            <div className="flex  text-2xl font-bold tracking-tight text-gray-900  justify-center space-x-2 items-center">
              <span className="text-lg opacity-50">تومان</span>
              <h5 className="text-gray-900">{Number(item.total_amount).toLocaleString()}</h5>
            </div>
            <div className="flex  text-base font-bold tracking-tight text-gray-900  justify-center  items-center space-x-2">

              <h5 className="font-bold text-xs text-gray-800/80 ">
                {item.description.length > 16 && (
                  <button type="button" onClick={() => {

                    toast.success(item.description, {
                      duration: 5000,
                      style: {
                        textAlign: 'center'
                      },
                    })
                  }} className="text-blue-500 text-xs mr-1">بیشتر</button>
                )}
                {item.description.length > 16
                  ? `${item.description.slice(0, 16)}`
                  : item.description
                }
              </h5>
              <span className="text-sm opacity-50">: موضوع</span>
            </div>
            <div className="flex flex-col justify-center items-center space-y-3">

              <button type="button" className={` ${item.is_paid == 1 ? 'opacity-50' : 'opacity-100'} flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  justify-center space-x-1`} onClick={() => {
                setSelectedImage(item.image_url)
                setIsImageModal(true)
              }}>
                <span>نمایش فاکتور</span>
                <img src="/icons/receipt4.png" alt="receipt" className="w-5 h-5" />
              </button>
              <button type="button" className={` ${item.is_paid == 1 ? 'opacity-50' : 'opacity-100'} flex items-center p-2 text-sm font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none  bg-blue-700 justify-center space-x-1`} onClick={() => {
                setIsModal(true);
                const formData = new FormData();
                formData.append('receipt_id', item.id.toString());
                mutate({ data: formData, endpoint: 'getReceiptById.php' }, { onSuccess: (data) => setReceiptInfo(data.data) })

              }}>
                <span>ثبت پرداخت</span>
                <img src="/icons/pay.png" alt="receipt" className="w-5 h-5" />
              </button>

              <div className="flex items-center p-2 text-[9px]  justify-center space-x-1">
                <strong className="font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none  bg-blue-800 px-2 py-1 text-xs">{item.username}</strong>
                <h2 className="font-bold">: پرداخت کننده </h2>
              </div>
            </div>

          </div>
        ) :
        <div className="mt-10 font-bold text-green-600 text-base relative  py-5 px-3 rounded-lg shadow shadow-white/50 border bg-white">
          <img src="/icons/pay.png" alt="debit" className="w-10 h-10 absolute left-1/2 -translate-x-1/2 -top-6" />
          <h1>فاکتوری جهت پرداخت شما ثبت نشده است</h1>
        </div> 
        }

      </div>
    </div>
  )
}

