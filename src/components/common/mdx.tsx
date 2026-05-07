import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type React from "react";
import type { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";
import Image from "next/image";
import Link from "next/link";

type ImageProps = {
  alt?: string;
  src: string;
  [key: string]: unknown;
};

type StubComponentProps = {
  children?: ReactNode;
  [key: string]: unknown;
};

function CustomLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: ImageProps) {
  if (!src) return null;
  return (
    <span className="block my-4">
      <Image
        src={src}
        alt={alt || ""}
        width={960}
        height={540}
        className="rounded-lg border border-gray-200 dark:border-gray-800 w-full h-auto"
        sizes="(max-width: 960px) 100vw, 960px"
        {...props}
      />
    </span>
  );
}

function slugify(str: string): string {
  return transliterate(str.replace(/&/g, " and "), {
    lowercase: true,
    separator: "-",
  }).replace(/\-\-+/g, "-");
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const sizes: Record<number, string> = {
    1: "text-3xl font-bold mt-8 mb-4",
    2: "text-2xl font-bold mt-8 mb-3",
    3: "text-xl font-semibold mt-6 mb-3",
    4: "text-lg font-semibold mt-6 mb-2",
    5: "text-base font-semibold mt-4 mb-2",
    6: "text-sm font-semibold mt-4 mb-2",
  };

  const Component = ({ children }: { children: ReactNode }) => {
    const getText = (node: unknown): string => {
      if (typeof node === "string") return node;
      if (typeof node === "number") return String(node);
      if (Array.isArray(node)) return node.map(getText).join("");
      return "";
    };
    const text = getText(children);
    const slug = slugify(text || "");
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
    return (
      <Tag id={slug} className={`${sizes[level]} scroll-mt-20 group`}>
        <a href={`#${slug}`} className="no-underline hover:underline">
          {children}
        </a>
      </Tag>
    );
  };

  Component.displayName = `h${level}`;
  return Component;
}

const components = {
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-gray-600 dark:text-gray-400 leading-7 my-3">{children}</p>
  ),
  h1: createHeading(1) as React.ComponentType<{ children: ReactNode }>,
  h2: createHeading(2) as React.ComponentType<{ children: ReactNode }>,
  h3: createHeading(3) as React.ComponentType<{ children: ReactNode }>,
  h4: createHeading(4) as React.ComponentType<{ children: ReactNode }>,
  h5: createHeading(5) as React.ComponentType<{ children: ReactNode }>,
  h6: createHeading(6) as React.ComponentType<{ children: ReactNode }>,
  img: createImage as React.ComponentType<ImageProps>,
  a: CustomLink as React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }>,
  code: ({ children }: { children: ReactNode }) => (
    <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children, ...props }: StubComponentProps) => (
    <pre
      className="my-4 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-x-auto text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 my-3 text-gray-600 dark:text-gray-400">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 my-3 text-gray-600 dark:text-gray-400">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="leading-7">{children}</li>
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </strong>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-blue-600 pl-4 my-4 italic text-gray-500 dark:text-gray-400">
      {children}
    </blockquote>
  ),
  CodeBlock: ({ children, code, ...props }: StubComponentProps & { code?: string }) => (
    <pre className="my-4 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-x-auto text-sm">
      <code>{code || children}</code>
    </pre>
  ),
  InlineCode: ({ children }: { children: ReactNode }) => (
    <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
      {children}
    </code>
  ),
  Column: ({ children }: StubComponentProps) => <div className="flex flex-col gap-4">{children}</div>,
  Row: ({ children }: StubComponentProps) => <div className="flex gap-4">{children}</div>,
  Button: ({ label, href, children: c, ...props }: StubComponentProps & { label?: string; href?: string }) =>
    href ? (
      <a href={href} className="btn-primary inline-block">{label || c}</a>
    ) : (
      <button type="button" className="btn-primary">{label || c}</button>
    ),
  AccordionGroup: ({ children }: StubComponentProps) => <div className="space-y-2">{children}</div>,
  Card: ({ children }: StubComponentProps) => <div className="card">{children}</div>,
  Feedback: ({ children }: StubComponentProps) => <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">{children}</div>,
  Grid: ({ children }: StubComponentProps) => <div className="grid grid-cols-2 gap-4">{children}</div>,
  Icon: ({ name }: StubComponentProps & { name?: string }) => <span className="inline-block">[{name}]</span>,
  Media: ({ src, alt, ...props }: ImageProps) => src ? (
    <span className="block my-4">
      <Image src={src} alt={alt || ""} width={960} height={540} className="rounded-lg w-full h-auto" sizes="(max-width: 960px) 100vw, 960px" />
    </span>
  ) : null,
  SmartLink: ({ href, children: c }: StubComponentProps & { href?: string }) => <a href={href} className="text-blue-600 dark:text-blue-400 underline">{c}</a>,
  Table: ({ children }: StubComponentProps) => <div className="overflow-x-auto my-4"><table className="min-w-full text-sm">{children}</table></div>,
  Text: ({ children }: StubComponentProps) => <span>{children}</span>,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function getComponents() {
  return components;
}

export function CustomMDX(props: CustomMDXProps) {
  const mergedComponents = { ...components, ...(props.components || {}) };

  return (
    <MDXRemote
      {...props}
      options={{ blockJS: false }}
      components={mergedComponents}
    />
  );
}
