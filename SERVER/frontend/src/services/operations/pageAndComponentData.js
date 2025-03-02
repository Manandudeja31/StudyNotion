/* eslint-disable no-unused-vars */
import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading");
  let result = [];
  console.log(categoryId);
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId }
    );

    if (!response?.data?.success) {
      throw new Error("Could not fetch Category page data");
    }
    result = response?.data;
  } catch (err) {
    console.log("Catalog Page Data api error");
    toast.error(err.message);
    result = err?.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};
