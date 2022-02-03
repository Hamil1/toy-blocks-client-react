import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { Node } from "../types/Node";
import { RootState } from "../store/configureStore";
import fetch from "cross-fetch";

export interface NodesState {
  list: Node[];
}

export const checkNodeStatus = createAsyncThunk(
  "nodes/checkNodeStatus",
  async (node: Node) => {
    const response = await fetch(`${node.url}/api/v1/status`);
    const data: { node_name: string } = await response.json();
    return data;
  }
);

export const checkNodesStatus = createAsyncThunk(
  "nodes/checkNodesStatus",
  async (nodes: Node[], thunkAPI) => {
    const { dispatch } = thunkAPI;
    nodes.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  }
);

export const fetchingNodeBlocks = createAsyncThunk(
  "nodes/fetchingNodeBlocks",
  async (node: Node) => {
    const response = await fetch(`${node.url}/api/v1/blocks`);
    const data: { data: [] } = await response.json();
    return data;
  }
);

export const fetchNodeBlocks = createAsyncThunk(
  "nodes/fetchNodeBlocks",
  async (node: Node, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(fetchingNodeBlocks(node))
    } catch (error) {
      console.error(error);
    }
  }
);

export const nodesSlice = createSlice({
  name: "nodes",
  initialState: initialState().nodes as NodesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkNodeStatus.pending, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) node.loading = true;
    });
    builder.addCase(checkNodeStatus.fulfilled, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.online = true;
        node.loading = false;
        node.name = action.payload.node_name;
      }
    });
    builder.addCase(checkNodeStatus.rejected, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.online = false;
        node.loading = false;
      }
    });
    // fetch blocks
    builder.addCase(fetchingNodeBlocks.pending, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        state.list.find((n) => n.url === action.meta.arg.url)!.blocks = {
          loading: true,
          data: [],
          error: false
        };
      }
    });
    builder.addCase(fetchingNodeBlocks.fulfilled, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        state.list.find((n) => n.url === action.meta.arg.url)!.blocks = {
          loading: false,
          data: action.payload.data,
          error: false,
        };
      }
    });
    builder.addCase(fetchingNodeBlocks.rejected, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        state.list.find((n) => n.url === action.meta.arg.url)!.blocks = {
          loading: false,
          data: [],
          error: true,
        };
      }
    });
  },
});

export const selectNodes = (state: RootState) => state.nodes.list;
export default nodesSlice.reducer;
