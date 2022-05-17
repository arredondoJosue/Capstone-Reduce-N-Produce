import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  userInfo: {},
  allUsers: [],
  tasks: [],
  notes: [],
  agenda: [],
  callings: [],
  popoverTask: false,
  popoverNote: false,
};

export const userSlice = createSlice({
  name: "globalStore",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
      console.log(state.allUsers);
    },
    setTasks: (state, action) => {
      state.tasks.push(action.payload);
      console.log(state.tasks);
    },
    setNotes: (state, action) => {
      state.notes.push(action.payload);
    },
    setAgenda: (state, action) => {
      state.agenda = action.payload;
      console.log("HIT AGENDA SLICE: ", state.agenda);
    },
    setCallings: (state, action) => {
      state.callings.push(action.payload);
      console.log(state.callings);
    },
    setPopoverTask: (state, action) => {
      state.popoverTask = action.payload;
      console.log(state.popoverTask);
    },
    setPopoverNote: (state, action) => {
      state.popoverNote = action.payload;
      console.log(state.popoverNote);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setUserInfo,
  setAllUsers,
  setTasks,
  setNotes,
  setAgenda,
  setCallings,
  setPopoverTask,
  setPopoverNote,
} = userSlice.actions;

export default userSlice.reducer;
