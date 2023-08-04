import Image from "next/image";

export default function HairStyle() {
  <>
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
        <div className="bg-gray-400 w-[200px] h-[300px] mt-20" />
        {/* 헤어스타일 합성 로딩시 표시 */}
        <div className="absolute top-20 drop-shadow-lg bg-gradient-to-b from-green-300 to-green-500 w-full h-1.5 from-transparent to-opacity-80 animate-[scanning_1.5s_linear_infinite]" />
      </div>
    </main>
  </>;
}
