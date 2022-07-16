import * as React from 'react';
import { getInitialData } from './utils';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/form';
import ActiveNotes from './components/active-note';
import Archive from './components/archive';

function App() {
  const [ notes, setNotes ] = React.useState(getInitialData());
  const [ selectNote, setSelectNote ] = React.useState(false);

  const onAddNote = () => {
    const newNote = {
      id: +new Date(),
      title: "Note Title",
      body: "",
      archived: false,
      createdAt: +new Date(),
    };

    setNotes([newNote, ...notes]);
    setSelectNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatednote) => {
    const updatedNotes = notes.map(note => {
      if (note.id === updatednote.id) {
        return updatednote;
      }
      return note;
    }
    );
    setNotes(updatedNotes);
  }

  const getSelectNote = () => {
    return notes.find(({id}) => id === selectNote);
  }

  const archivedNotes = notes.filter(({archived}) => archived);
  const notArchivedNotes = notes.filter(({archived}) => !archived);

  const onArchiveNote = (noteId) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          archived: true,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  }

  const onUnarchiveNote = (noteId) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          archived: false,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  }

  return (
    <div className="d-flex justify-content-start bg-light">
      <ActiveNotes
        notes={notArchivedNotes}
        onAddNote={onAddNote}
        onArchiveNote={onArchiveNote}
        onDeleteNote={onDeleteNote}
        activeNote={selectNote}
        setActiveNote={setSelectNote}
      />
      
      <Archive
        notes={archivedNotes}
        onUnarchiveNote={onUnarchiveNote}
        onDeleteNote={onDeleteNote}
        activeNote={selectNote}
        setActiveNote={setSelectNote}
      />
      
      <Form activeNote={getSelectNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
