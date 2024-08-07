import { memo } from 'react';
import Markdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

import { CodeBlock } from './CodeBlock';

export const PostContent = memo(function PostContent({
  content,
}: {
  content: string;
}) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <div className="mockup-code">
              <CodeBlock
                language={match[1]}
                codes={String(children).replace(/\n$/, '')}
              />
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
});
