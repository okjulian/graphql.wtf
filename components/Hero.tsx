import Image from "next/image";

export default function Hero({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center relative overflow-hidden">
      <div className="p-6 md:p-12 lg:pt-20 lg:pb-32">
        <div className="text-center space-y-5 max-w-4xl z-10 relative">
          <div className="h-56 w-56 relative mx-auto">
            <Image src="/avatar.png" layout="fill" alt="Jamie Barton" />
          </div>
          <h1 className="text-white text-3xl md:text-6xl font-extrabold leading-relaxed tracking-tighter">
            Learn something new with GraphQL,{" "}
            <span className="text-razzmatazz">every week.</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
