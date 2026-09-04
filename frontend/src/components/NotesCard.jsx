const NotesCard = ({ note, deleteNote, updateNote }) => {
  return (
    <article className="w-full rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(79,70,229,0.12)]">
      <div className="mb-5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-indigo-500">
          Note
        </p>
        <h2 className="mb-2 text-xl font-semibold text-slate-800">
          {note.title}
        </h2>

        <p className="note-description text-sm leading-7 text-slate-600">
          {note.description}
        </p>
      </div>                

      <div className="flex gap-3 border-t border-slate-100 pt-4">
        <button
          onClick={() => updateNote(note)}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-indigo-500"
        >
          Update
        </button>

        <button
          onClick={() => deleteNote(note._id)}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-400"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default NotesCard;
