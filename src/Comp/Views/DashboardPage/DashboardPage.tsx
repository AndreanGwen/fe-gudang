import Sidebar from "@/Comp/Commons/Sidebar";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const DashboardPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
  }, [router]);

  return (
    <div className={`w-full min-h-screen bg-[#ebebeb] flex`}>
      <Sidebar></Sidebar>

      <div className={`w-full pr-7 pl-7`}>
        <div className={`pt-7 w-full flex justify-between`}>
          <div
            className={`w-[70%] h-20 bg-white rounded-3xl flex items-center p-5 shadow-md justify-between`}
          >
            <h1 className={`text-2xl font-bold`}>Overview</h1>
            <div
              className={`bg-[#ebebeb] p-2 rounded-full flex items-center justify-center cursor-pointer`}
            >
              <IoSearch size={27} />
            </div>
          </div>

          <div
            className={`w-[28%] h-20 bg-white rounded-3xl shadow-md flex items-center justify-between p-5`}
          >
            <div className={`flex items-center gap-3`}>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className={`flex flex-col`}>
                <h1 className={`font-bold`}>{username}</h1>

                <div className={`flex items-center gap-1`}>
                  <FaRegUser size={14} />
                  <p className={`font-sm`}>Member</p>
                </div>
              </div>
            </div>

            <CgLogOut
              size={27}
              color="red"
              className={`cursor-pointer`}
              onClick={() => {
                router.push(`/auth/login`);
                localStorage.removeItem("token");
                localStorage.removeItem("username");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
