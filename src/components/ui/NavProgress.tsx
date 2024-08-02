import { Progress } from '@nextui-org/progress';

export function NavProgress() {
  return (
    <Progress
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      className="z-[100] fixed top-0 left-0 right-0 w-full"
      classNames={{
        indicator: 'bg-gradient-to-r from-cyan-200 to-blue-500 opacity-75',
        track: 'bg-transparent',
      }}
    />
  );
}