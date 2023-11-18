import {ReactNode} from "react";
import classNames from "classnames";

const LocationInput = ({className, placeholder, leftIcon, value, setValue}: {
  className?: string[],
  placeholder?: string,
  leftIcon: ReactNode,
  value: string,
  setValue: (s: string) => void
}) => {
  const paddingLeftInput = leftIcon ? 'px-16' : 'px-5'
  return (
    <div className={'relative'}>
      {leftIcon && <div className={'absolute left-4 top-1/4'}>{leftIcon} </div>}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        maxLength={5}
        className={classNames(
          'h-16 font-normal max-w-3xl outline-0 focus:outline-0 focus-visible:outline-none ' +
          'rounded-xl text-xl placeholder:font-normal',
          className?.join(' '),
          paddingLeftInput,
        )}/>
    </div>
  )
}

export default LocationInput
