import Image from "next/image";
import artisan from '@/assets/artisan.jpg'
import check24 from '@/assets/check-24.png'
import FindBest from "@/components/find-best";

export default function Home() {
  return (
    <main className='flex h-[100vh]'>
      <section className='basis-1/3'>
        <Image src={check24} alt={'check-24 logo'} height={33} width={134}/>
        <ul>
          <li>Address</li>
          <li>Search</li>
        </ul>
        <p>Made with code</p>
      </section>
      <section className='basis-2/6'>
        <div className='h-full'>
          <Image
            src={artisan}
            alt={'artisan working'}
            className={'object-cover h-full object-[78%]'}
          />
        </div>
      </section>
      <section className='basis-2/3'>
        <FindBest />
      </section>
    </main>
  )
}
