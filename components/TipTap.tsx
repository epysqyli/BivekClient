import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  updateBody: (content: JSONContent) => void;
}

const TipTap = ({ updateBody }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => updateBody(editor.getJSON())
  });

  return <EditorContent editor={editor} />;
};

export default TipTap;
