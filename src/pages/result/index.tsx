import Image from "next/image";

export default function Result() {
  return (
    <main className={`flex flex-col items-center h-screen bg-white px-40`}>
      <Image
        className="mt-20"
        src={"/subtract.svg"}
        alt="landing"
        width={200}
        height={0}
        priority
      />
      <div className="w-60 h-60 bg-black mt-20"></div>
      <p className="text-black mt-10 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit
        itaque porro odio quod aliquid ipsa et quae praesentium quis ab aliquam
        consectetur officia, quia quisquam. Explicabo et vel quis.
      </p>
    </main>
  );
}
