import { Progress } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Result() {
  const { query } = useRouter();

  return (
    <main className={`flex flex-col items-center h-screen bg-white`}>
      <Image
        className="mt-20"
        src={"/subtract.svg"}
        alt="landing"
        width={200}
        height={0}
        priority
      />
      <div className="w-60 h-60 mt-20 bg-gray-200 relative">
        {/* 헤어스타일 합성 로딩시 표시 */}
        <div className="absolute drop-shadow-lg bg-gradient-to-b from-green-300 to-green-500 w-full h-1.5 bg-gradient-to-b from-transparent to-opacity-80 animate-[scanning_1.5s_linear_infinite]"></div>
      </div>

      <p className="text-black mt-10 text-center w-80">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit
        itaque porro odio quod aliquid ipsa et quae praesentium quis ab aliquam
        consectetur officia, quia quisquam. Explicabo et vel quis.
      </p>
      <div className="mt-10">
        <li className="flex gap-3 mb-2">
          <p className="text-black w-full">계란형</p>
          <Progress
            percent={50}
            size={[300, 20]}
            strokeColor={"black"}
            className="flex justify-center items-center"
          />
        </li>
      </div>
      {query.mode == "analyze" ? (
        <Link
          className="p-3 bg-black rounded-full mt-10"
          href={"/upload?mode=synthesis"}
        >
          나랑 어울리는 머리 합성해보기
        </Link>
      ) : null}
    </main>
  );
}
