import { SanityImage } from "sanity-image";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`;

export const Image = (
  props: Omit<
    React.ComponentProps<typeof SanityImage>,
    "baseUrl" | "dataset" | "projectId"
  >
) => <SanityImage id={props.id} baseUrl={baseUrl} {...props} />;