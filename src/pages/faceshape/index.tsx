import { SHAPE, koreanKeyMappings } from "@/lib/const";
import { Progress } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Result() {
  const [image, setImage] = useState("");
  const [data, setData] = useState({
    heart_tri: 0,
    long: 0,
    egg: 0,
    round: 0,
    square: 0,
  });
  const [maxKey, setMaxKey] = useState<string>("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("result") ?? "");
    const img = localStorage.getItem("image") ?? "";
    setData(data);
    setImage(img);
    if (data) {
      let maxKey = "";
      let maxValue = -Infinity;

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] > maxValue) {
            maxValue = data[key];
            maxKey = key;
          }
        }
      }

      setMaxKey(maxKey);
    }
  }, []);

  return (
    <main className={`flex flex-col items-center bg-white py-10 min-w-fit`}>
      <Image src={"/subtract.svg"} alt="logo" width={200} height={0} priority />
      <div className="relative">
        <Image
          className="mt-20 "
          src={image}
          alt="logo"
          width={200}
          height={300}
          priority
        />
      </div>
      <p className="text-black mt-10 w-2/3">
        <ReactMarkdown>{maxKey && SHAPE[maxKey]}</ReactMarkdown>
      </p>
      <div className="mt-10">
        <ul className="flex flex-col w-inherit">
          {Object.entries(data).map(([key, value]) => {
            return (
              <li key={key} className="flex gap-3 mb-2">
                <p className="text-black w-full">{koreanKeyMappings[key]}</p>
                <Progress
                  percent={Number((value * 100).toFixed(2))}
                  size={[300, 20]}
                  strokeColor={maxKey === key ? "#0084c7" : "black"}
                  className="flex justify-center items-center"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-10">
        <Link
          className="p-3 bg-black rounded-full mt-10 hover:bg-sky-600 text-white"
          href={"/upload?mode=analyze"}
        >
          다시 해보기
        </Link>
        <Link
          className="p-3 bg-black rounded-full mt-10 hover:bg-sky-600 text-white"
          href={"/upload?mode=synthesis"}
        >
          나랑 어울리는 머리 합성해보기
        </Link>
      </div>
    </main>
  );
}
