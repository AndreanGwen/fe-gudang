import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSolidCategory } from "react-icons/bi";
import { FaBox } from "react-icons/fa";
import { TbHomeFilled } from "react-icons/tb";

const Sidebar = () => {
  const router = useRouter();

  console.log(router.asPath);

  return (
    <div className={`w-1/5 min-h-screen bg-white p-5`}>
      <div className={`flex items-center gap-3`}>
        <Image
          src={`/images/dashboard-logo.png`}
          alt={`dashboard-logo`}
          width={44}
          height={44}
        ></Image>
        <h1 className={`text-[23px] font-bold`}>Dashboard</h1>
      </div>

      <div className={`pt-7 text-black/70 font-semibold`}>
        <p>Main Home</p>
      </div>

      <div className={`pt-3 pl-3 flex flex-col gap-2`}>
        <Link href={`/dashboard`}>
          <div
            className={`flex items-center gap-2 w-full h-fit p-3  ${
              router.asPath == "/dashboard" ? "bg-[#ebeff8]" : "bg-transparent"
            } cursor-pointer rounded-md`}
          >
            <TbHomeFilled
              size={20}
              color={`${
                router.asPath == "/dashboard" ? "#0c48cc" : "#000000"
              } `}
            />
            <h1
              className={`${
                router.asPath == "/dashboard"
                  ? "text-[#0a49ce]"
                  : "bg-transparent"
              } font-semibold`}
            >
              Overview
            </h1>
          </div>
        </Link>

        <Link href={`/products`}>
          <div
            className={`flex items-center gap-2 w-full h-fit p-3  ${
              router.asPath == "/products" ? "bg-[#ebeff8]" : "bg-transparent"
            } cursor-pointer rounded-md`}
          >
            <FaBox
              size={20}
              color={`${router.asPath == "/products" ? "#0c48cc" : "#000000"}`}
            />
            <h1
              className={` ${
                router.asPath == "/products"
                  ? "text-[#0a49ce]"
                  : "bg-transparent"
              } font-semibold`}
            >
              Products
            </h1>
          </div>
        </Link>

        <Link href={`/transaction`}>
          <div
            className={`flex items-center gap-2 w-full h-fit p-3  ${
              router.asPath == "/transaction"
                ? "bg-[#ebeff8]"
                : "bg-transparent"
            } cursor-pointer rounded-md`}
          >
            <BiSolidCategory
              size={22}
              color={`${
                router.asPath == "/transaction" ? "#0c48cc" : "#000000"
              }`}
            />
            <h1
              className={` ${
                router.asPath == "/transaction"
                  ? "text-[#0a49ce]"
                  : "bg-transparent"
              } font-semibold`}
            >
              Transaction
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
