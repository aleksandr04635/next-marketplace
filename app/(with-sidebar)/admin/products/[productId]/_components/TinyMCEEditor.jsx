"use client";
import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
//import { useSelector, useDispatch } from "react-redux";

export default function TinyMCEEditor({ value2, onChange }) {
  // const { theme } = useSelector((state) => state.theme);
  const { setTheme, resolvedTheme: theme } = useTheme();

  const editorRef = useRef(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [skinStyle, setSkinStyle] = useState(
    theme === "light" ? "oxide" : "oxide-dark"
  );
  const [contentStyle, setContentStyle] = useState(
    theme === "light" ? "/index.css" : "/index.css,dark"
  );
  // const [cont, setCont] = useState("");
  //console.log("value2:", value2);
  // console.log("cont:", cont);

  let skinSt = theme === "light" ? "oxide" : "oxide-dark";
  let conSt = theme === "light" ? "/index.css" : "/index.css,dark";
  /*   console.log("theme:", theme);
  console.log("skinStyle:", skinStyle);
  console.log("contentStyle:", contentStyle);
  console.log("theme === 'light':", theme === "light");
  console.log("skinSt:", skinSt);
  console.log("conSt:", conSt); */

  useEffect(() => {
    //editorRef.current.focus();
  }, []);

  useEffect(() => {
    setSkinStyle(theme === "light" ? "oxide" : "oxide-dark");
    setContentStyle(theme === "light" ? "/index.css" : "/index.css,dark");
  }, [theme]);

  const set = function () {
    setSkinStyle(theme === "light" ? "oxide" : "oxide-dark");
    setContentStyle(theme === "light" ? "/index.css" : "/index.css,dark");
  };

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        className=" text-base text-justify"
        //apiKey="uloldf7z9pe592lrmjoh9s32tjjx7ylnar853dybeypiebee"
        //apiKey="your-api-key"
        //tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        /*   onInit={(evt, editor) => {
          editorRef.current = editor;
          if (toCom) {
            editorRef.current.focus();
          }
        }} */
        onEditorChange={(e) => onChange(e)}
        //onEditorChange={()=>setCont(editorRef.current.getContent())}
        //initialValue="<p>This is the initial content of the editor.</p>"
        //initialValue={value2}
        value={value2}
        init={{
          //REMOVES TINY WARNING!!!:
          /*           init_instance_callback: function (editor) {
            var freeTiny = document.querySelector(".tox .tox-notification--in");
            freeTiny.style.display = "none";
          }, */
          init_instance_callback: function (editor) {
            //console.log(`init_instance_callback:`);
            skinSt = theme === "light" ? "oxide" : "oxide-dark";
            conSt = theme === "light" ? "/index.css" : "/index.css,dark";
            setSkinStyle(theme === "light" ? "oxide" : "oxide-dark");
            setContentStyle(
              theme === "light" ? "/index.css" : "/index.css,dark"
            );
            //set();
            // console.log(`Editor: ${editor.id} is now initialized.`);
            var freeTiny = document.querySelector(".tox-promotion");
            if (freeTiny) {
              freeTiny.style.display = "none";
            }
          },
          promotion: false, //a note about update
          height: 600,
          skin: skinStyle, //skinSt, //skinStyle,
          //skin: theme === "light" ? "" : "oxide-dark",
          content_css: contentStyle, // conSt, // contentStyle,
          //content_css: "/index.css",
          //content_css: theme === "light" ? "/index.css" : "/index.css,dark",
          browser_spellcheck: true,
          language: "en",
          image_title: true,
          image_caption: true,
          language_url: "/tinymce/langs/es.js",
          file_picker_types: "file image media",
          //automatic_uploads: true,
          //URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
          //images_upload_url: "/api/image/upload", //might be omitted
          //menubar: false,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",

            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "autoresize",
          ],
          toolbar:
            "paste undo redo remove blocks bullist numlist  alignleft aligncenter alignright alignjustify link code preview |" +
            "bold italic forecolor | outdent indent  | removeformat  | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

      {/*       <button type="button" onClick={log}>
        Log editor content
      </button> */}
    </>
  );
}
