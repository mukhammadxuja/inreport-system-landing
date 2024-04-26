"use client";
import ResumeNavbar from "@/components/admin/resume/navbar";
import Code from "@/components/ui/code";
import { useMainContext } from "@/context/main-context";
import React from "react";
import { MenuBar } from "@/components/admin/resume/editor";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

function ResumePage() {
  const {
    size,
    setSize,
    color,
    setColor,
    highlight,
    setHighlight,
    font,
    setFont,
    types,
    setTypes,
    url,
    setUrl,
    align,
    setAlign,
    list,
    setList,
    colorVariants,
    textColorVariants,
  } = useMainContext();

  const sizeStyles = {
    header: "text-[50px] font-bold h-fi",
    title: "text-[30px] font-semibold",
    subtitle: "text-[23px] font-medium",
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    justify: "text-justify",
    right: "text-right",
  };

  const style = sizeStyles[size] || "";
  const alignS = alignStyles[align] || "";
  const highlightS = colorVariants[highlight] || "";

  console.log(types);

  const bold = types.includes("bold") && "font-bold";
  const italic = types.includes("italic") && "italic";
  const underline = types.includes("underline") && "underline";

  const jsxCode = `
  function sayHello(name) {
  return (
    <>
      <h1>Hello, World!</h1>
    </>
  )
}
  `;

  const [content, setContent] = useState("");
  console.log(content);

  return (
    <div className="p-4 min-h-screen">
      {/* <ResumeNavbar /> */}
      {/* <Code code={jsxCode} lines={["4:6", 2]} language="js" depth={2} /> */}
      {/* MenuBar */}
      <div className="">
        <EditorProvider
          slotBefore={<ResumeNavbar />}
          extensions={extensions}
          content={content}
          onUpdate={(content) => setContent(content)}
        ></EditorProvider>
      </div>
    </div>
  );
}

export default ResumePage;

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

// const content = `
// <h2>
//   Hi there,
// </h2>
// <p>
//   this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
// </p>
// <ul>
//   <li>
//     That’s a bullet list with one …
//   </li>
//   <li>
//     … or two list items.
//   </li>
// </ul>
// <p>
//   Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
// </p>
// <pre><code class="language-css">body {
// display: none;
// }</code></pre>
// <p>
//   I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
// </p>
// <blockquote>
//   Wow, that’s amazing. Good work, boy! 👏
//   <br />
//   — Mom
// </blockquote>
// `;
