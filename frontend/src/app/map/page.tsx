"use client"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function ShowExpertsMap(){
    const center = {
        lat: 7.2905715, // default latitude
        lng: 6.6337262, // default longitude
    };
    const libraries :any = ['places'];
    const mapContainerStyle = {
        width: '100vw',
        height: '100vh',
    };
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
        libraries,
    });
    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }
    return(
            <div className="bg-view-main h-full w-full">
                <div className="w-full h-full">
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={10}
                        center={center}
                    >
                        <Marker position={center} />
                    </GoogleMap>
                </div>
            </div>
         );


}