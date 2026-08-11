import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="cp-docs-prose__h1" {...props} />,
    h2: (props) => <h2 className="cp-docs-prose__h2" {...props} />,
    h3: (props) => <h3 className="cp-docs-prose__h3" {...props} />,
    p: (props) => <p className="cp-docs-prose__p" {...props} />,
    ul: (props) => <ul className="cp-docs-prose__ul" {...props} />,
    table: (props) => <table className="cp-docs-prose__table" {...props} />,
    code: (props) => <code className="cp-docs-prose__code" {...props} />,
    ...components,
  };
}
