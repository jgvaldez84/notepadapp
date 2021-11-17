const initialState = {
  notes: [],
  sortMethod: "AZ",
  loading: true,
  error: false,
  form: { name: "", description: "" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return { ...state, notes: action.notes, loading: false };
    case "ADD_NOTE":
      return { ...state, notes: [action.note, ...state.notes] };
    case "REMOVE_NOTE":
      const newNotes = state.notes.filter((x) => x.id !== action.id);
      return { ...state, notes: newNotes };
      case 'UPDATE_NOTE':
        const updatedNoteIndex = state.notes.findIndex(n => n.id === action.note.id)  
        const notes = [...state.notes]
        if (updatedNoteIndex !== -1) { // note was found
            notes[updatedNoteIndex] = action.note;
        }
        return{...state, notes: notes}
    case "RESET_FORM":
      return { ...state, form: initialState.form };
    case "SET_INPUT":
      return { ...state, form: { ...state.form, [action.name]: action.value } };
    case "SORT":
      let newSortMethod, sortedNotes;
      if (state.sortMethod === "AZ") {
        //sort z-a
        newSortMethod = "ZA";
        // new variable is assigned a new array of sorted notes
        sortedNotes = state.notes.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        newSortMethod = "AZ";
        sortedNotes = state.notes.sort((a, b) => (a.name < b.name ? 1 : -1));
      }
      return { ...state, notes: sortedNotes, sortMethod: newSortMethod };
    case "ERROR":
      return { ...state, loading: false, error: true };
    default:
      return { ...state };
  }
};

export { reducer, initialState };
