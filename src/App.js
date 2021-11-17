import React, { useEffect, useReducer } from "react";
import { API } from "aws-amplify";
import { List, Input, Button } from "antd";
import "antd/dist/antd.css";
import { v4 as uuid } from "uuid";
import { listNotes } from "./graphql/queries";
import {
  onCreateNote,
  onDeleteNote,
  onUpdateNote,
} from "./graphql/subscriptions";
import {
  updateNote as UpdateNote,
  createNote as CreateNote,
  deleteNote as DeleteNote,
} from "./graphql/mutations";
import { reducer, initialState } from './Reducer.js'
import "./App.css";


const CLIENT_ID = uuid();


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchNotes = async () => {
    try {
      const notesData = await API.graphql({
        query: listNotes,
      });
      dispatch({ type: "SET_NOTES", notes: notesData.data.listNotes.items });
    } catch (err) {
      console.error(err);
      dispatch({ type: "ERROR" });
    }
  };
  

  const createNote = async () => {
    const { form } = state; //destructuring - form element out of state

    if (!form.name || !form.description) {
      return alert("please enter a name and description");
    }

    const note = { ...form, clientId: CLIENT_ID, completed: false, id: uuid() };
    dispatch({ type: "ADD_NOTE", note });
    dispatch({ type: "RESET_FORM" });

    try {
      await API.graphql({
        query: CreateNote,
        variables: { input: note },
      });
      console.log("successfully created note!");
    } catch (err) {
      console.error(err);
    }
  };


  const deleteNote = async ({ id }) => {
    try {
      await API.graphql({
        query: DeleteNote,
        variables: { input: { id } },
      });
      console.log("successfully deleted note!");
    } catch (err) {
      console.error(err);
    }
  };

  const updateNote = async (note) => {
    const index = state.notes.findIndex((n) => n.id === note.id);
    const notes = [...state.notes];
    notes[index].completed = !notes[index].completed;
    console.log(index +1)
    try {
      await API.graphql({
        query: UpdateNote,
        variables: { input: { id: note.id, completed: notes[index].completed } },
      });
      console.log("note successfully updated!");
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) => {
    dispatch({ type: "SET_INPUT", name: e.target.name, value: e.target.value });
  };



  useEffect(() => {
    fetchNotes();
    const createSubscription = API.graphql({
      query: onCreateNote,
    }).subscribe({
      next: (noteData) => {
        const note = noteData.value.data.onCreateNote;
        if (CLIENT_ID === note.clientId) return;
        dispatch({ type: "ADD_NOTE", note });
      },
    });

    const deleteSubscription = API.graphql({
      query: onDeleteNote,
    }).subscribe({
      next: (noteData) => {
        const noteId = noteData.value.data.onDeleteNote.id;
        dispatch({ type: "REMOVE_NOTE", id: noteId });
      },
    });
    
    const updateSubscription = API.graphql({
      query: onUpdateNote,
    }).subscribe({
      next: (noteData) => {
        const id = noteData.value.data.onUpdateNote.id;
        console.log(id);
        dispatch({ type: "UPDATE_NOTE", updatedNote: id });
      },
    });

    return () => {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
      updateSubscription.unsubscribe();
    };
  }, []);

  const styles = {
    container: { padding: 20 },
    input: { marginBottom: 10 },
    item: { textAlign: "left" },
    p: { color: "#1890ff" },
  };

  const sort = ()=>{
dispatch({ type: 'SORT' })
console.log('here')
  }


  const renderItem = (item) => {
    return (
          
      <List.Item
        style={styles.item}
        actions={[
          <p style={styles.p} onClick={() => deleteNote(item)}>
            Delete
          </p>,
          <p style={styles.p} onClick={() => updateNote(item)}>
            {item.completed ? "task is completed" : "task needs completion"}
          </p>,
        ]}
      >
        <List.Item.Meta title={item.name} description={item.description} />
      </List.Item>
            
   );
  };

  return (
    <div style={styles.container}>
      <Input
        onChange={onChange}
        value={state.form.name}
        placeholder="Note Name"
        name="name"
        style={styles.input}
      />
      <Input
        onChange={onChange}
        value={state.form.description}
        placeholder="Note description"
        name="description"
        style={styles.input}
      />
      <Button onClick={createNote} type="primary">
        Create Note
      </Button>
      <hr />
      <Button onClick ={sort} type="primary">
        Sort 
        </Button>
      <hr />
      <h2>
        {0} completed / {0} total
      </h2>
      <hr />
      <List
        loading={state.loading}
        dataSource={state.notes}
        renderItem={renderItem}
      />
    </div>
  );
};

export default App;
