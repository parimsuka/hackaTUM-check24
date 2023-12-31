import Image from "next/image";
import artisan from '@/assets/artisan.png'
import FindBest from "@/components/find-best";

export default function Home() {
  return (
    <div className='flex h-[100vh]'>
      <section className='basis-2/5'>
        <div className='h-full'>
          <Image
            src={artisan}
            alt={'artisan working'}
            className={'object-cover h-full object-[78%]'}
          />
        </div>
      </section>
      <section className='basis-3/5 bg-view-main'>
        <FindBest />
      </section>
    </div>
  )
}
