"use client";

import getLocalTime from "@/utils/getLocalTime";

export default function Greetings() {
  const date = new Date();

  return <div>{getLocalTime({ date })}</div>;
}
