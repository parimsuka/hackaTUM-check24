"use client"
import  "@/../maps.css";
import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
export default function ShowExpertsMap(){
    const mapContainer = useRef<HTMLDivElement |null>(null);
    const map = useRef<maptilersdk.Map | null>(null);
    const tokyo = { lng: 139.753, lat: 35.6844 };
    const [zoom] = useState(14);
    maptilersdk.config.apiKey = `${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
    useEffect(() => {
        if (map.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current ?? '',
            style: maptilersdk.MapStyle.STREETS,
            center: [tokyo.lng, tokyo.lat],
            zoom: zoom
        });

    }, [tokyo.lng, tokyo.lat, zoom]);
    return(
            <div className="bg-view-main h-full w-full">
                <div className="w-full h-full">
                    <div className="map-wrap">
                        <div ref={mapContainer} className="map" />
                    </div>
                </div>
            </div>
         );


}