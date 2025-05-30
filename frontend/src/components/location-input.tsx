import {ReactNode} from "react";
import classNames from "classnames";

const LocationInput = ({className, placeholder, leftIcon, value, setValue, onFocus, onBlur}: {
  className?: string[],
  placeholder?: string,
  leftIcon: ReactNode,
  value: string,
  setValue: (s: string) => void,
  onFocus?: () => void,
  onBlur?: () => void,
}) => {
  const paddingLeftInput = leftIcon ? 'pl-16' : 'pl-5';
  return (
    <div className={'relative'}>
      {leftIcon && <div className={'absolute left-4 top-1/4'}>{leftIcon} </div>}
      <input
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        maxLength={5}
        className={classNames(
          'h-16 font-normal max-w-3xl outline-0 focus:outline-0 focus-visible:outline-none ' +
          'rounded-xl text-xl placeholder:font-normal min-w-[332px]',
          className?.join(' '),
          paddingLeftInput,
        )}/>
    </div>
  )
}

export default LocationInput
