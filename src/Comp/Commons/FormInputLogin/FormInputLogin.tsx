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

type LoginResponse = {
  message: string;
  token: string;
};

const FormInputLogin = (props: Props) => {
  const { title, subTitle, linkPage } = props;
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erorrRegister, setErrorRegister] = useState("");

  const localHost = process.env.NEXT_PUBLIC_LOCALHOSTBE;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<LoginResponse>(
        `${localHost}/api/auth/login`,
        {
          username,
          password,
        }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", username);
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error.response.data);
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
            <Link href={`/auth/register`} className={`text-blue-500 font-bold`}>
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
          <form className={`flex flex-col gap-3`} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Masukkan username anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className={`relative w-full flex`}>
              <Input
                type={visible.password ? "text" : "password"}
                placeholder={`password ex: j0hndo3`}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className={`absolute inset-y-0 right-0 bg-transparent`}
                variant={"ghost"}
                type="button"
                onClick={() =>
                  setVisible({ ...visible, password: !visible.password })
                }
              >
                {visible.password ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>

            <div className={`w-full`}>
              <Button className={`w-full bg-blue-500`} type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormInputLogin;
