import path, { parse } from "path";
import { promises as fs } from "fs";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md"; 
import { FiPlusCircle, FiFile, FiMapPin, FiCalendar } from "react-icons/fi";



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
interface props {
  params: {
    id: string;
  };
}

const Description = async ({params} : props) => {
  const { id } = params
  const filePath = path.join(process.cwd(), "public", "Jobs.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const jobs: Job[] = await JSON.parse(jsonData);
  const newId = parseInt(id)

  const job = jobs[newId]
  return (
    <>
      <div className="flex flex-row gap-10 px-8 py-6 max-w-7xl mx-auto">
        <div
          className="flex-1 space-y-6 mb-2"
          style={{ color: "rgb(37, 50, 75)" }}
        >
          <div>
            <p className="font-bold text-2xl mb-2 ">Description</p>
            <p>{job.description}</p>
          </div>

          <div>
            <p className="font-bold text-2xl mb-2">Resposibilities</p>
            <ul className="list-disc list-inside space-y-1">
              {job.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-600 mt-1" />
                  <p>{resp}</p>
                </div>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-2xl mb-2">Ideal Candidate we want</p>
            <ul className="list-disc list-inside">
              {job.ideal_candidate.traits.map((trait, idx) => (
                <li key={idx}>{trait}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-2xl">When & Where</p>
            <p>
              <FiMapPin className="text-blue-600" />
              <span>{job.when_where}</span>
            </p>
          </div>
        </div>

        <div className="w-[300px] space-y-6">
          <p
            className="font-bold text-lg mb-2 "
            style={{ color: "rgb(37, 50, 75)" }}
          >
            About
          </p>
          <ul className="space-y-1 text-sm">
            <div className="flex flex-row items-center space-x-2">
              <FiPlusCircle className="text-blue-500 text-3xl  p-2 rounded-full border border-b-gray-300" />
              <div className="flex flex-col">
                <div className="text-gray-500">Posted on</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.about.posted_on}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <FiFile className="text-blue-500 text-3xl rounded-full  p-2  border border-b-gray-300" />
              <div className="flex flex-col">
                <div className="text-gray-500">Deadline</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.about.deadline}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <FiMapPin className="text-blue-500 text-3xl rounded-full  p-2  border border-b-gray-300" />
              <div className="flex flex-col">
                <div className="text-gray-500">Location</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.about.location}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <FiCalendar className="text-blue-500 text-3xl rounded-full  p-2  border border-b-gray-300" />
              <div className="flex flex-col">
                <div className="text-gray-500">Start Date</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.about.start_date}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <FiCalendar className="text-blue-500 text-3xl rounded-full p-2  border border-b-gray-200" />
              <div className="flex flex-col">
                <div className="text-gray-500">End Date</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.about.end_date}
                </div>
              </div>
            </div>
          </ul>
          <p
            className="font-bold text-lg  mb-2"
            style={{ color: "rgb(37, 50, 75)" }}
          >
            Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {job.about.categories.map((category, idx) => (
              <span
                className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full"
                key={idx}
              >
                {category}
              </span>
            ))}
          </div>
          <p
            className="font-bold text-lg mb-2"
            style={{ color: "rgb(37, 50, 75)" }}
          >
            Required Skills
          </p>
          <div
            className="flex flex-wrap gap-2"
            style={{ color: "rgb(37, 50, 75)" }}
          >
            {job.about.required_skills.map((req, idx) => (
              <div
                className="bg-gray-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full"
                key={idx}
              >
                {req}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
