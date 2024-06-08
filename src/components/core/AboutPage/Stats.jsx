import React from "react";


const Stats=[
    {count: "5k", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"}
];

const StatsComponent = () => {
    return(
        <section>
            <div className=" bg-richBlack-800 lg:h-[254px] flex justify-center items-center mb-10 md:mb-20">
                <div className="flex gap-x-6 pr-20 md:gap-x-40">
                    {
                        Stats.map((data, index) => {
                            return(
                                <div key={index}>
                                    <h1 className=" font-bold text-[30px] text-center">
                                        {data.count}
                                    </h1>
                                    <h2 className=" text-[16px] text-richBlack-500">
                                        {data.label}
                                    </h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent