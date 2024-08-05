import { GlowingText } from '../ui';

export function PostTitle({ title }: { title: string }) {
  return (
    <h1 className="text-2xl md:text-3xl font-extrabold text-wrap">
      <GlowingText isActive isHoverable>
        {title}
      </GlowingText>
    </h1>
  );
}
