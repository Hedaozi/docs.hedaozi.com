import {
  Text,
  mergeStyleSets,
} from '@fluentui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from 'rehype-raw';
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export function MdRender({ md }: { md: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={{
        h1: ({ node, ...props }) => {
          return (
            <Text as={'h1'} className={chapterStyles.title} {...props}/>
          );
        },
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {md}
    </ReactMarkdown>
  );
}

const chapterStyles = mergeStyleSets({
  title: {
    alignItems: 'baseline',
    display: 'flex',
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '1',
    margin: '0px',
  },
});
