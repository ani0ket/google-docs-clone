import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

export default function TextEditor() {
  const [docSnap, setDocSnap] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const userDocsRef = doc(db, "userDocs", session.user.email, "docs", id);

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
    const rawEditorState = convertToRaw(editorState.getCurrentContent());
    setDoc(userDocsRef, { editorState: rawEditorState }, { merge: true });
  }

  return (
    <div className="min-h-screen pb-16 bg-[#f8f9fa]">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 bg-white shadow-lg max-w-4xl mx-auto mb-12 border p-10"
      />
    </div>
  );
}
