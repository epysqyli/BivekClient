import type { MenuProps } from "../../interfaces/ITipTap";

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

  const baseStyle = "border m-1 px-2 rounded text-sm";

  return (
    <div className='flex items-center justify-center flex-wrap'>
      <button
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className={baseStyle}
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
        className={baseStyle}
      >
        insertHTMLTable
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        disabled={!editor.can().addColumnBefore()}
        className={baseStyle}
      >
        addColumnBefore
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        disabled={!editor.can().addColumnAfter()}
        className={baseStyle}
      >
        addColumnAfter
      </button>
      <button
        onClick={() => editor.chain().focus().deleteColumn().run()}
        disabled={!editor.can().deleteColumn()}
        className={baseStyle}
      >
        deleteColumn
      </button>
      <button
        onClick={() => editor.chain().focus().addRowBefore().run()}
        disabled={!editor.can().addRowBefore()}
        className={baseStyle}
      >
        addRowBefore
      </button>
      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        disabled={!editor.can().addRowAfter()}
        className={baseStyle}
      >
        addRowAfter
      </button>
      <button
        onClick={() => editor.chain().focus().deleteRow().run()}
        disabled={!editor.can().deleteRow()}
        className={baseStyle}
      >
        deleteRow
      </button>
      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        disabled={!editor.can().deleteTable()}
        className={baseStyle}
      >
        deleteTable
      </button>
      <button
        onClick={() => editor.chain().focus().mergeCells().run()}
        disabled={!editor.can().mergeCells()}
        className={baseStyle}
      >
        mergeCells
      </button>
      <button
        onClick={() => editor.chain().focus().splitCell().run()}
        disabled={!editor.can().splitCell()}
        className={baseStyle}
      >
        splitCell
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        disabled={!editor.can().toggleHeaderColumn()}
        className={baseStyle}
      >
        toggleHeaderColumn
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        disabled={!editor.can().toggleHeaderRow()}
        className={baseStyle}
      >
        toggleHeaderRow
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        disabled={!editor.can().toggleHeaderCell()}
        className={baseStyle}
      >
        toggleHeaderCell
      </button>
      <button
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
        disabled={!editor.can().mergeOrSplit()}
        className={baseStyle}
      >
        mergeOrSplit
      </button>
      <button
        onClick={() => editor.chain().focus().setCellAttribute("backgroundColor", "#FAF594").run()}
        disabled={!editor.can().setCellAttribute("backgroundColor", "#FAF594")}
        className={baseStyle}
      >
        setCellAttribute
      </button>
      <button
        onClick={() => editor.chain().focus().fixTables().run()}
        disabled={!editor.can().fixTables()}
        className={baseStyle}
      >
        fixTables
      </button>
      <button
        onClick={() => editor.chain().focus().goToNextCell().run()}
        disabled={!editor.can().goToNextCell()}
        className={baseStyle}
      >
        goToNextCell
      </button>
      <button
        onClick={() => editor.chain().focus().goToPreviousCell().run()}
        disabled={!editor.can().goToPreviousCell()}
        className={baseStyle}
      >
        goToPreviousCell
      </button>
    </div>
  );
};

export default TableMenu;
