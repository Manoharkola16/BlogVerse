import React, { useState } from "react";
import { FiX } from "react-icons/fi";

export default function CreateBlogModal({ open, onClose, onPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!open) return null;

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return;

    onPost(title, content);

    // Reset fields after posting
    setTitle("");
    setContent("");
  };

  return (
    <>
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl w-full max-w-lg shadow-xl p-6 space-y-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Create Blog</h3>

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-3">

            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter your blog title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Content
              </label>
              <textarea
                rows="5"
                placeholder="Share your story..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">

            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handlePost}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Post
            </button>

          </div>

        </div>
      </div>
    </>
  );
}
