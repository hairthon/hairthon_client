import Image from "next/image";
import { useEffect, useState } from "react";

export default function HairStyle() {
  const [image, setImage] = useState("");

  useEffect(() => {
    const img = localStorage.getItem("image") ?? "";
    console.log(img);

    const blob = new Blob([img], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);
    console.log(imageUrl);
    const im = imageUrl.replace("blob:", "");
    setImage(im);
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
        {/* <Image
          className="mt-20"
          src={image}
          alt="landing"
          width={200}
          height={300}
          priority
        /> */}
        <img src={image} alt="" />
        <div className="bg-gray-400 w-[200px] h-[300px] mt-20" />
        <div className="absolute top-20 drop-shadow-lg bg-gradient-to-b from-green-300 to-green-500 w-full h-1.5 from-transparent to-opacity-80 animate-[scanning_1.5s_linear_infinite]" />
      </div>
    </main>
  );
}
