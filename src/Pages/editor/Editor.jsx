import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import React from "react";
import { extensions } from "../../constants/tiptapExtensions";
import MenuBar from "./MenuBar";

const Editor = ({ onDataChange, content, editable, className = '', margin = '' }) => {
  const editor = useEditor({
    editable,
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          `${margin} prose dark:prose-invert prose-sm sm:prose-base max-w-none focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]`,
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  return (
    <div className={`${className} w-full relative`}>
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;