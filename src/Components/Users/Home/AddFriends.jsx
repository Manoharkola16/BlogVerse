import React, { useState } from "react";

const initialRequests = [
  {
    id: 1,
    name: "Sarah Mitchell",
    username: "@sarahmitchell",
    mutual: 24,
    time: "2h ago",
    title: "Product Designer at TechCorp",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Michael Chen",
    username: "@michaelchen",
    mutual: 18,
    time: "5h ago",
    title: "Software Engineer at Google",
    location: "Mountain View, CA",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    username: "@emilyrodriguez",
    mutual: 31,
    time: "1d ago",
    title: "Marketing Manager at Meta",
    location: "New York, NY",
  },
  {
    id: 4,
    name: "David Thompson",
    username: "@davidthompson",
    mutual: 12,
    time: "1d ago",
    title: "Data Scientist at Amazon",
    location: "Seattle, WA",
  },
  {
    id: 5,
    name: "Jessica Park",
    username: "@jessicapark",
    mutual: 9,
    time: "2d ago",
    title: "UX Researcher at Apple",
    location: "Cupertino, CA",
  },
  {
    id: 6,
    name: "Ryan Martinez",
    username: "@ryanmartinez",
    mutual: 15,
    time: "3d ago",
    title: "Creative Director at Adobe",
    location: "Los Angeles, CA",
  },
];

export default function AddFriends() {
  const [requests, setRequests] = useState(
    initialRequests.map((r) => ({ ...r, status: "pending" })) // pending | accepted | declined
  );
  const [activeTab, setActiveTab] = useState("all"); // all | accepted | declined
  const [search, setSearch] = useState("");

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const acceptedCount = requests.filter((r) => r.status === "accepted").length;
  const declinedCount = requests.filter((r) => r.status === "declined").length;

  function handleAction(id, status) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }

  function getFilteredRequests() {
    let list;
    if (activeTab === "all") {
      list = requests.filter((r) => r.status === "pending");
    } else if (activeTab === "accepted") {
      list = requests.filter((r) => r.status === "accepted");
    } else {
      list = requests.filter((r) => r.status === "declined");
    }

    if (!search.trim()) return list;

    const term = search.toLowerCase();
    return list.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.username.toLowerCase().includes(term) ||
        r.location.toLowerCase().includes(term)
    );
  }

  const visibleRequests = getFilteredRequests();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Full-width main container */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-8 pt-8 pb-4 bg-white border-b">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Friend Requests
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your pending friend requests
              </p>

              {/* Tabs */}
              <div className="mt-5 inline-flex bg-gray-100 rounded-full p-1 text-sm font-medium">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${
                    activeTab === "all"
                      ? "bg-white shadow text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  All Requests
                  <span className="inline-flex items-center justify-center text-xs rounded-full bg-purple-100 text-purple-700 px-2 py-0.5">
                    {pendingCount}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("accepted")}
                  className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${
                    activeTab === "accepted"
                      ? "bg-white shadow text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  Sent Requests
                  <span className="inline-flex items-center justify-center text-xs rounded-full bg-gray-200 text-gray-700 px-2 py-0.5">
                    {acceptedCount}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("declined")}
                  className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${
                    activeTab === "declined"
                      ? "bg-white shadow text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  Suggestions
                  <span className="inline-flex items-center justify-center text-xs rounded-full bg-gray-200 text-gray-700 px-2 py-0.5">
                    {declinedCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Search bar */}
            <div className="w-full md:w-80">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  🔍
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search requests..."
                  className="w-full pl-9 pr-3 py-2 rounded-full border border-gray-300 text-sm outline-none bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Requests grid */}
        <main className="flex-1 px-8 py-6">
          {visibleRequests.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">
              No requests in this section.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleRequests.map((req) => (
                <FriendCard
                  key={req.id}
                  request={req}
                  onAccept={() => handleAction(req.id, "accepted")}
                  onDecline={() => handleAction(req.id, "declined")}
                  disabled={req.status !== "pending"}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function FriendCard({ request, onAccept, onDecline, disabled }) {
  const statusLabel =
    request.status === "accepted"
      ? "Accepted"
      : request.status === "declined"
      ? "Declined"
      : "Pending";

  const statusColor =
    request.status === "accepted"
      ? "text-green-600 bg-green-50"
      : request.status === "declined"
      ? "text-red-600 bg-red-50"
      : "text-yellow-600 bg-yellow-50";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-lg bg-black" />
          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white bg-green-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">
                {request.name}
              </div>
              <div className="text-xs text-gray-500">
                {request.username}
              </div>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}
            >
              {statusLabel}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span>👥 {request.mutual} mutual friends</span>
            <span>• {request.time}</span>
          </div>
        </div>
      </div>

      {/* Job / location */}
      <div className="text-xs text-gray-500 mt-1 ml-16">
        {request.title} • {request.location}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-3 ml-16">
        <button
          onClick={onAccept}
          disabled={disabled}
          className={`px-5 py-2 rounded-full text-sm font-medium transition 
            ${
              disabled
                ? "bg-purple-200 text-white cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          disabled={disabled}
          className={`px-5 py-2 rounded-full text-sm font-medium transition 
            ${
              disabled
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Decline
        </button>
      </div>
    </div>
  );
}


