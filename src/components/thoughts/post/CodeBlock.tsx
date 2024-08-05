import { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CodeBlock = memo(function CodeBlock({
  codes,
  language,
}: {
  codes: string | string[];
  language: string;
}) {
  return (
    <SyntaxHighlighter
      showLineNumbers
      wrapLines
      style={oneDark}
      customStyle={{ margin: 0 }}
      language={language}
      PreTag="div"
    >
      {codes}
    </SyntaxHighlighter>
  );
});
