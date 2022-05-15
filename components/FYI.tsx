import { InformationCircle } from "./InformationCircle";

export function FYI({ children }: { children?: any }) {
  return (
    <div className="bg-pink-100 my-8 p-4 rounded">
      <div className="flex items-center gap-2">
        <InformationCircle className="inline-block text-pink-500" />{" "}
        <span className="font-medium uppercase text-pink-500">FYI</span>
      </div>
      {children}
    </div>
  );
}
