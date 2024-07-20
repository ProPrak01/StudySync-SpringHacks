import MeetingLinksTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  const now = new Date();
  const time =
    now.toLocaleTimeString().split(":").slice(0, 2).join(":") +
    " " +
    now.toLocaleTimeString().split(" ")[1];
  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const num_dates = now.toLocaleDateString().split("/");
  const date =
    weeks[now.getDay()] +
    ", " +
    months[now.getMonth()] +
    " " +
    num_dates[0] +
    ", " +
    num_dates[2];
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcomming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingLinksTypeList />
    </section>
  );
};
export default Home;
