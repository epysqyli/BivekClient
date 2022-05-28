import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TipTap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start typing here...</p>"
  });

  return <EditorContent editor={editor} />;
};

export default TipTap;
