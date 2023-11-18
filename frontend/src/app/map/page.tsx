"use client"
import  "@/../maps.css";
import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Navbar from "@/components/NavBar";
export default function ShowExpertsMap(){
    const [markers, setMarkers] = useState([
        {
            id:"0",
            name:"garching",
            lng:11.6534301,
            lat:48.2525859
        },
        {
            id:"1",
            name:"Ramersdorf-Perlach",
            lng:11.6138229,
            lat:48.0974410
        }
    ]);
    const mapContainer = useRef<HTMLDivElement |null>(null);
    const map = useRef<maptilersdk.Map|null>(null);
    const munich = { lng: 11.576124, lat: 48.137154};
    const [zoom] = useState(14);
    maptilersdk.config.apiKey = `${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
    useEffect(() => {
        if (map.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current ?? '',
            style: "dataviz",
            center: [munich.lng, munich.lat],
            zoom: zoom
        });
        markers.map((value,index) => {
            new maptilersdk.Marker({color: "#013474"})
                .setLngLat([value.lng,value.lat])
                .addTo(map.current as maptilersdk.Map);
        })

    }, [munich.lng, munich.lat, zoom]);
    return(
            <div className="bg-view-main">
                <div className="pl-[4rem] pt-[2rem] w-full h-full">
                    <Navbar greetings="Hello citizen" message="Meet local expertise in Maps"/>
                </div>
                <div className="map-wrap rounded-2xl p-[4rem]">
                    <div ref={mapContainer} className="map" />
                </div>
            </div>
         );


}