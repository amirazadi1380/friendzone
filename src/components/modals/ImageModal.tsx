import { MdClose } from "react-icons/md"

export default function ImageModal({setIsImageModal,selectedImage}:{setIsImageModal:(state:boolean)=>void,selectedImage:string }) {
    return (
        <div className="fixed inset-0 bg-black/80  z-50 overflow-auto">
            <MdClose className="absolute left-1 top-1 text-5xl text-white z-50" onClick={()=>setIsImageModal(false)}/>
            <div className="absolute left-1/2 -translate-x-1/2 top-20 bg-black  text-gray-200 w-96 text-center py-10 rounded-2xl z-30">
                <img src={selectedImage} alt="receipt_image"  className="w-full h-full object-contain"/>
            </div>
        </div>
    )
}
