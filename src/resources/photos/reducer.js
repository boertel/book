import { handle } from "redux-pack";
import { PHOTOS_LOAD, PHOTOS_SELECT } from "./actionTypes";

const initialState = {
  isLoading: false,
  error: undefined,
  order: {},
  entities: {}
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case PHOTOS_LOAD:
      return handle(state, action, {
        start: prevState => ({ ...prevState, isLoading: true, error: null }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        success: prevState => {
          let entities = {};
          const order = payload.photo.map(photo => {
            const { id } = photo.src;
            entities[id] = photo;
            return id;
          });
          return {
            ...prevState,
            order: Object.assign({}, prevState.order, {
              [payload.id]: order
            }),
            entities: Object.assign({}, prevState.entities, entities)
          };
        }
      });

    case PHOTOS_SELECT:
      const id = action.id;
      const entity = Object.assign({}, state.entities[id], {
        selected: !state.entities[id].selected
      });
      const copy = {
        kind: "block",
        type: "picture",
        data: {
          viewer: true,
          src: entity.src,
          width: entity.width,
          height: entity.height,
          type: "marker",
          coordinates: entity.coordinates,
          location: "",
          title: ""
        }
      };
      navigator.clipboard
        .writeText(JSON.stringify(copy))
        .then(console.log)
        .catch(console.error);
      const entities = { ...state.entities, [id]: entity };
      return {
        ...state,
        entities: entities
      };

    default:
      return state;
  }
}
