const NotesCard = ({ note, deleteNote, updateNote }) => {
  return (
    <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-5">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          {note.title}
        </h2>

        <p className="text-sm leading-6 text-gray-600">
          {note.description.length > 20
            ? note.description.substring(0, 20)
            : note.description}
        </p>
      </div>

      <div className="flex gap-3 border-t border-gray-100 pt-4">
        <button
          onClick={() => updateNote(note)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Update
        </button>

        <button
          onClick={() => deleteNote(note._id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotesCard;
