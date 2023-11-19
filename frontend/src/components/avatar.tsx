import ManAvatar from '@/assets/man-avatar.svg'
import classNames from "classnames";
import {useMemo} from "react";


const Avatar = () => {
  const gradOne = 'bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% '
  const gradTwo = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
  const gradThree =  'bg-gradient-to-r from-[#D9ECD9] from-17.75 to-[#013474] to-95'
  const gradFour = 'bg-gradient-to-r from-cyan-500 to-blue-500'

  const grads = [gradOne, gradTwo, gradThree, gradFour]
  const randomGradIdx = useMemo(() => Math.floor(Math.random() * grads.length), [])
  return (
    <div className={classNames('w-[82px] h-[82px] flex items-center justify-center', grads[randomGradIdx])}>
      <ManAvatar />
    </div>
  )
}

export default Avatar
