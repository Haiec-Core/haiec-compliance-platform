import type { DBTable } from "@/types";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure(),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export function TiptapJSONContentToHTML({
  jsonContent,
}: {
  jsonContent: DBTable<"marketing_blog_posts">["json_content"];
}) {
  console.log("jsonContent", jsonContent);
  const validContent =
    typeof jsonContent === "string"
      ? JSON.parse(jsonContent)
      : typeof jsonContent === "object" && jsonContent !== null
        ? jsonContent
        : {};
  if (Object.keys(validContent).length === 0) {
    return <div />;
  }
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateHTML(validContent, extensions),
      }}
    />
  );
}
