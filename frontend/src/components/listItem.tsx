import rankingIcon from '@/assets/ranking.svg'
import Image from "next/image";
import locationIcon from '@/assets/location.svg';

export default function ListItem(props: {
  name: string,
  ranking: number,
  address: string,
}) {
  return (
    <li className="flex gap-9 p-[2rem] hover:transition-all hover:rounded-2xl hover:bg-background">
      <div>
        <div className="bg-black w-[3.9rem] h-[4.5rem]">
        </div>
      </div>
      <div className="grid grow">
        <div className='flex justify-between'>
          <span>{props.name}</span>
          <div className='text-button-main font-bold text-xl'>
            {props.ranking / 100}
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex gap-6 items-center">
            <Image src={rankingIcon} alt={"ranking"}/>
            <span>Ranking: {props.ranking}</span>
          </div>
          <div className="flex gap-6 items-center">
            <Image src={locationIcon} alt={"location"}/>
            <span>Address: {props.address}</span>
          </div>
        </div>
      </div>
    </li>
  )
}
