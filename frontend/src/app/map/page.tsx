"use client"
import  "@/../maps.css";
import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Navbar from "@/components/NavBar";
import "@/../marker.css"
import {object} from "prop-types";
export default function ShowExpertsMap(){
    const [markers, setMarkers] = useState([
        {
            id:"0",
            name:"garching",
            ranking:5,
            description:"This is a very good place in garching",
            lng:11.6534301,
            lat:48.2525859
        },
        {
            id:"1",
            name:"Ramersdorf-Perlach",
            description:"Best place in germany",
            lng:11.6138229,
            ranking:7,
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
            let popup = new maptilersdk.Popup({ offset: 30 })
                .setHTML(`<h1 style="font-weight: bold">${value.name}</h1>  <p> ${value.description} </p>`)
            // popup.on("open", () =>{
            //     console.log(5)
            // })
            let ma = new maptilersdk.Marker({className:"marker"})
                .setLngLat([value.lng,value.lat])
                .setPopup(popup)
                .addTo(map.current as maptilersdk.Map)
                ma.addClassName(value.id)
            let oldMin = 1
            let oldMax = 10
            let newMin = 2
            let newMax = 5
            let newValue = (((value.ranking - oldMin)* (newMax - newMin)) / (oldMax - oldMin));
            let makerElement =  document.getElementsByClassName(`${value.id}`);

            for (let i = 0; i < makerElement.length; i++ ) {
                console.log(newValue)
                makerElement[i].setAttribute("style", `width:${newValue}rem;height:${newValue}rem`)
            }

            ma.getElement().innerHTML = `<span style="z-index: 9999;color: white">${value.ranking}</span>`

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