import { showFormattedDate } from '../../utils';

const Archive = ({
    notes,
    onUnarchiveNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
    return (
      <div className="container border border-light border-opacity-10">
        <div className="">
          <h1>Archive</h1>
        </div>
        {sortedNotes.length === 0 ? 'No Note' : 
        <div className="menu-notes">
          {sortedNotes.map(({ id, title, body, lastModified, createdAt }, i) => (
            <div
              className={`menu-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
            >
              <div className="d-flex justify-content-between">
                <strong>{title}</strong>
                <div>
                <button className='btn btn-warning me-2' onClick={(e) => onUnarchiveNote(id)}>Move Note</button>
                <button className='btn btn-danger' onClick={(e) => onDeleteNote(id)}>Delete</button>
                </div>
              </div>
  
              <p>{body && body.substr(0, 100) + "..."}</p>
              <small className="note-meta">
                {lastModified === undefined? showFormattedDate(createdAt) : showFormattedDate(lastModified)}
              </small>
            </div>
          ))}
        </div>}
      </div>
    );
  };
  
  export default Archive;