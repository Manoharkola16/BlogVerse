


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiBell,
  FiEdit3,
  FiUserPlus,
  FiSettings,
  FiUser,
  FiPlus,
  FiMessageCircle,
  FiBookmark,
  FiX,
  FiHeart,
} from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai"; // filled heart for liked state

/* -------------------------
   Sample data
   ------------------------- */
const initialPosts = [
  {
    id: 1,
    title: "A morning routine that works",
    content:
      "Tiny habits compound. This post explains a 10-minute routine that helped me ship more.",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    title: "Design systems for small teams",
    content:
      "You don't need a giant design system to get consistent UI — here are pragmatic steps.",
    likes: 8,
    comments: 2,
  },
  {
    id: 3,
    title: "Why I love writing",
    content: "Writing helps me think. Short notes > long procrastinated drafts.",
    likes: 5,
    comments: 1,
  },
  {
    id: 4,
    title: "How to write better headlines",
    content:
      "Headlines are the gatekeepers — this short guide will help you write clearer headlines.",
    likes: 20,
    comments: 6,
  },
  {
    id: 5,
    title: "Small design decisions that scale",
    content:
      "Consistency is not about rules, it's about predictable choices. A few rules to follow.",
    likes: 7,
    comments: 0,
  },
];

/* -------------------------
   Initial lists for panel state
   ------------------------- */
const initialNotifications = [
  "Priya commented on your post.",
  "You have 3 new followers.",
  "Your blog 'Daily Writing Habits' reached 1k views!",
  "Alex liked your recent blog.",
  "New recommendation: 'Top 10 productivity hacks'.",
  "Your profile was viewed 12 times today.",
  "Reminder: Finish your draft 'Travel Diaries'.",
  "Weekly digest is ready.",
  "New message from Sara.",
  "System: maintenance tonight.",
];

const initialRecentSearches = [
  "Productivity blogs",
  "Travel stories",
  "Tech trends 2025",
  "Minimalist lifestyle",
  "Personal finance tips",
  "Photography blogs",
  "Health & wellness",
];

/* -------------------------
   UI pieces
   ------------------------- */

function NavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-[15px] font-medium transition
        ${
          active
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`}
    >
      <Icon className="text-lg" />
      <span>{label}</span>
    </button>
  );
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments] = useState(post.comments);

  const toggleLike = () => {
    setLiked((v) => !v);
    setLikes((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <article className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.content}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          Posted • <span className="font-medium">2h</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleLike}
            className="flex items-center gap-2 focus:outline-none"
            aria-label="Like"
          >
            {liked ? (
              <AiFillHeart className="text-2xl text-red-500" />
            ) : (
              <FiHeart className="text-lg text-gray-500" />
            )}
            <span className={`${liked ? "text-red-500" : "text-gray-500"} text-xs`}>
              {likes}
            </span>
          </button>

          <button className="flex items-center gap-2 text-gray-500">
            <FiMessageCircle className="text-lg" />
            <span className="text-xs">{comments}</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500">
            <FiBookmark className="text-lg" />
            <span className="text-xs">Save</span>
          </button>
        </div>
      </div>
    </article>
  );
}

/* -------------------------
   Left Sidebar (stable & moved upward)
   ------------------------- */

function LeftSidebar({
  activeNav,
  setActiveNav,
  openSearch,
  openNotifications,
  openCreateBlog,
  onMyProfileClick,
  onHomeClick,
}) {
  return (
    // Make the left sidebar non-scrollable and aligned to top
    <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
      <div className="sticky top-4 flex flex-col items-center py-6 gap-6">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-purple-700 text-white flex items-center justify-center text-lg font-bold">
            B
          </div>
          <span className="font-semibold text-xl">BlogVerse</span>
        </div>

        {/* PROFILE */}
        <div className="flex flex-col items-center gap-3">
          <img
            src="/mnt/data/Screenshot 2025-11-19 133021.png"
            alt="profile"
            className="w-28 h-28 rounded-full object-cover shadow"
          />

          <span className="font-semibold text-lg">UserName</span>
          <span className="text-gray-500 -mt-2 text-sm">@yourhandle</span>

          {/* STATS (Posts, Followers, Following) */}
          <div className="mt-3 grid grid-cols-3 gap-6 text-center text-sm">
            <div>
              <div className="font-semibold text-gray-900">10</div>
              <div className="text-gray-500 text-xs">Posts</div>
            </div>

            <div>
              <div className="font-semibold text-gray-900">100</div>
              <div className="text-gray-500 text-xs">Followers</div>
            </div>

            <div>
              <div className="font-semibold text-gray-900">1.2k</div>
              <div className="text-gray-500 text-xs">Following</div>
            </div>
          </div>

          <button
            onClick={onMyProfileClick}
            className="mt-2 px-6 py-2 rounded-full bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium shadow"
          >
            My Profile
          </button>
        </div>

        {/* NAV MENU */}
        <nav className="w-full px-6 flex flex-col gap-3">
          <NavButton
            icon={FiHome}
            label="Home"
            active={activeNav === "home"}
            onClick={onHomeClick}
          />
          <NavButton icon={FiSearch} label="Search" active={activeNav === "search"} onClick={openSearch} />
          <NavButton icon={FiBell} label="Notifications" active={activeNav === "notifications"} onClick={openNotifications} />
          <NavButton icon={FiEdit3} label="Create Blog" active={activeNav === "create"} onClick={openCreateBlog} />
          <NavButton icon={FiUserPlus} label="Add Friends" active={activeNav === "friends"} onClick={() => setActiveNav("friends")} />
          <NavButton icon={FiSettings} label="Settings" active={activeNav === "settings"} onClick={() => setActiveNav("settings")} />
        </nav>
      </div>
    </aside>
  );
}

/* -------------------------
   Right Profile Card (Edit + extra info)
   ------------------------- */

function RightProfileCard({ name = "UserName", handle = "@yourhandle", posts = 10, followers = 100, following = "1.2k" }) {
  return (
    <aside className="w-80">
      <div className="sticky top-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          {/* Avatar with soft purple ring */}
          <div className="flex justify-center mb-4">
            <div className="rounded-full p-4 bg-purple-100">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-lg">
                B
              </div>
            </div>
          </div>

          {/* Name + handle */}
          <div className="text-center mb-4">
            <div className="font-semibold text-lg">{name}</div>
            <div className="text-gray-500 text-sm mt-1">{handle}</div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <div className="text-xs text-gray-500">Posts</div>
              <div className="font-semibold mt-1">{posts}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Followers</div>
              <div className="font-semibold mt-1">{followers}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Following</div>
              <div className="font-semibold mt-1">{following}</div>
            </div>
          </div>

          {/* Edit button */}
          <div>
            <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-medium shadow">
              Edit
            </button>
          </div>

          {/* Extra area below */}
          <div className="mt-4 text-sm text-gray-600">
            <div className="mb-2"><strong>Bio:</strong> Passionate writer & designer. Sharing ideas one post at a time.</div>
            <div className="text-xs text-gray-400">Member since Jan 2024</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* -------------------------
   SlidePanel component
   - left slide panel inset from top & bottom (top-16 bottom-16)
   - small semicircles simulated with 2 absolute circles overlapping right edge
   - Search panel: red Clear All beside Recent searches (clears recent + input)
   - Notifications panel: red Clear All in header (clears notifications)
   ------------------------- */
function SlidePanel({
  type,
  onClose,
  notificationsState,
  setNotificationsState,
  recentSearchesState,
  setRecentSearchesState,
}) {
  const isOpen = type !== null;
  const [searchInput, setSearchInput] = useState("");

  const clearRecentSearches = () => {
    setRecentSearchesState([]);
    setSearchInput("");
  };

  const clearNotifications = () => {
    setNotificationsState([]);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed left-0 top-16 bottom-16 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 overflow-hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          display: "flex",
          flexDirection: "column",
          borderTopRightRadius: "0.9rem",
          borderBottomRightRadius: "0.9rem",
        }}
      >
        {/* small semicircle top-right */}
        <div
          aria-hidden="true"
          className="absolute right-[-16px] top-6 w-8 h-8 bg-white rounded-full shadow-sm"
          style={{ pointerEvents: "none" }}
        />

        {/* small semicircle bottom-right */}
        <div
          aria-hidden="true"
          className="absolute right-[-16px] bottom-6 w-8 h-8 bg-white rounded-full shadow-sm"
          style={{ pointerEvents: "none" }}
        />

        {/* header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">
              {type === "search" ? "Search" : "Notifications"}
            </h3>

            {type === "notifications" && (
              <span className="text-xs text-gray-500">{notificationsState.length} items</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* For notifications show red Clear All in header */}
            {type === "notifications" && (
              <button
                onClick={clearNotifications}
                className="text-xs px-2 py-1 rounded-md border border-red-100 text-red-600 bg-red-50 hover:bg-red-100 transition"
                title="Clear all notifications"
              >
                Clear All
              </button>
            )}

            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <FiX />
            </button>
          </div>
        </div>

        {/* content area (scrollable) */}
        <div className="p-4 overflow-y-auto flex-1 min-h-0 space-y-4">
          {/* Search Panel */}
          {type === "search" && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Search posts
                </label>

                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                  <FiSearch className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search BlogVerse..."
                    className="w-full text-sm outline-none"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="text-xs text-gray-500 px-2 py-1 rounded hover:bg-gray-100"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-gray-700">Recent searches</h4>

                  {/* Clear All placed beside Recent searches (red) */}
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs px-2 py-1 rounded-md border border-red-100 text-red-600 bg-red-50 hover:bg-red-100 transition"
                  >
                    Clear All
                  </button>
                </div>

                {recentSearchesState.length === 0 ? (
                  <div className="text-sm text-gray-500">No recent searches.</div>
                ) : (
                  <ul className="space-y-2 text-sm text-gray-700">
                    {recentSearchesState.map((item) => (
                      <li key={item} className="px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {/* Notifications Panel */}
          {type === "notifications" && (
            <>
              <h4 className="text-xs font-semibold text-gray-700 mb-2">Notifications</h4>

              {notificationsState.length === 0 ? (
                <div className="text-sm text-gray-500">No notifications.</div>
              ) : (
                <div className="space-y-3 text-sm">
                  {notificationsState.map((n, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                      {n}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* -------------------------
   Full Layout (Left stable, center scrolls, right sticky)
   ------------------------- */

export default function ProfileLayout() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);
  const [activeNav, setActiveNav] = useState("home");
  const [sidePanel, setSidePanel] = useState(null); // "search" | "notifications" | null
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [query, setQuery] = useState("");

  // Panel-managed state
  const [notificationsState, setNotificationsState] = useState(initialNotifications);
  const [recentSearchesState, setRecentSearchesState] = useState(initialRecentSearches);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.content.toLowerCase().includes(query.toLowerCase())
  );

  function handleOpenSearch() {
    setSidePanel("search");
    setActiveNav("search");
  }
  function handleOpenNotifications() {
    setSidePanel("notifications");
    setActiveNav("notifications");
  }
  function handleOpenCreate() {
    setShowCreateModal(true);
    setActiveNav("create");
  }

  function handleCreatePost(title, content) {
    const newPost = {
      id: Date.now(),
      title,
      content,
      likes: 0,
      comments: 0,
    };
    setPosts((p) => [newPost, ...p]);
    setShowCreateModal(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex h-screen w-full">
        {/* LEFT SIDEBAR (stable, won't scroll) */}
        <LeftSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          openSearch={handleOpenSearch}
          openNotifications={handleOpenNotifications}
          openCreateBlog={handleOpenCreate}
          onMyProfileClick={() => {
            // navigate to profile route - change path here if needed
            navigate("/profile");
          }}
          onHomeClick={() => {
            // navigate to homepage path /home
            navigate("/home");
            setActiveNav("home");
            setSidePanel(null);
            setShowCreateModal(false);
          }}
        />

        {/* CENTER FEED (scrollable) */}
        <main className="flex-1 h-screen overflow-y-auto p-8 flex flex-col gap-6">
          {/* Search + New Post */}
          <div className="flex items-center gap-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="Search posts, titles, content..."
              />
            </div>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow"
            >
              <FiPlus />
              New Post
            </button>
          </div>

          {/* Posts list - more cards */}
          <div className="space-y-4">
            {filtered.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </main>

        {/* RIGHT PROFILE CARD (sticky) */}
        <RightProfileCard name="UserName" handle="@yourhandle" posts={10} followers={100} following="1.2k" />
      </div>

      {/* Create Modal (simple) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/40" onClick={() => setShowCreateModal(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create new post</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                <FiX />
              </button>
            </div>

            <CreatePostForm onPost={handleCreatePost} onCancel={() => setShowCreateModal(false)} />
          </div>
        </div>
      )}

      {/* Slide panel (Search / Notifications) */}
      <SlidePanel
        type={sidePanel}
        onClose={() => setSidePanel(null)}
        notificationsState={notificationsState}
        setNotificationsState={setNotificationsState}
        recentSearchesState={recentSearchesState}
        setRecentSearchesState={setRecentSearchesState}
      />
    </div>
  );
}

/* -------------------------
   CreatePostForm component
   ------------------------- */

function CreatePostForm({ onPost, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = () => {
    if (!title.trim() || !content.trim()) return;
    onPost(title.trim(), content.trim());
    setTitle("");
    setContent("");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2" />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="5" className="w-full border border-gray-200 rounded-lg px-3 py-2 resize-none" />
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700">Cancel</button>
        <button onClick={submit} className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm">Post</button>
      </div>
    </div>
  );
}





