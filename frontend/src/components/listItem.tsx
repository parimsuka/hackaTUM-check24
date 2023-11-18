
import rankingIcon from '../assets/ranking.svg'
import Image from "next/image";
import locationIcon from '../assets/ranking.svg';
export default function Listitem(props: {
    name:string,
    ranking:number,
    address:string,
}){
    return (
        <li>
            <div className="flex">
                <div>
                    <div className="bg-black w-[3.9rem] h-[3.9rem]">
                    </div>
                </div>
                <div className="ml-[2.75rem] grid">
                    <div>
                        {props.name}
                    </div>
                    <div className="flex">
                        <div className="flex">
                            <Image src={rankingIcon} alt={"ranking"}/>
                            <span  className="ml-7">Ranking: {props.ranking}</span>
                        </div>
                       <div className="flex ml-7">
                           <Image src={locationIcon} alt={"location"}/>
                           <span className="ml-7">Address: {props.address}</span>
                       </div>
                    </div>
                </div>
                <div className="ml-6">
                    {props.ranking/10}
                </div>
            </div>
        </li>
    )
}