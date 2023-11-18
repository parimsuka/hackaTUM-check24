"use client";
import ListItem from "@/components/listItem";
import listIcon from '@/assets/ListView.svg'
import Image from "next/image";
import mapIcon from '@/assets/MapView.svg';
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/NavBar";

export default function Home() {
    const craftmen = [
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
    ];
    return (
        <div className="flex bg-view-main min-h-full w-full">
            <div className="px-16 py-28 w-full">
              <Navbar greetings="Hello citizen, from Rosenheim" message="Meet local expertise"/>
                <div className="pl-8 mt-16">
                    <ul className="grid gap-y-20">
                        {craftmen.map((value, index) => {
                            return (
                                <ListItem
                                    name={value.name}
                                    address={value.address}
                                    key={index}
                                    ranking={value.ranking}
                                />
                            )
                        })}
                    </ul>
                </div>
                <div style={{textAlignLast: "center"}} className="mt-[5.8rem]">
                    <button
                        className="bg-button-secondary  text-button-text rounded-[12px] w-[22.625rem] h-[4.5rem]">
                        Load More
                    </button>
                </div>
            </div>
        </div>
    )
}

