import { Editor, JSONContent } from "@tiptap/react";

interface MenuProps {
  editor: Editor | null;
}

interface EditorProps {
  updateBody: (content: JSONContent) => void;
  existingContent?: string;
}

interface TableProps {
  showTableMenu: boolean;
  showTable: () => void;
  hideTable: () => void;
}

export type { MenuProps, EditorProps, TableProps };
