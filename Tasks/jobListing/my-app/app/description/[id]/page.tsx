import path, { parse } from "path";
import { promises as fs } from "fs";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { FiPlusCircle, FiFile, FiMapPin, FiCalendar } from "react-icons/fi";

interface Job {
  id: number;
  title: string;
  description: string;
  responsibilities: string;
  requirments: string;
  idealCandidate: string[];
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
  datePosted: string;
}

interface props {
  params: {
    id: string;
  };
}

const Description = async ({ params }: props) => {
  const { id } = params;
  const res = await fetch(
    "https://akil-backend.onrender.com/opportunities/search"
  );
  const jsonRes = await res.json();
  const jobs: Job[] = jsonRes.data;
  const newId = parseInt(id);

  const job = jobs[newId];
  return (
    <>
      <div className="flex flex-row gap-10 px-8 py-6 max-w-7xl mx-auto">
        <div
          className="flex-1 space-y-6 mb-2"
          style={{ color: "rgb(37, 50, 75)" }}
        >
          <div>
            <img src={job.image}></img>
            <p className="font-bold text-2xl mb-2 ">Description</p>
            <p>{job.description}</p>
          </div>

          <div>
            <p className="font-bold text-2xl mb-2">Resposibilities</p>
            <ul className="space-y-2">
              {job.responsibilities.split("\n").map((resp, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-600 mt-1 size-5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-2xl mb-2">Ideal Candidate we want</p>
            <ul className="list-disc list-inside">
              <p>{job.idealCandidate}</p>
            </ul>
          </div>
          <div>
            <p className="font-bold text-2xl">When & Where</p>
            <div className="flex items-center gap-2">
              <div className="border border-gray-300 rounded-full p-2">
                <FiMapPin className="text-blue-500 font-extrabold size-5" />
              </div>
              <span>{job.whenAndWhere}</span>
            </div>
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
              <div className="border border-gray-300 rounded-full p-2">
                <FiPlusCircle className="text-blue-500 size-5" />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500">Posted on</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.datePosted}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="border border-gray-300 rounded-full p-2">
                <FiFile className="text-blue-500 size-5 " />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500">Deadline</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.endDate}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="border border-gray-300 rounded-full p-2">
                <FiMapPin className="text-blue-500 size-5 " />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500">Location</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.location}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="border border-gray-300 rounded-full p-2">
                <FiCalendar className="text-blue-500 size-5" />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500">Start Date</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.startDate}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="border border-gray-300 rounded-full p-2">
                <FiCalendar className="text-blue-500 size-5" />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500">End Date</div>
                <div
                  className="font-semibold"
                  style={{ color: "rgb(37, 50, 75)" }}
                >
                  {job.endDate}
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
            {job.categories.map((category, idx) => (
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
            {job.requiredSkills.map((req, idx) => (
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
