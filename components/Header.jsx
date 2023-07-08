import { Button } from "@material-tailwind/react";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import { signOut, useSession } from "next-auth/react";

import { Inter } from "next/font/google";
import Image from "next/image";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <nav
      className={`flex w-full items-center sticky top-0 z-50 shadow-md ${inter.variable}`}
    >
      <Button
        variant="outlined"
        className="h-14 w-14 rounded-full shadow-none border-none"
      >
        <MenuIcon color="action" fontSize="medium" />
      </Button>
      <DescriptionIcon color="primary" fontSize="medium" />
      <h1 className="ml-2 text-gray-600 text-2xl font-semibold">Docs</h1>

      <div className="flex flex-grow items-center px-5 bg-gray-100 py-2 rounded-lg mx-5 focus-within:shadow-md ">
        <SearchOutlinedIcon fontSize="medium" color="disabled" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="flex-grow px-5 text-base bg-transparent outline-none "
        />
      </div>
      <Button
        variant="outlined"
        className="h-14 w-14 rounded-full shadow-none hidden md:inline border-none"
      >
        <AppsIcon fontSize="medium" color="action" />
      </Button>

      <Button variant="outlined" onClick={signOut} className="border-none">
        <Image
          src={session?.user?.image}
          width={36}
          height={36}
          alt="profile-pic"
          className="cursor-pointer rounded-full mx-2"
        />
      </Button>
    </nav>
  );
}
