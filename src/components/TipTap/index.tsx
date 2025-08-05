"use client";

import { cn } from "@/lib/utils";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorEvents,
  EditorProvider,
  JSONContent,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group flex flex-wrap gap-2 p-2 bg-gray-100 rounded-md">
      <div className="button-group flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("bold")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("italic")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("strike")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("code")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-gray-700",
          )}
        >
          Clear marks
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-gray-700",
          )}
        >
          Clear nodes
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("paragraph")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          Paragraph
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("heading", { level: 3 })
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("heading", { level: 4 })
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          H4
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("heading", { level: 5 })
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          H5
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("heading", { level: 6 })
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          H6
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("codeBlock")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          Code block
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("blockquote")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          Blockquote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-gray-700",
          )}
        >
          Horizontal rule
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-gray-700",
          )}
        >
          Hard break
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-gray-700",
          )}
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "text-gray-700",
          )}
        >
          Redo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={cn(
            "px-2 py-1 text-sm font-medium rounded-md transition-colors",
            "bg-white hover:bg-gray-100 border border-gray-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "bg-gray-200 text-gray-900"
              : "text-gray-700",
          )}
        >
          Purple
        </button>
      </div>
    </div>
  );
};

export const Tiptap = ({
  initialContent,
  onUpdate,
}: {
  initialContent: JSONContent;
  onUpdate: (props: EditorEvents["update"]) => void;
}) => {
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

  return (
    <>
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        onUpdate={onUpdate}
        content={initialContent}
      ></EditorProvider>
    </>
  );
};
