'use client';
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { motion } from 'framer-motion';

const DescriptionInput: React.FC = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="my-4">
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700"
      >
        Description *
      </label>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-md"
      >
        <Editor
          apiKey="4ux6dijfbh20ycphdxwp7f1fzjbu7uaiga53zzhji5eq069d" // Replace with your TinyMCE API key or use a free trial
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            height: 200,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </motion.div>
    </div>
  );
};

export default DescriptionInput;
