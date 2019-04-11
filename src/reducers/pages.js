const initialState = {};

export default function pages(state = initialState, action) {
  switch (action.type) {
    case "BLOCKS_LOADED":
      return Object.assign({}, state, {
        [action.pid]: { blocks: Object.keys(action.blocks) }
      });

    default:
      return state;
  }
}
