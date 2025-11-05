import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  inventory: [],
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setInventory: (state, action) => {
      state.inventory = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setInventory, setError } = inventorySlice.actions;
export default inventorySlice.reducer;
