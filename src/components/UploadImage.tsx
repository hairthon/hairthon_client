import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

export function UploadImage() {
  const { query, push } = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleToResult = () => {
    push("/result");
  };

  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <form
          action=""
          className="w-80 h-80 flex-shrink-0 rounded-[50px] bg-black flex items-center justify-center mb-5"
        >
          <label htmlFor="upload">
            <Image
              className="cursor-pointer"
              src={selectedImage ?? "/solar-camera-bold.svg"}
              alt="landing"
              width={200}
              height={0}
              priority
            />
          </label>
          <input
            id="upload"
            type="file"
            alt="이미지 업로드"
            accept="image/jpg, image/png"
            className="hidden"
            onChange={handleImageChange}
          />
        </form>
      </div>

      {/* <img src={} alt="" /> */}
      <p className="text-black">사진을 업로드 해주세요</p>
      <button
        className={`w-20 h-10 rounded-lg mt-10 ${
          selectedImage ? "bg-black" : "bg-gray-400"
        }`}
        onClick={handleToResult}
        disabled={!!!selectedImage}
      >
        {query.mode == "analyze" ? "분석하기" : "합성하기"}
      </button>
    </>
  );
}
