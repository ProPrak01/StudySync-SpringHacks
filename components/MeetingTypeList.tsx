"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingLinksTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "please select  date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Call not created");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || `Study Meet at ${startsAt}`;
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meet has been setup !",
        description:
          "now you can share the link with your friends and Study !!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to setup MEET! error: " + error,
        description: "please try again , but dont stop your study",
      });
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start and instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        color="bg-orange-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        color="bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="check out your recordings"
        handleClick={() => router.push("/recordings")}
        color="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Join a meeting with a code"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        color="bg-yellow-1"
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingLinksTypeList;
