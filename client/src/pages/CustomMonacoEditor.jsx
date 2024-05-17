import React from 'react';
import Editor from '@monaco-editor/react';

const CustomMonacoEditor = ({
  width = '100%',
  height = '400px',
  language = 'javascript',
  theme = 'vs-dark',
  value = '',
  onChange,
}) => {
  return (
    <Editor
      width={width}
      height={height}
      language={language}
      theme={theme}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomMonacoEditor;
