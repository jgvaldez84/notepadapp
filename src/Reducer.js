const initialState = {
    notes: [
        {
            name: 'walk dog',
            description: 'around the block'
        },
        {
            name: 'light tree',
            description: 'around the block'
        },
        {
            name: 'take out trash',
            description: 'around the block'
        },
    ],
    sortMethod: 'AZ',
    loading: true,
    error: false,
    form: { name: "", description: "" }
  }; 

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return { ...state, notes: action.notes, loading: false };
    case "ADD_NOTE":
      return { ...state, notes: [action.note, ...state.notes] };
    case "REMOVE_NOTE":
      const index = state.notes.findIndex((n) => n.id === action.id);
      const newNotes = [
        ...state.notes.slice(0, index), //filter?
        ...state.notes.slice(index + 1),
      ];
      return { ...state, notes: newNotes };
    case "UPDATE_NOTE":
      const updateIndex = state.notes.findIndex(
        (n) => n.id === action.updatedNote
      );
      const updatedNotes = [...state.notes];
      updatedNotes[updateIndex].completed =
        !updatedNotes[updateIndex].completed;
      console.log(updateIndex);
      console.log(updatedNotes[updateIndex].completed);

      return { ...state, notes: updatedNotes, loading: false };

    case "RESET_FORM":
      return { ...state, form: initialState.form };
    case "SET_INPUT":
      return { ...state, form: { ...state.form, [action.name]: action.value } };
    case "SORT":
        console.log('sort reducer')
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
      console.log(sortedNotes)
      return { ...state, notes: sortedNotes, sortMethod: newSortMethod };
    case "ERROR":
      return { ...state, loading: false, error: true };
    default:
      return { ...state };
  }
};

export {reducer, initialState};