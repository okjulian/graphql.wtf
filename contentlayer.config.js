import {
  defineNestedType,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypePrism from "rehype-prism-plus";
import slugify from "slugify";

const Instructor = defineNestedType(() => ({
  name: "Instructor",
  filePathPattern: `instructors/*.{md,mdx}`,
  contentType: "mdx",
  fields: {
    name: {
      type: "string",
      required: true,
      description: "The author name",
    },
    avatar: {
      type: "string",
      description: "The author avatar",
    },
  },
}));

const Episode = defineDocumentType(() => ({
  name: "Episode",
  filePathPattern: `episodes/**/*.{md,mdx}`,
  contentType: "mdx",
  fields: {
    instructor: {
      type: "reference",
      of: Instructor,
      description: "The instructor of this episode.",
      embedDocument: true,
    },
    title: {
      type: "string",
      required: true,
      description: "The title of the episode",
    },
    description: {
      type: "string",
      required: true,
      description:
        "The short description for episodes shown in cards, and grids",
    },
    published: {
      type: "date",
      required: true,
      description: "The public facing published date",
    },
    video: {
      type: "string",
      description: "The video URL",
    },
    repo: {
      type: "string",
      description: "The URL to where people can find the code",
    },
  },
  computedFields: {
    position: {
      type: "number",
      resolve: (episode) =>
        parseInt(episode._raw.flattenedPath.split("/")[1].split("-")[0], 10),
      description: "The public number of the episode",
    },
    slug: {
      type: "string",
      resolve: (episode) => {
        const pathName = episode._raw.flattenedPath.replace(/episodes\/?/, "");

        return slugify(pathName);
      },
    },
    url: {
      type: "string",
      resolve: (episode) => episode._raw.flattenedPath,
    },
    cover: {
      type: "string",
      description:
        "The cover image URL for the episode, shown in episode cards/grids",
      resolve: (episode) => `/images/${episode._raw.flattenedPath}.png`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Episode, Instructor],
  mdx: {
    rehypePlugins: [rehypePrism],
  },
});
