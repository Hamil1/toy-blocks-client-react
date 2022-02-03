export interface Node {
  online: boolean;
  name: string;
  url: string;
  loading: boolean;
  blocks: {
    loading: boolean,
    data: [],
    error: boolean,
  }
}
