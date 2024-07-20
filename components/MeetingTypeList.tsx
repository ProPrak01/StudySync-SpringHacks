"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
const MeetingLinksTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const router = useRouter();
  const createMeeting = () => {};
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
