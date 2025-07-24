import path from "path";
import { promises as fs } from "fs";
import React from "react";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  description: string;
  responsibilities: string;
  requirments: string;
  ideal_candidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  location: string;
  deadline: string;
  whenAndWhere: string;
  requiredSkills: string[];
  createdBy: string;
  orgID: string;
  postedOn: string;
  status: string;
  company: string;
  image: string;
  orgName: string;
  logoUrl: string;
}

const JobCard = async () => {
  const res = await fetch('https://akil-backend.onrender.com/opportunities/search');
  const jsonRes = await res.json();
  const jobs: Job[] = jsonRes.data;
  console.log("jobs:", jobs);
  
  // const filePath = path.join(process.cwd(), "public", "Jobs.json");
  // const jsonData = await fs.readFile(filePath, "utf-8");

  // const jobs: Job[] = await JSON.parse(jsonData);
  // // console.log("jobs:", jobs);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center"
        style={{ color: "rgb(37, 50, 75)" }}
      >
        {jobs.map((job, index) => (
          <Link href={`/description/${index}`} key={index}>
            <div
              key={index}
              className="p-5 w-[850px] h-[300px] m-10 border border-gray-300 rounded-[15px] bg-white"
            >
              <div className="flex items-center space-x-10 py-2">
                <div>
                  <img src={job.logoUrl} className="h-[60px]" />
                </div>
                
                <div>
                  <div className="text-1xl font-semibold ">{job.title}</div>
                  <div className="text-gray-500 text-sm">
                    {job.company} . {job.whenAndWhere}
                  </div>
                </div>
              </div>
              <div className=" ml-23 pr-5 pt-3 text-md">{job.description}</div>
              <div className=" ml-23 flex space-x-5 pt-3 ">
                <span
                  className="rouded-md border  rounded-3xl pl-[20px] pr-[20px] pt-[5px] pb-[5px] font-semibold"
                  style={{
                    color: "rgb(86, 205, 173)",
                    borderColor: "rgb(86, 205, 173)",
                    backgroundColor: "rgb(239, 250, 247)",
                  }}
                >
                  {job.categories[0]}
                </span>
                <span
                  className="rouded-md border border-black font-semibold rounded-3xl pl-[20px] pr-[20px] pt-[5px] pb-[5px]"
                  style={{
                    color: "rgb(255, 184, 54)",
                    borderColor: "rgb(255, 184, 54)",
                  }}
                >
                  {job.requiredSkills[0]}
                </span>
                {job.requiredSkills[1] && (
                  <span
                    className="rouded-md border border-black font-semibold rounded-3xl pl-[20px] pr-[20px] pt-[5px] pb-[5px]"
                    style={{
                      color: "rgb(45, 41, 142)",
                      borderColor: "rgb(45, 41, 142)",
                    }}
                  >
                    {job.requiredSkills[1]}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default JobCard;
