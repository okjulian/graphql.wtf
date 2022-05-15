import NextLink from "next/link";

const stripTrailingSlash = (href) => {
  if (href === "/") return href;

  return href.endsWith("/") ? href.slice(0, -1) : href;
};

function Link({ href, children, ...props }) {
  if (!href) return null;

  const anchorLink = href.startsWith("#");

  if (href.includes("http") || href.includes("mailto") || anchorLink) {
    return (
      <a
        href={stripTrailingSlash(href)}
        {...(!anchorLink && { rel: "noopener noreferrer", target: "_blank" })}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={stripTrailingSlash(href)}>
      <a {...props}>{children}</a>
    </NextLink>
  );
}

export default Link;
