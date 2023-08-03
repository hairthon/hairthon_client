import { api } from "@/pages/api/api-config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

export function UploadImage() {
  const { query, push } = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  console.log(
    "🚀 ~ file: UploadImage.tsx:8 ~ UploadImage ~ selectedImages:",
    selectedImages
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImages((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImages([]);
    }
  };

  // 생각해보니 api 호출이 하나만 있으면 되네..
  const handleToResult = () => {
    // const formData = new FormData();
    // formData.append("image", selectedImages[0]);
    // api.post("/dl_Img", {
    //   formData,
    // });
    query.mode == "analyze"
      ? push("/result?mode=analyze")
      : push("/result?mode=synthesis");
  };

  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <form
          action=""
          className="w-80 h-80 flex-shrink-0 rounded-[50px] bg-black flex items-center justify-center mb-5"
        >
          <label htmlFor="upload">
            {selectedImages.length > 0 ? (
              selectedImages.map((image, i) => (
                <Image
                  key={i}
                  className="cursor-pointer"
                  src={image}
                  alt="landing"
                  width={200}
                  height={0}
                  priority
                />
              ))
            ) : (
              <Image
                className="cursor-pointer"
                src={"/solar-camera-bold.svg"}
                alt="landing"
                width={200}
                height={0}
                priority
              />
            )}
          </label>
          <input
            id="upload"
            type="file"
            alt="이미지 업로드"
            accept="image/jpg, image/png"
            className="hidden"
            // multiple
            onChange={handleImageChange}
          />
        </form>
      </div>

      <p className="text-black">
        얼굴이 정면을 향하고 가려진 부분이 없는 사진을 업로드 해주세요.
      </p>
      <button
        className={`px-3 py-2 rounded-lg mt-10 ${
          selectedImages.length > 0 ? "bg-black" : "bg-gray-400"
        }`}
        onClick={handleToResult}
        disabled={!!!(selectedImages.length > 0)}
      >
        {query.mode == "analyze" ? "분석하기" : "합성하기"}
      </button>
    </>
  );
}
