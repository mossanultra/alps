import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

export default function MarkdownEditor() {
  const defaultMarkdown = `
  # デフォルトのタイトル
  
  これはデフォルトの本文です。**強調**や*斜体*などのマークダウンも使用できます。
  
  - リストアイテム1
  - リストアイテム2
    - サブリストアイテム2a
    - サブリストアイテム2b
  
  \`\`\`javascript
  // コードブロックの例
  function greet() {
    console.log('Hello, world!');
  }
  \`\`\`
  `;
  const [content, setContent] = useState(defaultMarkdown);

  const handleEditorChange = ({ html, text }: { html: string, text: string }) => {
    setContent(text);
  };

  return (
    <div
      style={{ marginTop: "72px" }}
    >
      <MdEditor
        value={content}
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <h2>Preview:</h2>
      <div dangerouslySetInnerHTML={{ __html: mdParser.render(content) }} />
    </div>
  );
}
