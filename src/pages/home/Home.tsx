import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import Sidebar from './components/Sidebar'
import useItems from '../../context/useItems'
import { sideBarItems } from '../../data'
import { Toaster } from 'react-hot-toast'
import Loader from '../../loader/Loader'

export default function Home() {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  useEffect(() => {
    document.title = "Friendzone";
    setTimeout(() => {
      setShowLoader(false)
    }, 3000);

  }, []);
  const { showNumber } = useItems();
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      {showLoader ? <Loader /> :
        <div className='bg-slate-950 relative h-[2500px] lg:h-[1100px]'>
          <Toaster />
          <div className='absolute right-5  top-5 z-50 lg:hidden  '>
            {isOpen ? <MdClose onClick={handleOpen} className='text-3xl text-gray-200 cursor-pointer' /> : <FaBars onClick={handleOpen} className='text-2xl text-gray-200 cursor-pointer ' />}
          </div>
          <div className='flex justify-end z-50'>
            <div className=' w-full py-2 px-3 lg:px-10'>
              <div className='max-w-3xl mx-auto bg-slate-950 shadow shadow-white lg:max-w-7xl min-h-96 rounded-3xl px-5 lg:px-0'>
                {sideBarItems.filter(item => item.value == showNumber).map(item => <div className='  rounded-t-3xl' key={item.value}>
                  <item.component />
                </div>)}
              </div>
            </div>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      }

    </>
  )
}
