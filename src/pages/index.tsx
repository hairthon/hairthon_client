import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className} h-screen`}
    >
      <section className="h-1/2 bg-white w-full flex flex-col items-center">
        <Image
          className="relative mt-10"
          src={"/subtract.svg"}
          alt="logo"
          width={300}
          height={0}
          priority
        />
        <h3 className="w-81 mt-10 text-black text-center font-Pretendard text-base font-normal leading-7 mb-10">
          <b>
            이젠 더이상 머리 스타일로 고민하지 마세요!
            <br /> 나에게 어울리는 머리 스타일을 합성해보세요!
          </b>
        </h3>
      </section>
      <section className="flex items-center bg-black py-10 w-full h-full justify-center gap-20">
        <Link
          href={"/upload?mode=analyze"}
          className="w-40 flex flex-col items-center"
        >
          <Image
            src={"/tabler_face-id.svg"}
            width={375}
            height={0}
            priority
            alt={"얼굴형 분석"}
          />
          <p className="text-white">내 얼굴형 분석하기</p>
        </Link>
        <Link
          href={"/upload?mode=synthesis"}
          className="w-40 flex flex-col items-center"
        >
          <Image
            src={"/mingcute_hair-line.svg"}
            width={375}
            height={0}
            priority
            alt={"헤어 합성"}
          />
          <p className="text-white">머리 합성 해보기</p>
        </Link>
      </section>
    </main>
  );
}
