import "./App.css";
import React from "react";
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";

const firebase = require("firebase");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null, // True if the note is selected else false
      notes: null,
    };
  }

  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        ></SidebarComponent>
        {this.state.selectedNote ? (
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          ></EditorComponent>
        ) : null}
      </div>
    );
  }

  // React Hook - Whenever the App component is loaded successfully inside the DOM, this hook will get called automatically by react. It is a life cycle hook that is build into react.
  componentDidMount = () => {
    firebase.default
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  };

  selectNote = (note, index) =>
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  noteUpdate = (id, noteObj) => {
    // console.log(id, noteObj);
    firebase.default.firestore().collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.default.firestore.FieldValue.serverTimestamp(),
    });
  };
  newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };
    const newFromDB = await firebase.default
      .firestore()
      .collection("notes")
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.default.firestore.FieldValue.serverTimestamp(),
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((_note) => _note.id === newID)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    });
  };
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter((_note) => _note !== note),
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({
        selectedNoteIndex: null,
        selectedNote: null,
      });
    } else {
      if (this.state.notes.length >= 1) {
        this.state.selectedNoteIndex < noteIndex
          ? this.selectNote(
              this.state.notes[this.state.selectedNoteIndex],
              this.state.selectedNoteIndex
            )
          : this.selectNote(
              this.state.notes[this.state.selectedNoteIndex - 1],
              this.state.selectedNoteIndex - 1
            );
      } else {
        this.setState({ selectedNote: null, selectedNote: null });
      }
    }
    firebase.default.firestore().collection("notes").doc(note.id).delete();
  };
}

export default App;

/*
1. onSnapshot() - is automatically called whenever the notes collection is updated inside the firebase. Function inside onSnapshot() is called.
2. docs - is a property of serverUpdate object
3. [...this.state.notes, note] - Array of all the previously added note and the new note
4. const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0])
  ->
5. this.state.notes[this.state.selectedNoteIndex - 1] -> means that deselect the deleted note and select no other note
6. this.state.notes.length > 1 -> means we have notes in our database
*/
