import React from 'react';
import '@/../navbar.css';
import Link from "next/link";
import Image from "next/image";
import listIcon from "@/assets/ListView.svg";
import mapIcon from "@/assets/MapView.svg";

export default function NavBar(props:{
    greetings:string,
    message:string
}){
    return (
        <div className="flex place-content-between">
            <div>
                <h3 className="font-semibold mb-4">
                    {props.greetings}
                </h3>
                <h5 className="font-bold text-2xl">
                    {props.message}
                </h5>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Link href={"/search"}>
                    <div className=" w-[40px] h-[40px] flex  bg-text-secondary">
                        <Image className="m-auto" alt={"List Icon"} src={listIcon}/>
                    </div>
                </Link>

                <Link href={"/map"}>
                    <div className="cursor-pointer bg-button-main flex w-[40px] h-[40px]">

                        <Image className="m-auto" alt={"Map Icon"} src={mapIcon}/>
                    </div>
                </Link>
            </div>

        </div>
    );
}