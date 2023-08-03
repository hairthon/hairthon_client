import { api } from "@/pages/api/api-config";
import { Button, Modal, Popconfirm, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export function UploadImage() {
  const { query, push } = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [img, setImg] = useState<File | string>("");
  console.log(
    "🚀 ~ file: UploadImage.tsx:8 ~ UploadImage ~ selectedImages:",
    selectedImages
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    console.log(file);
    setImg(file);
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

  const handleToResult = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const data = await api.post("/dl_Img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(data);
    } catch (error) {
      console.error();
    }
    // query.mode == "analyze"
    //   ? push("/result?mode=analyze")
    //   : push("/result?mode=synthesis");
  };

  const info = () => {
    Modal.info({
      title: "정확한 결과를 받기위해 지켜주세요!",
      content: (
        <>
          <p className="text-gray-500">{"<예시사진>"}</p>
          <img src="/example.png" alt="" className="mb-5" />
          <div>
            <p>- 예시 사진과 같이 얼굴이 나온 부분을 확대해서 잘라주세요</p>
            <p>- 얼굴이 가려진 사진은 인식이 불가능합니다</p>
            <p>- 해상도가 높을수록 결과가 잘 나옵니다</p>
            <p>- .jpg 확장자 사진만 가능합니다</p>
          </div>
        </>
      ),
      onOk() {},
    });
  };

  useEffect(() => {
    info();
  }, []);

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
            accept="image/jpg"
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
