import { api } from "@/pages/api/api-config";
import { Button, Modal, Space, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export function UploadImage() {
  const { query, push } = useRouter();
  const [selectedImage1, setSelectedImage1] = useState("");
  const [selectedImage2, setSelectedImage2] = useState("");
  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState("");
  const [img, setImg] = useState<File | string>("");
  const [img2, setImg2] = useState<File | string>("");
  const [image, setImage] = useState("");
  console.log("🚀 ~ file: UploadImage.tsx:17 ~ UploadImage ~ image:", image);

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", img);
      const { data } = await api.post("/dl_Img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("image", selectedImage1);
      localStorage.setItem("result", JSON.stringify(data));
      push("/faceshape");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSynthesis = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file1", img);
      formData.append("file2", img2);
      formData.append("fileName1", fileName1);
      formData.append("fileName2", fileName2);
      const { data } = await api.post("/fusion", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "arraybuffer",
      });

      const blob = new Blob([data], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
      <div className="flex items-center mt-10 gap-10">
        <div className="flex gap-10 items-start justify-center">
          <div className="flex flex-col items-center">
            <p className="text-black mb-5">
              <b>본인 사진</b>을 업로드 해주세요
            </p>
            <form className="w-80 h-80 flex-shrink-0 rounded-[50px] bg-black flex items-center justify-center mb-5">
              <label htmlFor="upload">
                {selectedImage1 ? (
                  <div className="relative">
                    <Image
                      className="cursor-pointer"
                      src={selectedImage1}
                      alt="landing"
                      width={200}
                      height={0}
                      priority
                    />
                    {isLoading && (
                      <div className="absolute top-0 drop-shadow-lg bg-gradient-to-b from-green-300 to-green-500 w-full h-1.5 from-transparent to-opacity-80 animate-[scanning_1.5s_linear_infinite]" />
                    )}
                  </div>
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
          </div>
          {image && (
            <div className="bg-black w-max h-max relative p-10 flex flex-col items-center">
              <img
                className="rounded-3xl"
                src={image}
                alt="헤어스타일 합성이미지"
              />
              <Image
                className="mt-10"
                src={"/Subtract (1).svg"}
                alt="landing"
                width={100}
                height={0}
                priority
              />
            </div>
          )}
          {query.mode === "synthesis" && (
            <div className="flex flex-col items-center">
              <p className="text-black mb-5">
                <b>합성 할</b> 사진을 업로드 해주세요
              </p>
              <form className="w-80 h-80 flex-shrink-0 rounded-[50px] bg-black flex items-center justify-center mb-5">
                <label htmlFor="upload2">
                  {selectedImage2 ? (
                    <div className="relative">
                      <Image
                        className="cursor-pointer"
                        src={selectedImage2}
                        alt="landing"
                        width={200}
                        height={0}
                        priority
                      />
                      {isLoading && (
                        <div className="absolute top-0 drop-shadow-lg bg-gradient-to-b from-green-300 to-green-500 w-full h-1.5 from-transparent to-opacity-80 animate-[scanning_1.5s_linear_infinite]" />
                      )}
                    </div>
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
            </div>
          )}
        </div>
      </div>

      <div>
        <Space wrap>
          <Button className="mt-5" onClick={info}>
            좀 더 좋은 결과를 받기 위한 방법
          </Button>
        </Space>
      </div>
      {image ? (
        <div className="flex gap-10">
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-2 rounded-lg mt-5 bg-black"
          >
            다시 해보기
          </button>
          <Link className="px-3 py-2 rounded-lg mt-5 bg-black" href={"/"}>
            홈으로
          </Link>
        </div>
      ) : (
        <>
          {query.mode === "analyze" ? (
            !isLoading ? (
              <button
                className={`px-3 py-2 rounded-lg mt-5 ${
                  selectedImage1 ? "bg-black" : "bg-gray-400"
                }`}
                onClick={handleAnalyze}
                disabled={!selectedImage1}
              >
                분석하기
              </button>
            ) : (
              <Spin className="mt-10" />
            )
          ) : !isLoading ? (
            <button
              className={`px-3 py-2 rounded-lg mt-5 ${
                selectedImage2 ? "bg-black" : "bg-gray-400"
              }`}
              onClick={handleSynthesis}
              disabled={!!!selectedImage2}
            >
              합성하기
            </button>
          ) : (
            <Spin className="mt-10" />
          )}
        </>
      )}
    </>
  );
}
