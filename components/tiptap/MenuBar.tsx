import {
  Bold,
  Italic,
  List,
  Code,
  CornerUpLeft,
  CornerUpRight,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from "react-feather";
import type { MenuProps, TableProps } from "../../interfaces/ITipTap";

const MenuBar = ({ editor, showTableMenu, showTable, hideTable }: MenuProps & TableProps) => {
  if (!editor) return null;

  const active = "text-white bg-slate-600 px-2 m-1 rounded text-sm";
  const notActive = "bg-white border m-1 px-2 rounded text-sm";

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

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
      <button onClick={addImage} className={notActive}>
        add image
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

export default MenuBar;
