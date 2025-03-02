import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighLightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimeLineSection from "../components/core/Homepage/TimelineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import ReviewsandRating from "../components/core/Homepage/ReviewsandRating";

const Home = () => {
  return (
    <div>
      {/*Section1*/}
      <div
        className="relative mx-auto flex flex-col w-11/12 items-center
            text-white"
      >
        <Link to={"/signup"}>
          <div
            className=" group mt-16 p-1 mx-auto bg-richBlack-800 rounded-full font-bold text-richBlack-200
                transition-all duration-200 hover:scale-95 w-fit"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richBlack-900 z-1"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-8 ">
          Empower Your Future with
          <HighLightText text={" Coding skills"} />
        </div>

        <div className=" mt-4 w-[90%] text-center text-lg max-w-5xl font-bold text-richBlack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className=" mx-3 my-12 w-[70%] h-[50%] shadow-[_20px_20px_0px_0px] shadow-white ">
          <video muted loop autoPlay className="shadow-glowingShadow">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* {code section 1} */}
        <div className="mt-20 mb-10 md:mb-40">
          <CodeBlocks
            position={"md:flex-row flex-col"}
            heading={
              <div className="text-3xl md:text-4xl font-semibold">
                Unlock Your
                <HighLightText text={" coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try iy yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
                        <html>
                        head><title>Example</title><linkrel="stylesheet"href="styles.css">
                        /head>
                        body>
                        h1><ahref="/">Header</a>
                        /h1>
                        nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                        /nav>`}
            codecolors={"text-yellow-25"}
          />
        </div>

        {/* code section 2 */}
        <div className=" mb-20">
          <CodeBlocks
            position={"md:flex-row-reverse flex-col"}
            heading={
              <div className=" text-3xl md:text-4xl font-semibold pt-7 max-w-[250px] pb-1">
                Start
                <HighLightText text={" coding in seconds "} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
                        <html>
                        head><title>Example</title><linkrel="stylesheet"href="styles.css">
                        /head>
                        body>
                        h1><ahref="/">Header</a>
                        /h1>
                        nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                        /nav>`}
            codecolors={"text-yellow-25"}
          />
        </div>
        <ExploreMore />
      </div>

      {/* Section2 */}
      <div className=" bg-pure-greys-5 text-richBlack-700">
        <div className="homepage_bg h-[300px]">
          <div className="w-11/12 max-w-maxContent flex items-center pt-10 md:pt-0 gap-5 mx-auto">
            <div className="h-[400px]"></div>
            <div className="flex flex-row gap-7 text-white mx-auto ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div
          className="mx-auto w-11/12 max-w-content flex flex-col items-center 
          justify-between gap-7"
        >
          <div
            className="flex w-full flex-col md:flex-row text-center md:text-left justify-center md:justify-start 
          items-center md:items-start my-10 gap-5"
          >
            <div className="text-4xl font-semibold w-full max-w-lg pb-3 md:pb-0">
              Get the Skills you need for a
              <HighLightText text={" Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 md:items-start items-center ">
              <div className="text-[15px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>
        <TimeLineSection />
        <LearningLanguageSection />
      </div>

      {/* Section3 */}
      <div
        className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8
            first-letter bg-richBlack-900 text-white"
      >
        <InstructorSection />
        {/* <h2 className="text-center text-4xl font-semibold mt-10">
          Reiew from other Learners
        </h2> */}
      </div>

      {/* Section4 */}
      <div className="my-20">
        <h2 className="font-semibold m-2 text-4xl text-center flex justify-center items-center text-richBlack-5">
          Reviews from other learners
        </h2>
        <ReviewsandRating />
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
