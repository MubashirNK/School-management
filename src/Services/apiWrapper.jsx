import React, { useEffect, useState } from "react";
import { useState } from "react";
const baseURL = import.meta.env.VITE_BASE_URL;

const useApi = () => {
  const getToken = () => localStorage.getItem("token");
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const request = async (url, method, data = null) => {
    try {
      const response = await axiosInstance({
        url,
        method,
        data,
      });

      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const get = async (url) => request(url, "GET");
  const post = async (url, data) => request(url, "POST", data);
  const update = async (url, data) => request(url, "PUT", data);
  const remove = async (url) => request(url, "DELETE");

  return {
    get,
    post,
    update,
    remove,
  };
};

export default useApi;
