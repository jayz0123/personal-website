export default function getLocalTime(date :  Date | string | number) {
  const localTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  // console.log(localTime)
  return localTime;
}