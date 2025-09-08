import FormInputLogin from "@/Comp/Commons/FormInputLogin";
import Image from "next/image";

const Login = () => {
  return (
    <div
      className={`w-full h-screen flex items-center justify-center bg-[#e4e4e4]`}
    >
      <div
        className={`w-[850px] h-[500px] flex justify-center items-center rounded-2xl shadow-md`}
      >
        <div className={`w-1/2 h-full p-10 bg-white rounded-l-3xl`}>
          <div className={`relative w-full h-full`}>
            <Image src={`/images/login.jpg`} alt={`register-image`} fill />
          </div>
        </div>

        <div
          className={`w-1/2 h-full rounded-r-3xl bg-white flex justify-center items-center p-7`}
        >
          <FormInputLogin
            title={`Login to Dashboard`}
            subTitle={`Belum memiliki akun?`}
            linkPage={`Buat Sekarang`}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
