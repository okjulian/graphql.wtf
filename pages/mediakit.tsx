export default function MediaKitPage() {
  return (
    <div className="bg-gradient-to-tl from-haiti via-haiti to-[#3E0F3F] relative">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48 space-y-6">
        <p className="rounded-md border-2 border-razzmatazz text-razzmatazz font-medium text-sm px-2 py-0.5 inline-block">
          Downloads
        </p>
        <h1 className="text-white text-3xl md:text-6xl font-extrabold md:leading-tight tracking-tighter">
          Media Kit
        </h1>
        <p className="text-white md:text-xl lg:text-2l text-opacity-70">
          Download the GraphQL WTF logos for use in publications that mention
          GraphQL WTF, or Jamie Barton.
        </p>
        <div className="mt-6">
          <a
            href="mediakit.zip"
            download="GraphQL WTF Media Kit"
            className="bg-razzmatazz text-white px-6 h-10 rounded-md font-medium shadow-sm inline-block py-2"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
