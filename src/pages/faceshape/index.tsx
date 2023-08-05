import { SHAPE } from "@/lib/const";
import { Progress } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    console.log(Array.from(data), img);
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
    <main className={`flex flex-col items-center h-full bg-white py-10`}>
      <Image
        src={"/subtract.svg"}
        alt="landing"
        width={200}
        height={0}
        priority
      />
      <div className="relative">
        <Image
          className="mt-20 "
          src={image}
          alt="landing"
          width={200}
          height={300}
          priority
        />
      </div>
      <p className="text-black mt-10 px-80 text-center">
        {maxKey && SHAPE[maxKey]}
      </p>
      <div className="mt-10">
        <ul className="flex flex-col">
          {Object.entries(data).map(([key, value]) => (
            <li key={key} className="flex gap-3 mb-2">
              <p className="text-black w-full">{key}</p>
              <Progress
                percent={Number((value * 100).toFixed(2))}
                size={[300, 20]}
                strokeColor={"black"}
                className="flex justify-center items-center"
              />
            </li>
          ))}
        </ul>
      </div>
      <Link
        className="p-3 bg-black rounded-full mt-10"
        href={"/upload?mode=synthesis"}
      >
        나랑 어울리는 머리 합성해보기
      </Link>
    </main>
  );
}
