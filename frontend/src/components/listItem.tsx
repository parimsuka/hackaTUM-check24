import RankingIcon from '@/assets/ranking.svg'
import EditIcon from '@/assets/edit.svg'
import Avatar from "@/components/avatar";
import {CSSProperties, useContext, useState} from "react";
import {Craftsman} from "@/types/utils";
import ProfileForm from "@/components/profile-form";

export default function ListItem({ index, style, data  }: { index: number, style: CSSProperties, data: Craftsman }) {
    const ranking = (data.rankingScore).toPrecision(2)
    const [editMode,setEditMode] = useState({
        mode:false,
        x:0,
        y:40
    })
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
          <div className="flex">
              <div className="flex gap-6 items-center">
                  <div className="flex gap-4 items-center">
                      <RankingIcon />
                      <span>Ranking: {ranking}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                      {editMode.mode && <ProfileForm offsetX={80} x={editMode.x} y={editMode.y} />}
                     <span className="cursor-pointer" onClick={(e) =>{
                         setEditMode({mode:!editMode.mode,x:e.screenX,y:editMode.y});
                     }
                     }><EditIcon/></span>
                      <span>Edit</span>
                  </div>
              </div>
        </div>
      </div>
    </li>
  )
}
