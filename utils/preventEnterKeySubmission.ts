export default function preventEnterKeySubmission(e: React.KeyboardEvent<HTMLFormElement>) {
  const target = e.target;
  if (e.key === "Enter" && target instanceof HTMLInputElement) {
    e.preventDefault();
  }
}