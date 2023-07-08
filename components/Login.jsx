import { Button } from "@material-tailwind/react";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
      <Button
        variant="filled"
        color="blue"
        className="bg-blue-500 text-white px-5 py-1"
        onClick={signIn}
      >
        Login
      </Button>
    </div>
  );
}
