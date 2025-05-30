'use client'
import LocationInput from "@/components/location-input";
import GeoLocation from '@/assets/geo-location.svg'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import useSWR from "swr";
import {Craftsman} from "@/types/utils";
import {getCraftsmen} from "@/http/requests";
import SingleSelect from "@/components/single-select";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FindBest = () => {
  const [postalCode, setPostalCode] = useState('')
  const router = useRouter()

  const { data, error, mutate, isLoading  } = useSWR('api/get-postcodes', fetcher);

  const onSendPostalCode = async () => {
    router.push(`/search?postalCode=${postalCode}`)
  }

  const postalCodes: string[] = data?.data ?? [];

  return (
    <div className={'pl-20 pt-6 flex flex-col justify-center h-full gap-10'}>
      <div className={'flex gap-3 flex-col'}>
        <h3 className={'font-bold text-4xl'}>Find</h3>
        <h5 className={'font-bold text-6xl'}>Best Artisans now</h5>
      </div>
      <SingleSelect
        onChange={post => setPostalCode(post.value)}
        options={postalCodes.map(i => ({ label: `Artisan code ${i}`, value: i  }))}
        label={"Select Postal Code"}
      />
      {/*<LocationInput*/}
      {/*  value={postalCode}*/}
      {/*  className={['bg-gray-400', 'text-text-main', 'placeholder:text-text-main']}*/}
      {/*  setValue={post => setPostalCode(post)}*/}
      {/*  placeholder={'Enter your post index'}*/}
      {/*  leftIcon={<GeoLocation className={''} />}*/}
      {/*/>*/}
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
