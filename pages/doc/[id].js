import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { getSession, signOut, useSession } from "next-auth/react";
import Login from "../../components/Login";
import { Description, People } from "@mui/icons-material";
import { collection, doc, query, getDocs, where } from "firebase/firestore";
import TextEditor from "../../components/TextEditor";
import { useEffect, useState } from "react";

// Import Login

export default function Doc() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [snapshot, setSnapshot] = useState(null);
  const [loadingSnapshot, setLoadingSnapshot] = useState(true);

  useEffect(() => {
    let unsubscribe;
    console.log("session", session, id);
    const fetchDocument = async () => {
      if (session && id) {
        const q = query(
          collection(db, "userDocs", session.user.email, "docs"),
          where("id", "==", id)
        );
        console.log("q", q);
        try {
          const docSnapshot = await getDocs(q);
          console.log("docSnapshot", docSnapshot);
          if (docSnapshot.empty) {
            // Document not found, handle accordingly
            setLoadingSnapshot(false);
            setSnapshot(null);
            console.log("No such document!");
            return;
          }

          const docData = docSnapshot.docs[0].data();
          console.log("doc data", docData);
          setSnapshot(docData);
          setLoadingSnapshot(false);
        } catch (error) {
          // Handle the error
          console.error("Error fetching document:", error);
          setLoadingSnapshot(false);
          setSnapshot(null);
        }
      }
    };

    fetchDocument();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [session, id]);

  console.log(snapshot);
  if (status === "unauthenticated") return <Login />;

  if (!loadingSnapshot && snapshot?.data()?.fileName) {
    router.replace("/");
  }

  return (
    <main className="w-full min-h-screen">
      <header className="flex justify-between items-center p-3 pb-1">
        <Button
          onClick={() => router.push("/")}
          className="cursor-pointer rounded-full border-2 hover:bg-blue-400 p-1"
        >
          <Description fontSize="large" color="info" />
        </Button>
        <div className="flex-grow px-2">
          {/* <h2>{snapshot?.data().fileName}</h2> */}
          <h2 className="font-semibold m-0 ">
            {" "}
            {snapshot?.data()?.fileName || "Loading..."}
          </h2>
          <div class="flex items-center text-sm space-x-1 -ml-1 h-8 text-slate-950 ">
            <div class="relative group">
              <p class="option">File</p>
              <ul class="absolute top-full left-0 list-none   hidden bg-white shadow-md mt-0 group-hover:block z-[999999] py-2 transition-all duration-300 ease-in-out">
                <li class="py-2 w-32 px-4 hover:bg-gray-100 cursor-pointer ">
                  New
                </li>
                <li class="py-2 px-4 hover:bg-gray-100 cursor-pointer">Open</li>
                <li class="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  Make a copy
                </li>
              </ul>
            </div>
            <div class="relative group">
              <p class="option">Insert</p>
              <ul class="absolute top-full left-0 list-none   hidden bg-white shadow-md mt-0 group-hover:block z-[999999] py-2 ">
                <li class="py-2 w-32 px-4 hover:bg-gray-100 cursor-pointer">
                  Copy
                </li>
                <li class="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  Select All
                </li>
              </ul>
            </div>
            <div class="relative group">
              <p class="option">Edit</p>
              <ul class="absolute top-full left-0 list-none   hidden bg-white shadow-md mt-0 group-hover:block z-[999999] py-2 ">
                <li class="py-2 w-32 px-4 hover:bg-gray-100 cursor-pointer">
                  File Option 1
                </li>
                <li class="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  File Option 2
                </li>
                <li class="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  File Option 3
                </li>
              </ul>
            </div>
            <div class="relative group">
              <p class="option">View</p>
              <ul class="absolute top-full left-0 list-none   hidden bg-white shadow-md mt-0 group-hover:block z-[999999] py-2 ">
                <li class="py-2 w-32 px-4 hover:bg-gray-100 cursor-pointer">
                  File Option 1
                </li>
                <li class="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  File Option 2
                </li>
                <li class="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  File Option 3
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Button
          fontSize="medium"
          color="info"
          className="hidden md:inline-flex h-10 bg-blue-600 text-white"
        >
          <People fontSize="medium" className="text-white" />{" "}
          <p className="ml-2 ">Share</p>
        </Button>
      </header>

      <TextEditor />
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // console.log(session);
  return {
    props: {
      session,
    },
  };
}
