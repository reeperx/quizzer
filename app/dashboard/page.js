import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

export default function Home() {
  return (
    <div className="my-20">
      <h2 className="font-bold text-3xl text-primary">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and Start your AI Mockup Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        <AddNewInterview />
      </div>
      {/* Previous Interview List  */}
      <InterviewList />
    </div>
  );
}
