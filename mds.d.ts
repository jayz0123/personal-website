import type { JSX } from "react";
declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element;
  export default MDXComponent;
  export const meta: { [key: string]: any };
}
