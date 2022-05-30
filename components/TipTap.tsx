import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  updateBody: (content: JSONContent) => void;
}

const TipTap = ({ updateBody }: Props) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "px-5 py-8"
      }
    },
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => updateBody(editor.getJSON())
  });

  return <EditorContent editor={editor} />;
};

export default TipTap;
