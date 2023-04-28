import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/keymap/sublime";
import "codemirror/theme/material-darker.css";

interface ICodeMirrorDemoProps {
  defaultValue: any;
  onChange: (value: any) => void;
}
const CodeMirrorDemo: React.FC<ICodeMirrorDemoProps> = ({
  defaultValue,
  onChange
}) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (data: any, object?: object) => {
    const v = data.getValue();
    if (onChange) {
      onChange(v);
    }
  };
  return (
    <>
      <CodeMirror
        value={value}
        height="500px"
        onChange={(data: any, object: object) => handleChange(data, object)}
        options={{
          lineNumbers: true,
          theme: "material-darker",
          tabSize: 2,
          keyMap: "sublime",
          mode: ""
        }}
      />
    </>
  );
};

export default CodeMirrorDemo;
