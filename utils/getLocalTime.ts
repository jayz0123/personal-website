export default function getLocalTime({ date }: { date: Date | string | number }) {
  const localTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  return localTime;
}