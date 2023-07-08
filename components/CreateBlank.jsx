import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { db } from "../firebase";
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
// import firebase from "firebase";

export default function CreateBlank() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const { data: session, status } = useSession();

  function createDocument() {
    if (!input) return;
    try {
      const docRef = addDoc(
        collection(doc(db, "userDocs", session.user.email), "docs"),
        {
          fileName: input,
          timestamp: serverTimestamp(),
        }
      );
      // console.log(docRef);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setInput("");
    setShowModal(false);
  }

  const modal = (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white drop-shadow-md p-4 rounded-lg">
        <Typography variant="h6" className="mb-2">
          Enter the name of the document
        </Typography>
        <form onSubmit={createDocument}>
          <input
            type="text"
            name="doc-name"
            id="doc-name"
            value={input}
            className="w-full border-2 border-black rounded-md text-base px-2"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 mt-3"
            onClick={createDocument}
          >
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  );

  return (
    <section className="bg-[#f8f9FA] pb-10 px-10">
      <div className="max-w-3xl mx-auto">
        <div className="py-6 flex justify-between items-center ">
          <h2 className="text-gray-700 ">Start a new document</h2>
          <Button
            variant="outlined"
            className="h-7 w-2 rounded-full border-none hover:border-none"
          >
            <MoreVertIcon fontSize="medium" />
          </Button>
          {modal}
        </div>
        <div className="w-40 h-52 relative border-2 hover:border-blue-700">
          <Button
            variant="outlined"
            className="h-full w-full relative border-none"
            onClick={() => setShowModal(true)}
          >
            <Image
              src={
                "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              }
              fill={true}
              className="object-cover"
              alt="create new doc"
              priority={true}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </Button>
        </div>
        <p className="font-semibold ml-2 mt-2 text-sm text-gray-700">Blank</p>
      </div>
    </section>
  );
}
