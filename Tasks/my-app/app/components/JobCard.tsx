import path from "path";
import { promises as fs } from "fs";
import React from "react";
import Link from "next/link";

interface Job {
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: {
    age: string;
    gender: string;
    traits: string[];
  };
  when_where: string;
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[];
  };
  company: string;
  image: string;
}

const JobCard = async () => {
  const filePath = path.join(process.cwd(), "public", "Jobs.json");
  const jsonData = await fs.readFile(filePath, "utf-8");

  const jobs: Job[] = await JSON.parse(jsonData);
  // console.log("jobs:", jobs);

  return (
    <>
      <div className="flex flex-col items-center justify-center" style = {{ color: "rgb(37, 50, 75)" }}>
        {jobs.map((job, index) => (
          <Link href={`/description/${index}`} key={index}>
            <div
              key={index}
              className="p-5 w-[850px] h-[300px] m-10 border border-gray-300 rounded-[15px] bg-white"
            >
              <div className="flex items-center space-x-10 py-2">
                <img src="/jobpic.jpg" />
                <div>
                  <div className="text-1xl font-semibold ">{job.title}</div>
                  <div className="text-gray-500 text-sm">
                    {job.company} . {job.about.location}
                  </div>
                </div>
              </div>
              <div className="pr-5 pt-3 text-md">{job.description}</div>
              <div className="flex space-x-5 pt-3 ">
                <span className="rouded-md border-b-fuchsia-400">
                  {job.about.categories[0]}
                </span>
                <span className="rouded-md">
                  {job.about.required_skills[0]}
                </span>
                <span className="rouded-md">
                  {job.about.required_skills[1]}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default JobCard;
