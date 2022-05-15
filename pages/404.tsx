import Link from "next/link";

export default function FourOhFourPage() {
  return (
    <div className="bg-gradient-to-tl from-haiti via-haiti to-[#3E0F3F] relative">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48 space-y-6">
        <p className="rounded-md border-2 border-razzmatazz text-razzmatazz font-medium text-sm px-2 py-0.5 inline-block">
          404
        </p>
        <h1 className="text-white text-3xl md:text-6xl font-extrabold md:leading-tight tracking-tighter">
          Page Not Found
        </h1>
        <p className="text-white md:text-xl lg:text-2l text-opacity-70">
          The page you're looking for doesn't exist, or moved without a
          redirect.
        </p>
        <div className="mt-6">
          <Link href="/">
            <a className="bg-razzmatazz text-white px-6 h-10 rounded-md font-medium shadow-sm inline-block py-2">
              Go back home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
