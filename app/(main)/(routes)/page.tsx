import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[640px] w-full flex flex-row shadow-sm">
      <div className="flex-1 pl-[80px] pt-[75px]">
        <h1 className="text-4xl font-extrabold text-indigo-600">
          Have a job to do but... No truck?
        </h1>
        <h1 className="text-4xl font-extrabold text-indigo-600">No tractor?</h1>
        <h1 className="text-4xl font-extrabold text-red-600">OR...</h1>
        <h1 className="text-4xl font-extrabold text-indigo-600">
          Have a truck or tractor?
        </h1>
        <h1 className="text-4xl font-extrabold text-indigo-600">
          But no job to do?
        </h1>
        <h1 className="text-4xl font-extrabold text-red-600 mt-8">We can help.</h1>
      </div>
      <div className="h-[640px] w-[640px] relative">
        <Image
          className="self-end"
          src={"/images/truck_back_hero.png"}
          // height={640}
          fill
          // width={640}
          alt="logo"
        />
      </div>
    </div>
  );
}
