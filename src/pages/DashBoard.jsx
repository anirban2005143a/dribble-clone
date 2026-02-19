import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../Context/Authcontext";
import axios from "axios";
import gsap from "gsap";
import { Plus, Search, Filter, Trash2, Edit2, Check, X } from "lucide-react";
import { showToast } from "../utils/showToast";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import CustomDropdown from "../components/CustomDropdown";

const DashBoard = () => {
  const { userData } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDeleting, setisDeleting] = useState(false);
  const [isToggling, setisToggling] = useState(false);

  const dashboardRef = useRef(null);
  const profileRef = useRef(null);
  const notesContainerRef = useRef(null);

  const token = localStorage.getItem("token");

  const { isAuthenticated } = useContext(AuthContext);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/notes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotes(response.data.notes);
      applyFilters(response.data.notes);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to fetch notes", 0);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and search
  const applyFilters = (notesToFilter = notes) => {
    let filtered = notesToFilter;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (note.tags &&
            note.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            )),
      );
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((note) => note.category === filterCategory);
    }

    // Priority filter
    if (filterPriority !== "all") {
      filtered = filtered.filter((note) => note.priority === filterPriority);
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((note) =>
        filterStatus === "completed" ? note.isCompleted : !note.isCompleted,
      );
    }

    setFilteredNotes(filtered);
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Create note
  const handleCreateNote = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/notes`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotes([response.data.note, ...notes]);
      applyFilters([response.data.note, ...notes]);
      setShowForm(false);
      showToast("Note created successfully", 1);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to create note", 0);
    }
  };

  // Update note
  const handleUpdateNote = async (formData) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/notes/${editingNote._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotes(
        notes.map((n) => (n._id === editingNote._id ? response.data.note : n)),
      );
      applyFilters(
        notes.map((n) => (n._id === editingNote._id ? response.data.note : n)),
      );
      setEditingNote(null);
      setShowForm(false);
      showToast("Note updated successfully", 1);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update note", 0);
    }
  };

  // Delete note
  const handleDeleteNote = async (noteId) => {
    try {
      setisDeleting(noteId);
      await axios.delete(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/notes/${noteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const updatedNotes = notes.filter((n) => n._id !== noteId);
      setNotes(updatedNotes);
      applyFilters(updatedNotes);
      showToast("Note deleted successfully", 1);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to delete note", 0);
    } finally {
      setisDeleting(false);
    }
  };

  // Toggle note completion
  const handleToggleComplete = async (noteId, currentStatus) => {
    try {
      setisToggling(noteId);
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/notes/${noteId}`,
        { isCompleted: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotes(notes.map((n) => (n._id === noteId ? response.data.note : n)));
      applyFilters(
        notes.map((n) => (n._id === noteId ? response.data.note : n)),
      );
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update note", 0);
    } finally {
      setisToggling(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    applyFilters();
  }, [searchQuery, filterCategory, filterPriority, filterStatus]);

  if (!isAuthenticated) return;

  return (
    <>
      <ToastContainer />
      <div ref={dashboardRef} className="min-h-screen bg-slate-900 pt-20 pb-12">
        <div className="container mx-auto max-w-7xl px-4">
          {/* ================= PROFILE SECTION ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            ref={profileRef}
            className="mb-10 backdrop-blur-xl bg-white/5 rounded-2xl shadow-xl p-6 md:p-8 border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-semibold text-white mb-1">
                  Welcome, {userData?.fullname?.firstname}
                </h1>

                <p className="text-slate-400 text-sm mb-4">{userData?.email}</p>

                <div className="flex flex-wrap gap-3">
                  {/* Total Notes */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-md rounded-lg px-4 py-3 border border-white/10 hover:bg-white/10 "
                  >
                    <p className="text-slate-400 text-xs">Total Notes</p>
                    <p className="text-white text-xl font-semibold">
                      {notes.length}
                    </p>
                  </motion.div>

                  {/* Completed */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-md rounded-lg px-4 py-3 border border-white/10 hover:bg-white/10 "
                  >
                    <p className="text-slate-400 text-xs">Completed</p>
                    <p className="text-emerald-400 text-xl font-semibold">
                      {notes.filter((n) => n.isCompleted).length}
                    </p>
                  </motion.div>

                  {/* Pending */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-md rounded-lg px-4 py-3 border border-white/10 hover:bg-white/10 "
                  >
                    <p className="text-slate-400 text-xs">Pending</p>
                    <p className="text-rose-400 text-xl font-semibold">
                      {notes.filter((n) => !n.isCompleted).length}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 p-1 shadow-lg">
                  <img
                    src="/user.png"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ================= NOTES SECTION ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-white">Your Notes</h2>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingNote(null);
                  setShowForm(true);
                }}
                className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:opacity-90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                New Note
              </motion.button>
            </div>

            {/* ================= FILTER SECTION ================= */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10
             backdrop-blur-xl bg-white/5
             rounded-2xl p-6 border border-white/10
             shadow-lg"
            >
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-xs tracking-wide text-slate-400 mb-2">
                  Search
                </label>

                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 
                         text-slate-400 group-focus-within:text-indigo-400 transition"
                  />

                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-9 pr-4 py-2.5
                   bg-white/5 text-sm text-white
                   rounded-xl border border-white/10
                   placeholder:text-slate-500
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500
                   hover:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <CustomDropdown
                label="Category"
                value={filterCategory}
                setValue={setFilterCategory}
                options={[
                  { label: "All", value: "all" },
                  { label: "Personal", value: "personal" },
                  { label: "Work", value: "work" },
                  { label: "Urgent", value: "urgent" },
                  { label: "Idea", value: "idea" },
                  { label: "Other", value: "other" },
                ]}
              />

              {/* Priority */}
              <CustomDropdown
                label="Priority"
                value={filterPriority}
                setValue={setFilterPriority}
                options={[
                  { label: "All", value: "all" },
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                ]}
              />

              {/* Status */}
              <CustomDropdown
                label="Status"
                value={filterStatus}
                setValue={setFilterStatus}
                options={[
                  { label: "All", value: "all" },
                  { label: "Pending", value: "pending" },
                  { label: "Completed", value: "completed" },
                ]}
              />
            </motion.div>

            {/* ================= NOTES GRID ================= */}
            {loading ? (
              <div className="flex justify-center items-center h-40 z-0 relative ">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
              </div>
            ) : filteredNotes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className=" flex flex-col items-center justify-center h-40  bg-white/5 rounded-xl border border-white/10"
              >
                <p className="text-slate-400 text-sm mb-3">No notes found</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditingNote(null);
                    setShowForm(true);
                  }}
                  className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Create Note
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                ref={notesContainerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredNotes.map((note, index) => (
                  <motion.div
                    key={note._id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <NoteCard
                      note={note}
                      onEdit={() => {
                        setEditingNote(note);
                        setShowForm(true);
                      }}
                      onDelete={() => handleDeleteNote(note._id)}
                      onToggleComplete={() =>
                        handleToggleComplete(note._id, note.isCompleted)
                      }
                      isDeleting={isDeleting === note._id}
                      isToggling={isToggling === note._id}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ================= MODAL ================= */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <NoteForm
              note={editingNote}
              onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
              onClose={() => {
                setShowForm(false);
                setEditingNote(null);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DashBoard;
