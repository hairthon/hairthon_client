import { api } from "@/pages/api/api-config";
import { Button, Modal, Space } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// 본인 사진과 합성 할 사진 나눠서 넣어야함
export function UploadImage() {
  const { query, push } = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [img, setImg] = useState<File | string>("");
  const [img2, setImg2] = useState<File | string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setImg(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImages((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImages([]);
      //에러표시하기
    }
  };

  const handleImageChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImg2(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImages((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImages([]);
    }
  };

  const handleAnalyze = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const { data } = await api.post("/dl_Img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("image", selectedImages[0]);
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
      const { data } = await api.post("/aaa", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
            <p>- .jpg 확장자 사진만 가능합니다</p>
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
            multiple
            onChange={handleImageChange}
          />
        </form>
        {query.mode === "synthesis" && (
          <div className="flex flex-col items-center">
            <form className="w-80 h-80 flex-shrink-0 rounded-[50px] bg-black flex items-center justify-center mb-5">
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
                multiple
                onChange={handleImageChange2}
              />
            </form>
            <p className="text-black">원하는 헤어스타일을 한 사람의 사진</p>
          </div>
        )}
      </div>

      <div>
        <Space wrap>
          <Button onClick={info}>tip</Button>
        </Space>
      </div>

      {query.mode === "analyze" ? (
        <button
          className={`px-3 py-2 rounded-lg mt-10 ${
            selectedImages.length > 0 ? "bg-black" : "bg-gray-400"
          }`}
          onClick={handleAnalyze}
          disabled={!!!(selectedImages.length > 0)}
        >
          분석하기
        </button>
      ) : (
        <button
          className={`px-3 py-2 rounded-lg mt-10 ${
            selectedImages.length > 0 ? "bg-black" : "bg-gray-400"
          }`}
          onClick={handleSynthesis}
          disabled={!!!(selectedImages.length > 0)}
        >
          합성하기
        </button>
      )}
    </>
  );
}
