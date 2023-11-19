import RankingIcon from '@/assets/ranking.svg'
import Avatar from "@/components/avatar";
import {CSSProperties, useContext} from "react";
import {Craftsman} from "@/types/utils";

export default function ListItem({ index, style, data  }: { index: number, style: CSSProperties, data: Craftsman }) {
  const ranking = (data.rankingScore).toPrecision(2)
  return (
    <li className="flex gap-9 p-4 hover:transition-all hover:rounded-2xl hover:bg-background" style={style}>
      <div>
        <Avatar />
      </div>
      <div className="grid grow">
        <div className='flex justify-between'>
          <span className={'font-medium text-xl text-text-main'}>{data.name}</span>
          <div className='text-button-main font-bold text-xl'>
            {ranking}
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex gap-6 items-center">
            <RankingIcon />
            <span className={'text-text-main'}>Ranking: {ranking}</span>
          </div>
        </div>
      </div>
    </li>
  )
}
