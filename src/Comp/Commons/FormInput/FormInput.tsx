import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  title: string;
  subTitle: string;
  linkPage: string;
}

const FormInput = (props: Props) => {
  const { title, subTitle, linkPage } = props;
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erorrRegister, setErrorRegister] = useState("");

  const handleVisiblePaswword = (key: "password" | "confirmPassword") => {
    setVisible({
      ...visible,
      [key]: !visible[key],
    });
  };

  const router = useRouter();
  const localHost = process.env.NEXT_PUBLIC_LOCALHOSTBE;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${localHost}/api/auth/register`, {
        fullname,
        username,
        password,
        confirmPassword,
      });

      if (res.status === 200) {
        router.push("/auth/register/success");
      }
    } catch (error: any) {
      setErrorRegister(error.response.data.message);
    }
  };

  return (
    <>
      <div className={`flex flex-col `}>
        <div className="">
          {" "}
          <h1 className={`text-2xl font-semibold text-blue-500`}>{title}</h1>
          <p className={`text-sm pb-3`}>
            {subTitle}{" "}
            <Link href={`/auth/login`} className={`text-blue-500 font-bold`}>
              {linkPage}
            </Link>
          </p>
          {erorrRegister && (
            <Alert variant="destructive">
              <AlertDescription>
                <p>{erorrRegister}</p>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className={`flex flex-col gap-6 pt-3`}>
          <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Masukkan nama lengkap anda"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Masukkan username anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className={`relative w-full flex`}>
              <Input
                type={visible.password ? "text" : "password"}
                placeholder={`Buat password anda`}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className={`absolute inset-y-0 right-0 bg-transparent`}
                variant={"ghost"}
                onClick={() => handleVisiblePaswword("password")}
                type="button"
              >
                {visible.password ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            <div className={`relative w-full flex`}>
              <Input
                type={visible.confirmPassword ? "text" : "password"}
                placeholder={`Konfirmasi password anda`}
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                className={`absolute inset-y-0 right-0 bg-transparent`}
                variant={"ghost"}
                onClick={() => handleVisiblePaswword("confirmPassword")}
                type="button"
              >
                {visible.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            <div className={`w-full`}>
              <Button className={`w-full bg-blue-500`} type="submit">
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormInput;
