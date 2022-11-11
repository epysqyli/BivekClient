import type { EditorProps } from "../../interfaces/ITipTap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import TableMenu from "./TableMenu";
import MenuBar from "./MenuBar";
import { useState } from "react";

const TipTap = ({ updateBody, existingContent }: EditorProps) => {
  const [showTableMenu, setShowTableMenu] = useState<boolean>(false);
  const showTable = (): void => setShowTableMenu(true);
  const hideTable = (): void => setShowTableMenu(false);

  const editor = useEditor({
    editorProps: {
      attributes: { class: "bg-white dark:bg-slate-600 dark:text-slate-50 px-5 pt-5 pb-28 overflow-y-auto h-50vh 2xl:h-70vh focus:outline-none rounded-md shadow-md" }
    },
    injectCSS: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Time to say something interesting to the world..."
      }),
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image
    ],
    content: existingContent ?? "",
    onUpdate: ({ editor }) => updateBody(editor.getJSON())
  });

  return (
    <>
      <div className='mt-2 mb-5'>
        <MenuBar editor={editor} showTableMenu={showTableMenu} showTable={showTable} hideTable={hideTable} />
      </div>
      <div className='mt-2 mb-5'>{showTableMenu ? <TableMenu editor={editor} /> : null}</div>
      <div className='rounded-md light'>
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TipTap;
