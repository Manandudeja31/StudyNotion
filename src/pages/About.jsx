import React from "react";
import HighlightText from "../components/core/Homepage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from ".././components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/foundingStory.png";
import StatsComponent from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
const About = () => {
  return (
    <div className=" mx-auto text-white">
      {/* Section 1 */}
      <section className=" bg-richBlack-800">
        <div className="mx-auto flex flex-col justify-center items-center w-full max-w-maxContent  justify-items-center gap-x-2 text-center md:gap-x-6">
          <h1 className="font-md col-span-2 pl-2 md:col-span-3 text-center text-richBlack-200 mt-20">
            About Page
          </h1>
          <header className="col-span-2 pl-0 mt-12 max-w-4xl text-[16px]  font-semibold text-richBlack-5 ">
            Driving Innovation in Online Education
            <p className="col-span-3 mb-[3.2rem] mt-4 max-w-4xl text-[16px] text-richBlack-300">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="flex gap-x-3 mx-auto">
            <img src={BannerImage1} className=" pr-5 pl-3 md:pl-0 md:pr-0" />
            <img src={BannerImage2} className=" hidden md:block" />
            <img src={BannerImage3} className=" hidden md:block" />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex  md:pr-0 justify-center items-center border-b-2 border-richBlack-200 mt-20 mb-20">
        <Quote />
      </section>

      {/* Section 3 */}
      <section>
        <div className="flex flex-col w-screen justify-center items-center mb-20">
          {/* Founding story main div */}
          <div className="flex flex-col md:flex-row justify-center items-center pb-28">
            {/* Founding story left div */}
            <div className="pr-20">
              <h1
                className="font-bold text-[36px] pb-5 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]
                             text-transparent bg-clip-text"
              >
                Our Founding Story
              </h1>
              <p className="text-[16px] max-w-lg text-richBlack-200 pb-3">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-[16px] max-w-lg text-richBlack-200 pb-3">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            {/* Founding story right div */}
            <div className=" sm:pr-10">
              <img src={FoundingStory} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="pr-20">
              <h1
                className="font-bold text-[36px] pb-5 bg-gradient-to-br from-[#E65C00] to-[#F9D423]
                             text-transparent bg-clip-text"
              >
                Our Vision
              </h1>
              <p className="text-[16px] max-w-lg text-richBlack-200 pb-3">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div>
              <h1
                className="font-bold text-[36px] pb-5 bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]
                             text-transparent bg-clip-text"
              >
                Our Mission
              </h1>
              <p className="text-[16px] max-w-lg text-richBlack-200 pb-3">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <StatsComponent />

      {/* Section 5 */}
      <section className="mx-auto flex flex-col items-center justify-center gap-5 mb-[140px]">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <Footer />
    </div>
  );
};

export default About;
