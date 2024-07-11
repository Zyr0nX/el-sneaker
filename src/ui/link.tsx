"use client"

import React from 'react';
import { Link as AriaLink, LinkProps as AriaLinkProps, composeRenderProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
// import { focusRing } from './utils';

interface LinkProps extends AriaLinkProps {
  variant?: 'primary' 
  // | 'secondary'
}

const styles = tv({
  // extend: focusRing,
  base: "",
  variants: {
    variant: {
      primary: "bg-brand-500 px-4 py-2.5 rounded-full",
      // secondary:
      //   "text-gray-700 dark:text-zinc-300 underline decoration-gray-700/50 hover:decoration-gray-700 dark:decoration-zinc-300/70 dark:hover:decoration-zinc-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Link(props: LinkProps) {
  return <AriaLink {...props} className={composeRenderProps(props.className, (className, renderProps) =>  styles({...renderProps, className, variant: props.variant}))} />;
}
