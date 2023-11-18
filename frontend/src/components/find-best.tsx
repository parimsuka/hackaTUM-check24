'use client'
import LocationInput from "@/components/location-input";
import geoLocation from '@/assets/geo-location.svg'
import Image from "next/image";
import {useState} from "react";

const FindBest = () => {
  const GeoLocation = () => <Image src={geoLocation} alt={'location'}/>
  const [postalCode, setPostalCode] = useState('')
  return (
    <div className={'pl-20 pt-6 flex flex-col justify-center h-full gap-10'}>
      <div className={'flex gap-3 flex-col'}>
        <h3 className={'font-bold text-4xl'}>Find</h3>
        <h5 className={'font-bold text-6xl'}>Best Artisans</h5>
      </div>
      <LocationInput
        value={postalCode}
        setValue={post => setPostalCode(post)}
        placeholder={'Enter your post index'}
        leftIcon={<GeoLocation/>}
      />
      <button
        className={'gap-5 bg-button-main w-1/3 h-[4rem] rounded-2xl text-white font-bold text-xl'}
        onClick={() => fetch(`api/set-postal-code?postalCode=${postalCode}`)}
      >
        Submit
      </button>
    </div>
  );
};

export default FindBest;
