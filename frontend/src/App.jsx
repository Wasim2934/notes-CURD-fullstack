import { useEffect, useState } from "react";
import NotesCard from "./components/NotesCard";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState([]);
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
    <div className="flex gap-10 p-10">
      <div>
        <div className="w-100 flex flex-col h-screen gap-10 max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="mb-5 text-xl font-bold text-gray-800">Create Note</h1>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                name="title"
                value={formData.title}
                type="text"
                placeholder="Enter note title"
                onChange={onChangeHandler}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                rows="5"
                placeholder="Write your note..."
                onChange={onChangeHandler}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
              onClick={handleSubmit}
            >
              {updateNoteId ? "Update Note" : "Add Note"}
            </button>
          </form>
        </div>
      </div>

      <div className="flex w-full flex-col gap-5">
        {allNotes.map((note) => (
          <NotesCard
            key={note._id}
            note={note}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
