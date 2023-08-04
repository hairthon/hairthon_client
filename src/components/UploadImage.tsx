import { api } from "@/pages/api/api-config";
import { Button, Modal, Space } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// 본인 사진과 합성 할 사진 나눠서 넣어야함
// file1 === target === 본인얼굴
export function UploadImage() {
  const { query, push } = useRouter();
  const [selectedImage1, setSelectedImage1] = useState("");
  const [selectedImage2, setSelectedImage2] = useState("");
  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState("");
  const [img, setImg] = useState<File | string>("");
  const [img2, setImg2] = useState<File | string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (!file) {
      return;
    }
    setImg(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage1(reader.result as string);
      setFileName1(file.name);
    };

    reader.readAsDataURL(file);
  };

  const handleImageChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setImg2(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage2(reader.result as string);
      setFileName2(file.name);
    };

    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const { data } = await api.post("/dl_Img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("image", selectedImage1);
      localStorage.setItem("result", JSON.stringify(data));

      push("/faceshape");
    } catch (error) {
      console.error();
    }
  };

  const handleSynthesis = async () => {
    try {
      const formData = new FormData();
      formData.append("file1", img);
      formData.append("file2", img2);
      formData.append("fileName1", fileName1);
      formData.append("fileName2", fileName2);
      const { data } = await api.post("/fusion", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("image", JSON.stringify(data));
      push("/hairstyle");
    } catch (error) {
      console.error();
    }
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
            <p>- .png .jpg 확장자 사진만 가능합니다</p>
          </div>
        </>
      ),
      okType: "default",
      onOk() {},
    });
  };

  useEffect(() => {
    // info();
  }, []);

  return (
    <>
      <div className="flex items-center mt-20 gap-10">
        <form className="w-80 h-80 flex-shrink-0 rounded-[50px] bg-black flex items-center justify-center mb-5">
          <label htmlFor="upload">
            {selectedImage1 ? (
              <Image
                className="cursor-pointer"
                src={selectedImage1}
                alt="landing"
                width={200}
                height={0}
                priority
              />
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
            onChange={handleImageChange}
          />
        </form>
        {query.mode === "synthesis" && (
          <div className="flex flex-col items-center">
            <form className="w-80 h-80 flex-shrink-0 rounded-[50px] bg-black flex items-center justify-center mb-5">
              <label htmlFor="upload2">
                {selectedImage2 ? (
                  <Image
                    className="cursor-pointer"
                    src={selectedImage2}
                    alt="landing"
                    width={200}
                    height={0}
                    priority
                  />
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
                id="upload2"
                type="file"
                alt="이미지 업로드"
                accept="image/jpg, image/png"
                className="hidden"
                onChange={handleImageChange2}
              />
            </form>
            <p className="text-black">원하는 헤어스타일을 한 사람의 사진</p>
          </div>
        )}
      </div>

      <div>
        <Space wrap>
          <Button onClick={info}>좀 더 좋은 결과를 받기 위한 방법</Button>
        </Space>
      </div>

      {query.mode === "analyze" ? (
        <button
          className={`px-3 py-2 rounded-lg mt-10 ${
            selectedImage1 ? "bg-black" : "bg-gray-400"
          }`}
          onClick={handleAnalyze}
          disabled={!!!selectedImage1}
        >
          분석하기
        </button>
      ) : (
        <button
          className={`px-3 py-2 rounded-lg mt-10 ${
            selectedImage2 ? "bg-black" : "bg-gray-400"
          }`}
          onClick={handleSynthesis}
          disabled={!!!selectedImage2}
        >
          합성하기
        </button>
      )}
    </>
  );
}
