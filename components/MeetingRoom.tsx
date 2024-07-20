import {
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import react, { useState } from "react";
import { cn } from "@/lib/utils";
type CallLayout = "speaker-left" | "speaker-right" | "grid";
const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayout>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;

      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;

      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh - 86px )] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
