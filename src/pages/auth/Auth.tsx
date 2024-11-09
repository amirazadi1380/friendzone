import useItems from "../../context/useItems"
import LogForm from "./LogForm"
import SignForm from "./SignForm"

export default function Auth() {
  const { isLoggedIn } = useItems()
  return (
    <div className='w-full h-[950px] lg:h-[900px] relative'>
      <img src="/back4.jpg" alt="background" className="w-full h-full absolute inset-0 object-cover brightness-50  -z-10"/>
      {isLoggedIn ? <LogForm /> : <SignForm />}
    </div>
  )
}
