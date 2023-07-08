import ArticleIcon from "@mui/icons-material/Article";
import { useRouter } from "next/router";

export default function DocumentRow({ id, fileName, date }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="border-2 grid w-[140px] h-[150px] items-center justify-center rounded-md hover:bg-gray-100 hover:shadow-lg cursor-pointer"
    >
      <ArticleIcon
        color="info"
        className="justify-self-center"
        fontSize="large"
      />
      <p className="self-end justify-self-center mb-2 font-semibold truncate text-left w-full px-2">
        {fileName}
      </p>
      <p className="self-end justify-self-center mb-2 font-semibold text-gray-500 text-sm">
        {date?.toDate().toLocaleDateString()}
      </p>
    </div>
  );
}
