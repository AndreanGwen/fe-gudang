import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();

  return (
    <div
      className={`w-full h-screen flex items-center justify-center flex-col bg-[#eceef0]`}
    >
      <div className={`w-[600px] h-[500px] relative`}>
        <Image
          src={`/images/register-success.jpg`}
          alt="register-success.jpg"
          fill
          className={"absolute"}
        />
      </div>
      <h1 className={`text-lg pb-1`}>
        Pembuatan akun selesai, terimakasih telah mendaftar!
      </h1>

      <Button
        variant={"default"}
        className="bg-[#3ba9d9] text-black"
        onClick={() => router.push("/auth/login")}
      >
        Back to Login
      </Button>
    </div>
  );
};

export default RegisterSuccess;

//
