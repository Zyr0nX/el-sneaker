import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

export const builder = imageUrlBuilder(client);
