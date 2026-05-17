import React from "react";
import { View } from "react-native";

export function Skeleton({ className = "" }: any) {
  return (
    <View
      className={`bg-gray-200 dark:bg-zinc-800 rounded-md ${className}`}
    />
  );
}