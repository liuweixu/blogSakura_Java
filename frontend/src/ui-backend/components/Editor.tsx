import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from "@wangeditor/editor";

interface EditorProps {
  value?: string;
  onChange?: (html: string) => void;
}

export default function RichTextEditor(props: EditorProps) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  // 编辑器内容
  const [html, setHtml] = useState(props.value || "");

  // 监听props.value变化，实现回填
  useEffect(() => {
    if (editor && props.value && props.value !== html) {
      editor.setHtml(props.value);
      setHtml(props.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 20 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor: IDomEditor) => {
            const newHtml = editor.getHtml();
            setHtml(newHtml);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            props.onChange && props.onChange(newHtml);
          }}
          mode="default"
          style={{ height: "450px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
}
