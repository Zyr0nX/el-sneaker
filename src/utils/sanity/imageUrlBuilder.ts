import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/lib/client";

export const builder = imageUrlBuilder(client);
