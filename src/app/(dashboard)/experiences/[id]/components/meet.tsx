"use client";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface WhereToMeetProps {
  meetingPoint: string;
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const WhereToMeet: React.FC<WhereToMeetProps> = ({
  meetingPoint,
  lat,
  lng,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const center = {
    lat,
    lng,
  };
  return (
    <div className="flex flex-col gap-3 flex-wrap">
      <div className="flex w-full  items-center gap-4 mb-3">
        <div className="text-[18px] text-[#000000B2] w-1/5">Meeting Point</div>

        <div className="bg-[#0D2E610D] w-4/5 text-center rounded-full py-2 px-6 font-bold text-[#3D3D3D] text-[18px]">
          {meetingPoint}
        </div>
      </div>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      )}
    </div>
  );
};

export default WhereToMeet;
