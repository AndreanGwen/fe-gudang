import FormInput from "@/Comp/Commons/FormInput";
import Image from "next/image";

const Register = () => {
  return (
    <div
      className={`w-full h-screen flex items-center justify-center bg-[#e4e4e4]`}
    >
      <div
        className={`w-[850px] h-[500px] flex justify-center items-center rounded-2xl shadow-md`}
      >
        <div className={`w-1/2 h-full p-10 bg-white rounded-l-3xl`}>
          <div className={`relative w-full h-full`}>
            <Image
              src={`/images/register.jpg`}
              alt={`register-image`}
              fill
              className={``}
            />
          </div>
        </div>

        <div
          className={`w-1/2 h-full rounded-r-3xl bg-white flex justify-center items-center p-7`}
        >
          <FormInput
            title={`Buat Akun Anda`}
            subTitle={`Sudah memiliki akun?`}
            linkPage={`Login Sekarang`}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
