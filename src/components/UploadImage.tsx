import { api } from "@/pages/api/api-config";
import {
  Alert,
  Button,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Spin,
} from "antd";

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
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(1);
  const [error, setEroror] = useState(false);

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
      setEroror(true);
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
      console.error(error + "에러메시지");
    } finally {
      setIsLoading(false);
    }
  };

  const info = () => {
    Modal.info({
      width: "500px",
      title: "꼭 읽어주세요!",
      content: (
        <div>
          <p className="text-gray-500">{"<예시사진>"}</p>
          <img src="/example.png" alt="" className="mb-5" />
          <div>
            <b>📌 필수 조건</b>
            <p>
              1. 측면사진은 힘들어요😂 얼굴의 모든 부분이 잘 보이는 사진이어야
              해요.
            </p>
            <p>2. 모자이크된 사진은 🙅‍♀️ 얼굴이 가려지지 않은 사진이어야해요. </p>
            <p>
              3. PNG와 JPG 이미지만 업로드 가능해요 그 외 파일은 지원하지
              않아요.😥
            </p>
            <p>4. 합성클릭은 한번만! AI가 아파해요,,🤒</p>
            <br />
            <b>😀 더 좋은 결과를 위해</b>
            <p>1. 얼굴이 확대된 사진이면👍 AI가 얼굴분석을 더 잘해요.</p>
            <p>2. 이마가 드러난다면 👍 자연스러운 합성이 가능해요.</p>
            <p>
              3. 조명이 균일한 사진이라면👍 너무 밝거나 어두운 사진은 인식이
              어려워요.
            </p>
            <p>
              4. 보다 선명한 사진이라면 👍 기본화질이 좋으면 좋을수록 결과가
              좋아요.
            </p>
          </div>
        </div>
      ),
      okType: "default",
      onOk() {},
    });
  };

  useEffect(() => {
    // info();
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <>
      {error && (
        <>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Alert
              message="서버가 꺼져있습니다."
              description="1. API서버의 경우, 24시간 배포할 수 없어(일 최대 12시간 서비스 이용 중) 얼굴형 분석, 헤어스타일 합성 서비스가 원활하게 이루어지지 않는 경우가 발생할 수 있습니다. 
              2. 과제 평가 중 배포가 중지되어있거나 API 에러가 발생한다면 아래 연락처로 꼭 연락 부탁드립니다. 
              서버 관리자: 이영우 010-9384-7806 eoduq6464@naver.com / 김혜영 010-9159-9671 thfl9671@donga.ac.kr"
              type="warning"
              showIcon
              closable
            />
          </Space>
        </>
      )}
      <div className="flex items-center mt-7 gap-10">
        <div className="flex gap-10 items-start justify-center flex-wrap">
          <div className="flex flex-col items-center">
            {query.mode === "analyze" && (
              <Radio.Group onChange={onChange} value={value} className="mb-5">
                <Radio value={1}>남자</Radio>
                <Radio value={2}>여자</Radio>
              </Radio.Group>
            )}
            <p className="text-black mb-1">
              <b>본인 사진</b>을 업로드 해주세요
            </p>
            <form className="w-80 h-80 flex-shrink-0 rounded-[50px] bg-black flex items-center justify-center mb-5">
              <label htmlFor="upload">
                {selectedImage1 ? (
                  <div className="relative">
                    <Image
                      className="cursor-pointer"
                      src={selectedImage1}
                      alt="logo"
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
                    alt="logo"
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
                alt="logo"
                width={100}
                height={0}
                priority
              />
            </div>
          )}
          {query.mode === "synthesis" && (
            <div className="flex flex-col items-center">
              <p className="text-black mb-1">
                <b>합성 할</b> 사진을 업로드 해주세요
              </p>
              <form className="w-80 h-80 flex-shrink-0 rounded-[50px] bg-black flex items-center justify-center mb-5">
                <label htmlFor="upload2">
                  {selectedImage2 ? (
                    <div className="relative">
                      <Image
                        className="cursor-pointer"
                        src={selectedImage2}
                        alt="logo"
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
                      alt="logo"
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
            꼭 읽어주세요!
          </Button>
        </Space>
      </div>
      {image ? (
        <div className="flex gap-10">
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-2 rounded-lg mt-5 bg-black hover:bg-sky-600 text-white"
          >
            다시 해보기
          </button>
          <Link
            className="px-3 py-2 rounded-lg mt-5 bg-black hover:bg-sky-600 text-white"
            href={"/"}
          >
            홈으로
          </Link>
        </div>
      ) : (
        <>
          {query.mode === "analyze" ? (
            !isLoading ? (
              <button
                className={`px-3 py-2 rounded-lg mt-5 text-white ${
                  selectedImage1 ? "bg-black hover:bg-sky-600" : "bg-gray-400"
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
              className={`px-3 py-2 rounded-lg mt-5 text-white ${
                selectedImage2 ? "bg-black hover:bg-sky-600" : "bg-gray-400"
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
