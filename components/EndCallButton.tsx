import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import react from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;
  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.push("/");
      }}
      className="bg-red-500 hover:bg-red-600  text-white text-lg font-semibold py-2 rounded-2xl transition-colors duration-150 ease-in-out"
    >
      End Call
    </Button>
  );
};

export default EndCallButton;
