'use client'
import LocationInput from "@/components/location-input";
import GeoLocation from '@/assets/geo-location.svg'
import {useState} from "react";
import {sendPostalCode} from "@/http/requests";
import {useRouter} from "next/navigation";

const FindBest = () => {
  const [postalCode, setPostalCode] = useState('')
  const router = useRouter()

  const onSendPostalCode = async () => {
    await sendPostalCode(postalCode)
    router.push('/search')
  }

  return (
    <div className={'pl-20 pt-6 flex flex-col justify-center h-full gap-10'}>
      <div className={'flex gap-3 flex-col'}>
        <h3 className={'font-bold text-4xl'}>Find</h3>
        <h5 className={'font-bold text-6xl'}>Best Artisans now</h5>
      </div>
      <LocationInput
        value={postalCode}
        className={['bg-gray-400', 'text-text-main', 'placeholder:text-text-main']}
        setValue={post => setPostalCode(post)}
        placeholder={'Enter your post index'}
        leftIcon={<GeoLocation className={''} />}
      />
      <button
        className={'gap-5 bg-button-main w-1/3 h-[4rem] rounded-2xl text-white font-bold text-xl'}
        onClick={onSendPostalCode}
      >
        Submit
      </button>
    </div>
  );
};

export default FindBest;
