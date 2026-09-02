import { useEffect, useState } from "react";
import NotesCard from "./components/NotesCard";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [allNotes, setAllNotes] = useState([]);
  const [updateNoteId, setUpdateNoteId] = useState(null);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateNoteId) {
      try {
        const res = await axios.put(
          `http://localhost:3000/notes/update/${updateNoteId}`,
          formData,
        );
        getAllNotes();
        setFormData({ title: "", description: "" });
        setUpdateNoteId(null);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3000/notes/create",
          formData,
        );
        console.log("Note added:", res.data);
        getAllNotes();
        setFormData({ title: "", description: "" });
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  let getAllNotes = async () => {
    try {
      let res = await axios.get("http://localhost:3000/notes/getNotes");
      setAllNotes(res.data.getNotes);
    } catch (error) {
      console.log("error in get all notes api", error);
    }
  };

  let updateNote = async (note) => {
    setUpdateNoteId(note._id);
    setFormData({ title: note.title, description: note.description });
  };

  let deleteNote = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:3000/notes/delete/${id}`);
      getAllNotes();
    } catch (error) {
      console.log("error in delete note", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-8">
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500">
                Notes
              </p>
              <h1 className="text-3xl font-bold text-slate-800">
                {updateNoteId ? "Update note" : "Create note"}
              </h1>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Title
                </label>

                <input
                  name="title"
                  value={formData.title}
                  type="text"
                  placeholder="Enter note title"
                  onChange={onChangeHandler}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  rows="5"
                  placeholder="Write your note..."
                  onChange={onChangeHandler}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:from-indigo-500 hover:to-blue-500 active:scale-[0.99]"
              >
                {updateNoteId ? "Update Note" : "Add Note"}
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-5 flex items-center justify-between gap-3 px-1">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Overview
              </p>
              <h2 className="text-2xl font-bold text-slate-800">Your notes</h2>
            </div>

            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              {allNotes.length} total
            </span>
          </div>

          <div className="space-y-4">
            {allNotes.length > 0 ? (
              allNotes.map((note) => (
                <NotesCard
                  key={note._id}
                  note={note}
                  deleteNote={deleteNote}
                  updateNote={updateNote}
                />
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500 shadow-sm">
                No notes yet. Add your first note to get started.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
