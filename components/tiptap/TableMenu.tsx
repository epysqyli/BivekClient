import type { MenuProps } from "../../interfaces/ITipTap";

const TableMenu = ({ editor }: MenuProps) => {
  if (!editor) return null;
  const baseStyle = "border m-1 px-2 rounded text-sm hover:shadow-md transition-shadow active:text-white active:bg-slate-600";

  return (
    <div className='flex items-center justify-center flex-wrap border-t-2 border-b-2 py-2'>
      <button
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className={baseStyle}
      >
        insert table
      </button>

      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        disabled={!editor.can().deleteTable()}
        className={baseStyle}
      >
        delete table
      </button>

      <button
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        disabled={!editor.can().addColumnBefore()}
        className={baseStyle}
      >
        add column before
      </button>

      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        disabled={!editor.can().addColumnAfter()}
        className={baseStyle}
      >
        add column after
      </button>

      <button
        onClick={() => editor.chain().focus().deleteColumn().run()}
        disabled={!editor.can().deleteColumn()}
        className={baseStyle}
      >
        delete column
      </button>

      <button
        onClick={() => editor.chain().focus().addRowBefore().run()}
        disabled={!editor.can().addRowBefore()}
        className={baseStyle}
      >
        add row before
      </button>

      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        disabled={!editor.can().addRowAfter()}
        className={baseStyle}
      >
        add row after
      </button>

      <button
        onClick={() => editor.chain().focus().deleteRow().run()}
        disabled={!editor.can().deleteRow()}
        className={baseStyle}
      >
        delete row
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        disabled={!editor.can().toggleHeaderColumn()}
        className={baseStyle}
      >
        toggle header column
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        disabled={!editor.can().toggleHeaderRow()}
        className={baseStyle}
      >
        toggle header row
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        disabled={!editor.can().toggleHeaderCell()}
        className={baseStyle}
      >
        toggle header cell
      </button>

      <button
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
        disabled={!editor.can().mergeOrSplit()}
        className={baseStyle}
      >
        merge or split cells
      </button>
    </div>
  );
};

export default TableMenu;
