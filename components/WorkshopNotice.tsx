import SubscribeForm from "./SubscribeForm";

const WorkshopNotice = () => {
  return (
    <div className="px-6 md:px-0">
      <div className="md:shadow rounded-md bg-gradient-to-br from-haiti via-haiti to-[#3E0F3F] p-6 md:p-12 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0">
        <div className="space-y-3 w-full md:w-1/3">
          <p className="text-white text-lg md:text-xl font-medium opacity-80">
            Get notified when the course drops in April 2022.
          </p>
        </div>
        <div className="w-full md:w-2/3 h-full flex items-center justify-end">
          <SubscribeForm intent="workshop" />
        </div>
      </div>
    </div>
  );
};

export default WorkshopNotice;
