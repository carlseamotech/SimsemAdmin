"use client";

interface WhereToMeetProps {
  meetingPoint: string;
}

const WhereToMeet: React.FC<WhereToMeetProps> = ({ meetingPoint }) => {
  return (
    <div className="flex flex-col gap-3 flex-wrap">
      <div className="flex w-full  items-center gap-4 mb-3">
        <div className="text-[18px] text-[#000000B2] w-1/5">Meeting Point</div>

        <div className="bg-[#0D2E610D] w-4/5 text-center rounded-full py-2 px-6 font-bold text-[#3D3D3D] text-[18px]">
          {meetingPoint}
        </div>
      </div>
    </div>
  );
};

export default WhereToMeet;
