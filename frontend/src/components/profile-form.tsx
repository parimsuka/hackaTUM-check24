import ReactDOM from "react-dom";
import Image from "next/image";
import manAvatarSvg from "../assets/man-avatar.svg"
import {useEffect, useState} from "react";

export default function ProfileForm(props:{x:number,y:number,offsetX:number}){
    const [user,setUser] = useState({
        name:"Omar",
        last:"Ashour"
    });
    return(
        ReactDOM.createPortal(
            <div style={{left:props.x+props.offsetX, top:props.y}} className={`bg-view-main absolute z-[999999]`}>
                <div className="w-[324px] h-[382px] border-[1px] border-[#B4B4B4] rounded-2xl">
                    <div className="grid gap-5">
                        <div className="flex space-x-5">
                            <Image alt={"user"} src={manAvatarSvg}/>
                            <h1>name</h1>
                        </div>
                        <input onInput={(e) => {setUser({...user, name: (e.target as any).value})}} value={user.name} type={"input"}/>
                        <input onInput={(e) => {setUser({...user, last: (e.target as any).value})}} value={user.last} type={"input"}/>
                        <input onClick={() => {
                        }} type={"button"} className="bg-button-main text-white" value={"Submit"}/>
                    </div>
                </div>
            </div> ,
            document.getElementById('portal')!
        )
        )
}