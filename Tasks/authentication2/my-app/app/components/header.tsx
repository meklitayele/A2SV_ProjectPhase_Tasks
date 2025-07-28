import React from 'react'
import { auth , signIn , signOut} from '../auth'; 
import Link from 'next/link';
import Image from 'next/image';

type Props = {}; // Define Props type, add properties as needed

const header = async (props : Props) => {
  const session = await auth();
  return (
    <>
      <div className="bg-white font-bold flex flex-row items-center pl-200">
        <p className="text-blue-950">
          Welcome , {session?.user?.name ?? "Guest"}
        </p>
        <div className="m-4">
          <Link href="/api/auth/signin">
            <button className="bg-blue-950 text-white border rounded-3xl border-r-2 pl-[20px] pr-[20px] pt-[5px] pb-[5px]">
              Login
            </button>
          </Link>
        </div>
        <div className="m-4">
          <Link href = 'api/auth/signout'>
            <button className="bg-white b text-blue-950 border rounded-3xl  border-r-2 pl-[20px] pr-[20px] pt-[5px] pb-[5px]">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default header