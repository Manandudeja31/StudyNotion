/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Coursecard from "../components/core/Catalog/Coursecard";
import CourseSlider from "../components/core/Catalog/CourseSlider";
const coursesType = ["Most Popular", "New"];
const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(coursesType[0]);

  const handleActive = (value) => {
    setActive(value);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        // console.log(category_id);
        setCategoryId(category_id);
        // console.log(categoryId);
      } catch (err) {
        console.log(err.message);
      }
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log(res);
        setCatalogPageData(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);
  // console.log(typeof catalogPageData?.data?.topSellingCourses);

  return (
    <div className="text-white">
      <div
        className="bg-richBlack-800 px-5 py-10
      "
      >
        <p className="text-richBlack-300 text-sm">
          {`Home/Catalog/`}
          <span className="text-yellow-25">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
        <p className="text-2xl mt-2 text-richBlack-5 font-medium">
          {catalogPageData?.data?.selectedCategory.name}
        </p>
        <p className="text-richBlack-300 mt-1 text-sm">
          {catalogPageData?.data?.selectedCategory.description}
        </p>
      </div>
      <div>
        {/* Section 1 */}
        <div>
          <div className="text-4xl p-2 font-bold">
            Courses to get you started
          </div>
          <div className="flex gap-x-2">
            {coursesType.map((type, key) => (
              <div
                key={key}
                onClick={() => handleActive(type)}
                className={`${
                  active === type
                    ? "text-yellow-50 underline underline-offset-[6px]"
                    : "text-richBlack-5 "
                } pl-5 pt-2 cursor-pointer`}
              >
                {type}
              </div>
            ))}
          </div>
          <hr className="w-full text-richBlack-200 ml-4 mb-5"></hr>
          <div className="mb-20">
            {active === "Most Popular" ? (
              <CourseSlider
                Courses={catalogPageData?.data?.topSellingCourses}
              />
            ) : (
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            )}
          </div>
        </div>
        {/* Section 2 */}
        <div>
          <p className="text-4xl p-2 font-bold">
            Top Courses in {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <div className="mb-20">
            <CourseSlider
              Courses={catalogPageData?.data?.differentCategories[0]?.courses}
            />
          </div>
        </div>
        {/* Section 3 */}
        <div>
          <p className="text-4xl p-2 font-bold">Frequently Bought</p>
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 mb-10">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, index) => (
                  <Coursecard
                    course={course}
                    key={index}
                    Height={"h-[200px]"}
                    Width={"h-[400px]"}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
