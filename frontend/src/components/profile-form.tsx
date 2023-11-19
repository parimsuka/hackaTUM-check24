import ReactDOM from "react-dom";
import {useEffect, useState} from "react";
import Avatar from "@/components/avatar";

export default function ProfileForm(props:{x:number,y:number,offsetX:number}){
    const [user,setUser] = useState({
        name:"Omar",
        last:"Ashour",
        lastone:"helo"
    });
    return(
        ReactDOM.createPortal(
            <div style={{left:props.x+props.offsetX, top:props.y}} className={`bg-view-main absolute z-[999999]`}>
                <div className="w-[324px] h-[382px] border-[1px] border-[#B4B4B4] rounded-2xl">
                    <div className="p-[3rem] grid">
                        <div className="flex flex-col gap-[3rem]">
                        <div className="flex justify-evenly">
                            <Avatar/>
                            <div>
                                <h3 className="font-bold">{user.name}</h3>
                                <h3 className="font-bold">{user.last}</h3>
                            </div>
                        </div>
                        <div className="grid w-full gap-[2rem]">
                        <input onInput={(e) => {setUser({...user, name: (e.target as any).value})}} value={user.name} type={"input"}/>
                            <input onInput={(e) => {setUser({...user, lastone: (e.target as any).value})}} value={user.lastone} type={"input"}/>
                            <input onInput={(e) => {setUser({...user, last: (e.target as any).value})}} value={user.last} type={"input"}/>
                        <input onClick={() => {
                        }} type={"button"} className="bg-button-main text-white" value={"Submit"}/>
                        </div>
                        </div>
                    </div>
                </div>
            </div> ,
            document.getElementById('portal')!
        )
        )
}