import React from "react";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from ".././components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/foundingStory.png";
import StatsComponent from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
import HighlightText from "../components/core/Homepage/HighlightText";
const About = () => {
  return (
    <div className=" mx-auto text-white">
      {/* Section 1 */}
      <section className=" bg-richBlack-800 relative">
        <div
          className="flex flex-col justify-center items-center w-full 
        max-w-maxContent  justify-items-center gap-x-2 text-center md:gap-x-6"
        >
          <header className="mt-12 max-w-2xl mx-5 text-3xl font-semibold text-richBlack-5 ">
            Driving Innovation in Online Education for a
            <HighlightText text={" Brighter future"} />
            <p className="md:mb-60 mb-20 mt-4 max-w-xl mx-3 text-base text-richBlack-300">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="flex gap-3 md:gap-5 absolute top-[350px] md:top-80">
            <img
              src={BannerImage1}
              alt="bannerimg"
              className="h-28 w-28 md:h-64 md:w-64 lg:h-full lg:w-full"
            />
            <img
              src={BannerImage2}
              alt="bannerimg"
              className="h-28 w-28 md:h-64 md:w-64 lg:h-full lg:w-full"
            />
            <img
              src={BannerImage3}
              alt="bannerimg"
              className="h-28 w-28 md:h-64 md:w-64 lg:h-full lg:w-full"
            />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section
        className="flex justify-center items-center border-b-2
       border-richBlack-200 mt-40 md:mt-60 mb-20"
      >
        <Quote />
      </section>

      {/* Section 3 */}
      <section>
        <div className="flex flex-col justify-center items-center mb-20">
          {/* Founding story main div */}
          <div className="flex flex-col md:flex-row justify-center items-center pb-28">
            {/* Founding story left div */}
            <div>
              <h1
                className="font-bold text-[36px] pb-5 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]
                             text-transparent bg-clip-text mx-5"
              >
                Our Founding Story
              </h1>
              <p className="text-[16px] max-w-lg text-richBlack-200 pb-3 mx-5">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-[16px] max-w-lg text-richBlack-200 pb-3 mx-5">
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
            <div className=" mx-5 mt-10 md:mt-0 shadow-[5px_5px_20px_0px]  shadow-pink-500">
              <img
                alt="founding story"
                src={FoundingStory}
                className="shadow-[-5px_-5px_20px_0px] shadow-pink-500"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center text-center">
            <div>
              <h1
                className="font-bold text-[36px] pb-5 bg-gradient-to-br from-[#E65C00] to-[#F9D423]
                             text-transparent bg-clip-text mx-5"
              >
                Our Vision
              </h1>
              <p className="text-lg mx-5 max-w-lg text-richBlack-200 pb-3">
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
                             text-transparent bg-clip-text mx-5 mt-10 md:mt-0"
              >
                Our Mission
              </h1>
              <p className="text-lg mx-5 max-w-lg text-richBlack-200 pb-3">
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

      {/* Section 6 */}
      {/* <section>
        <div>Reviews from other learners</div>
      </section> */}

      <Footer />
    </div>
  );
};

export default About;
