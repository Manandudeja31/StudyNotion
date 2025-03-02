import React from "react";

const Stats = [
  { count: "5k", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <section>
      <div
        className=" bg-richBlack-800 my-10 py-20
      "
      >
        <div className="flex gap-20 mx-5 justify-evenly items-center flex-wrap text-richBlack-5">
          {Stats.map((data, index) => {
            return (
              <div key={index}>
                <h1 className=" font-extrabold text-3xl text-center">
                  {data.count}
                </h1>
                <h2 className=" text-[16px] font-bold ">{data.label}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsComponent;
