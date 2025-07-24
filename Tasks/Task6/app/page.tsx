import Image from "next/image";
import Link from "next/link";
import JobCard from "./components/JobCard";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="bg-white p-0 m-0">
      <Header/>
      <JobCard/>
    </main>
  )
}
