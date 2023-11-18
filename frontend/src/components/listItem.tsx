import RankingIcon from '@/assets/ranking.svg'
import Image from "next/image";
import Avatar from "@/components/avatar";

export default function ListItem(props: {
  name: string,
  ranking: number,
}) {
  const ranking = (props.ranking).toPrecision(2)
  return (
    <li className="flex gap-9 p-4 hover:transition-all hover:rounded-2xl hover:bg-background">
      <div>
        <Avatar />
      </div>
      <div className="grid grow">
        <div className='flex justify-between'>
          <span>{props.name}</span>
          <div className='text-button-main font-bold text-xl'>
            {ranking}
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex gap-6 items-center">
            <RankingIcon />
            <span>Ranking: {ranking}</span>
          </div>
        </div>
      </div>
    </li>
  )
}
