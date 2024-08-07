"use client";
import React from "react";

import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });
  return (
    <div className="h-full w-full rounded-md pb-10">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: 37.29861068725586, lng: -107.8475112915039 }}
          zoom={17}
        >
          <MarkerF
            position={{ lat: 37.29861068725586, lng: -107.8475112915039 }}
          />
          <div className="flex justify-between">
            <InfoWindowF
              position={{ lat: 37.29861068725586, lng: -107.8475112915039 }}
              zIndex={1}
              options={{ pixelOffset: new google.maps.Size(0, -40) }}
            >
              <div className="flex flex-col items-center justify-between">
                <h3 className="font-semibold text-lg">Lashes by Jermane</h3>
                <p>1539 Florida rd. #110, Durango, CO</p>
              </div>
            </InfoWindowF>
          </div>
        </GoogleMap>
      )}
    </div>
  );
};

export default Maps;
