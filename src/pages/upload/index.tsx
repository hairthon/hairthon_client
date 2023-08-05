import { UploadImage } from "@/components/UploadImage";
import Image from "next/image";

export default function Upload() {
  return (
    <main className={`flex min-h-screen flex-col items-center bg-white py-10`}>
      <Image
        className="mt-10"
        src={"/subtract.svg"}
        alt="landing"
        width={200}
        height={0}
        priority
      />
      <UploadImage />
    </main>
  );
}
