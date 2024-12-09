import React from "react";
import Image from "next/image";

export function useMDXComponents(components) {
  return {
    img: (props) => {
      return (
        <figure>
          <Image
            width={400}
            height={400}
            alt={props.title || "Image"}
            {...props}
          />
          <figcaption>{props.title}</figcaption>
        </figure>
      );
    },
    // Do not wrap images in a p tag
    p: (props) => {
      if (
        props.children &&
        typeof props.children === "object" &&
        !Array.isArray(props.children) &&
        props.children.props.src
      ) {
        return <>{props.children}</>;
      }
      return <p {...props} />;
    },
    ...components,
  };
}
