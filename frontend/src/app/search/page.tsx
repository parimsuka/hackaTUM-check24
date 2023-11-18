"use client";
import Navbar from "@/components/navbar";
import {useState} from "react";
import Image from "next/image";
import Listitem from "@/components/listItem";

export default function Home() {
    const [craftmen, setCraftmen] = useState([
        {
            id: "0",
            name: "Omar",
            ranking: 460,
            address: "8320,rosenheim"
        },
        {
            id: "1",
            name: "Ahmed",
            ranking: 212,
            address: "8320, berlin"
        },
        {
            id: "2",
            name: "parim",
            ranking: 300,
            address: "8320,swag"

        }
    ]);
    return (
        <main>
            <div className="flex">
                <Navbar/>
                <div className="ml-[4.563rem] mt-[8.375rem]">
            <span className="font-semibold">
                Hello citizen, from
            </span>
                    <br/>
                    <span className="font-extrabold text-2xl">
              Rosenheim, Kapuzinerweg 4
            </span>
                    <div className="pl-8 mt-16">
                        <ul className="grid gap-y-20">
                            {craftmen.map((value,index) => {
                                 return <Listitem
                                     name={value.name}
                                     address={value.address}
                                     key={index}
                                     ranking={value.ranking}
                                 />
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}

