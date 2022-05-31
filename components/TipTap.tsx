import {
  Bold,
  Italic,
  List,
  CornerUpLeft,
  CornerUpRight,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from "react-feather";
import { useEditor, EditorContent, JSONContent, Editor, isActive } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { useState } from "react";

interface MenuProps {
  editor: Editor | null;
}

interface EditorProps {
  updateBody: (content: JSONContent) => void;
}

interface TableProps {
  showTableMenu: boolean;
  showTable: () => void;
  hideTable: () => void;
}

const MenuBar = ({ editor, showTableMenu, showTable, hideTable }: MenuProps & TableProps) => {
  if (!editor) return null;

  const active = "text-white bg-slate-600 px-2 m-1 rounded text-sm";
  const notActive = "border m-1 px-2 rounded text-sm";

  return (
    <div className='flex items-center justify-center flex-wrap'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? active : notActive}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? active : notActive}
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? active : notActive}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? active : notActive}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()} className={notActive}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? active : notActive}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? active : notActive}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? active : notActive}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? active : notActive}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? active : notActive}
      >
        <div className='flex items-center'>
          <List size={18} />
          <span></span>
        </div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? active : notActive}
      >
        <div className='flex items-center gap-x-1'>
          <List size={18} />
          <span className='text-xs'>123</span>
        </div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? active : notActive}
      >
        <Code size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? active : notActive}
      >
        quote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={notActive}>
        break line
      </button>
      <button onClick={() => editor.chain().focus().undo().run()} className={notActive}>
        <CornerUpLeft size={18} />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} className={notActive}>
        <CornerUpRight size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? active : notActive}
      >
        <AlignLeft size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? active : notActive}
      >
        <AlignCenter size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? active : notActive}
      >
        <AlignRight size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? active : notActive}
      >
        <AlignJustify size={18} />
      </button>
      {showTableMenu ? (
        <div className={active + " cursor-pointer"} onClick={hideTable}>
          table menu
        </div>
      ) : (
        <div className={notActive + " cursor-pointer"} onClick={showTable}>
          table menu
        </div>
      )}
    </div>
  );
};

const TableMenu = ({ editor }: MenuProps) => {
  if (!editor) return null;

  const tableHTML = `
  <table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>
`;

  const active = "text-white bg-slate-600 px-2 m-1 rounded text-sm";
  const notActive = "border m-1 px-2 rounded text-sm";

  return (
    <div className='flex items-center justify-center flex-wrap'>
      <button
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className={notActive}
      >
        insertTable
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertContent(tableHTML, {
              parseOptions: {
                preserveWhitespace: false
              }
            })
            .run()
        }
        className={notActive}
      >
        insertHTMLTable
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        disabled={!editor.can().addColumnBefore()}
        className={notActive}
      >
        addColumnBefore
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        disabled={!editor.can().addColumnAfter()}
        className={notActive}
      >
        addColumnAfter
      </button>
      <button
        onClick={() => editor.chain().focus().deleteColumn().run()}
        disabled={!editor.can().deleteColumn()}
        className={notActive}
      >
        deleteColumn
      </button>
      <button
        onClick={() => editor.chain().focus().addRowBefore().run()}
        disabled={!editor.can().addRowBefore()}
        className={notActive}
      >
        addRowBefore
      </button>
      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        disabled={!editor.can().addRowAfter()}
        className={notActive}
      >
        addRowAfter
      </button>
      <button
        onClick={() => editor.chain().focus().deleteRow().run()}
        disabled={!editor.can().deleteRow()}
        className={notActive}
      >
        deleteRow
      </button>
      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        disabled={!editor.can().deleteTable()}
        className={notActive}
      >
        deleteTable
      </button>
      <button
        onClick={() => editor.chain().focus().mergeCells().run()}
        disabled={!editor.can().mergeCells()}
        className={notActive}
      >
        mergeCells
      </button>
      <button
        onClick={() => editor.chain().focus().splitCell().run()}
        disabled={!editor.can().splitCell()}
        className={notActive}
      >
        splitCell
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        disabled={!editor.can().toggleHeaderColumn()}
        className={notActive}
      >
        toggleHeaderColumn
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        disabled={!editor.can().toggleHeaderRow()}
        className={notActive}
      >
        toggleHeaderRow
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        disabled={!editor.can().toggleHeaderCell()}
        className={notActive}
      >
        toggleHeaderCell
      </button>
      <button
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
        disabled={!editor.can().mergeOrSplit()}
        className={notActive}
      >
        mergeOrSplit
      </button>
      <button
        onClick={() => editor.chain().focus().setCellAttribute("backgroundColor", "#FAF594").run()}
        disabled={!editor.can().setCellAttribute("backgroundColor", "#FAF594")}
        className={notActive}
      >
        setCellAttribute
      </button>
      <button
        onClick={() => editor.chain().focus().fixTables().run()}
        disabled={!editor.can().fixTables()}
        className={notActive}
      >
        fixTables
      </button>
      <button
        onClick={() => editor.chain().focus().goToNextCell().run()}
        disabled={!editor.can().goToNextCell()}
        className={notActive}
      >
        goToNextCell
      </button>
      <button
        onClick={() => editor.chain().focus().goToPreviousCell().run()}
        disabled={!editor.can().goToPreviousCell()}
        className={notActive}
      >
        goToPreviousCell
      </button>
    </div>
  );
};

const TipTap = ({ updateBody }: EditorProps) => {
  const [showTableMenu, setShowTableMenu] = useState<boolean>(false);
  const showTable = (): void => setShowTableMenu(true);
  const hideTable = (): void => setShowTableMenu(false);

  const editor = useEditor({
    editorProps: {
      attributes: { class: "px-2 pt-5 pb-28 overflow-y-auto h-50vh" }
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
      TableCell
    ],
    content: "",
    onUpdate: ({ editor }) => updateBody(editor.getJSON())
  });

  return (
    <>
      <div className='mt-2 mb-5'>
        <MenuBar editor={editor} showTableMenu={showTableMenu} showTable={showTable} hideTable={hideTable} />
      </div>
      <div className='mt-2 mb-5'>{showTableMenu ? <TableMenu editor={editor} /> : null}</div>
      <div className='border-2 rounded'>
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TipTap;
