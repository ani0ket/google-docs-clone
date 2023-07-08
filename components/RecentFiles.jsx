import FolderIcon from "@mui/icons-material/Folder";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { collection, doc, query, orderBy, getDocs } from "firebase/firestore";
import DocumentRow from "./DocumentRow";

function RecentFiles() {
  const { data: session, status } = useSession();
  const q = query(
    collection(doc(db, "userDocs", session.user.email), "docs"),
    orderBy("timestamp", "desc")
  );
  const [snapshot] = useCollectionOnce(q);
  console.log(snapshot);
  return (
    <section className="bg-white px-10 md:px-0">
      <div className="max-w-3xl mx-auto py-8">
        <div className="flex items-center justify-between pb-5 ">
          <h2 className="font-medium flex-grow ">My Documents</h2>
          <p className="mr-12">Date Created</p>
          <FolderIcon fontSize="medium" color="action" />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentFiles;
