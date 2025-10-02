"use client";

import useSWR from "swr";
import api from "@/lib/axios";

type ExampleResponse = {
  message: string;
};

const fetcher = async (url: string) => {
  const { data } = await api.get<ExampleResponse>(url);
  return data;
};

export function useExample() {
  const { data, error, isLoading } = useSWR("/status", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
}
