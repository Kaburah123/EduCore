import React from "react";
import { Text, View } from "react-native";

export function Card({ children, className = "" }: any) {
  return (
    <View
      className={`bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow ${className}`}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children }: any) {
  return <View className="mb-2">{children}</View>;
}

export function CardContent({ children }: any) {
  return <View>{children}</View>;
}

export function CardTitle({ children }: any) {
  return (
    <Text className="text-lg font-bold text-black dark:text-white">
      {children}
    </Text>
  );
}