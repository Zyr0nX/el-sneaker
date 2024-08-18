import { sizeType } from "./sizeType";
import { sneakerType } from "./sneakerType";
import { brandType } from "./brandType";
import { collectionType } from "./collectionType";
import { trendingType } from "./trendingType";
import { bannerType } from "./bannerType";
import { richTextType } from "./richTextType";
import { headerType } from "./headerType";
import { linkType } from "./linkType";
import { socialType } from "./socialType";
import { footerType } from "./footerType";

import { type SchemaTypeDefinition } from "sanity";
import { filterType } from "./filterType";
import { sneakerCountType } from "./sneakerCountType";
import { sortType } from "./sortType";
import { sneakerDetailType } from "./sneakerDetailType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    sneakerType,
    sizeType,
    brandType,
    collectionType,
    trendingType,
    bannerType,
    richTextType,
    headerType,
    linkType,
    socialType,
    footerType,
    filterType,
    sneakerCountType,
    sortType,
    sneakerDetailType
  ],
};
