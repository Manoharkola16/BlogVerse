
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { getAllBlogs, toggleLike, addComment } from "../../../BlogSlice";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import RightProfileCard from "./RightProfileCard";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { blogs, loading } = useSelector((state) => state.blogs);

  const [openPost, setOpenPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  // User post count
  const userPostsCount =
    blogs?.filter((b) => b?.author?._id === user?._id).length || 0;

  // Like
  const handleLike = (id) => dispatch(toggleLike(id));

  // Submit comment
  const handleSubmitComment = (blogId) => {
    if (!commentText.trim()) return;
    dispatch(addComment({ articleId: blogId, comment: commentText }));
    setCommentText("");
  };

  // Toggle comment box
  const toggleComments = (id) =>
    setOpenPost((prev) => (prev === id ? null : id));

  // Get author name safely
  const getAuthorName = (blog) =>
    user?.user?.username || user?.username || "Unknown User";

  // Get avatar with profile photo
  const getAvatar = (blog) => (
    <img
      src={
        user?.user?.profilePhoto
          ? `data:image/jpeg;base64,${user.user.profilePhoto}`
          : user?.profilePhoto
          ? `data:image/jpeg;base64,${user.profilePhoto}`
          : "/default-avatar.png"
      }
      alt="photo"
      className="w-12 h-12 rounded-full object-cover shadow"
    />
  );

  return (
    <div className="flex">
      <Navbar />

      <main className="flex-1 bg-gray-100 p-6 h-screen overflow-y-scroll">
        <h2 className="text-2xl font-bold mb-4">Your Posts</h2>

        {loading && <p>Loading blogs...</p>}

        <div className="space-y-6">
          {blogs?.map((blog) => {
            const isLiked = blog.likes?.includes(user?._id);

            return (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-gray-200"
              >
                {/* USER SECTION */}
                <div className="flex items-center gap-3 mb-4">
                  {getAvatar(blog)}
                  <div>
                    <p className="font-semibold text-lg">{getAuthorName(blog)}</p>
                    {/* <p className="text-xs text-gray-400">Author</p> */}
                    <p className="text-xs text-gray-400">
                    {user?.user?.email || user?.email}
                    </p>

                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {blog.title}
                </h3>

                {/* CONTENT */}
                <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </p>

                {/* LIKE / COMMENT BUTTONS */}
                <div className="flex items-center gap-8 mt-3 border-t pt-4">
                  <button
                    onClick={() => handleLike(blog._id)}
                    className={`flex items-center gap-2 text-lg transition ${
                      isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
                    }`}
                  >
                    <FiHeart className={`${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <span className="text-sm">{blog.likes?.length || 0}</span>
                  </button>

                  <button
                    onClick={() => toggleComments(blog._id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition text-lg"
                  >
                    <FiMessageCircle />
                    <span className="text-sm">{blog.comments?.length || 0}</span>
                  </button>
                </div>

                {/* COMMENTS SECTION */}
                {openPost === blog._id && (
                  <div className="mt-5 space-y-4 bg-gray-50 p-4 rounded-xl border">
                    {/* INPUT BOX */}
                    <div className="flex gap-3">
                      <input
                        className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button
                        onClick={() => handleSubmitComment(blog._id)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                      >
                        Post
                      </button>
                    </div>

                    {/* COMMENTS LIST */}
                    <div className="space-y-3">
                      {blog.comments?.length ? (
                        blog.comments.map((c, i) => (
                          <div
                            key={i}
                            className="bg-white p-3 rounded-lg border shadow-sm text-sm"
                          >
                            <b className="text-gray-800">
                              {c.username || user?.user?.username}:
                            </b>{" "}
                            <span className="text-gray-700">{c.text}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No comments yet.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* RIGHT PROFILE SIDEBAR */}
      <RightProfileCard postsCount={userPostsCount} />
    </div>
  );
}
