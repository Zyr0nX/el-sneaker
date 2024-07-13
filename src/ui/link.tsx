"use client";

import React from "react";
import {
  Link as AriaLink,
  LinkProps as AriaLinkProps,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
// import { focusRing } from './utils';

interface LinkProps extends AriaLinkProps {
  variant?: "primary" | "link" | "text";
  // | 'secondary'
}

const styles = tv({
  // extend: focusRing,
  base: "",
  variants: {
    variant: {
      primary:
        "bg-brand-500 px-4 py-2.5 rounded-full text-neutral-50 font-semibold",
      link: "",
      text: "bg-brand-500/10 text-brand-500 rounded-full px-4 py-2.5 font-semibold",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Link(props: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className, variant: props.variant })
      )}
    />
  );
}
