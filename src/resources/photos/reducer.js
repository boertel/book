import { handle } from 'redux-pack';


const initialState = {
    isLoading: false,
    error: undefined,
    entities: {},
}


export default function reducer(state=initialState, action={}) {
    const { type, payload } = action;
    switch(type) {
        case 'PHOTOS_LOAD':
            console.log(action)
            return handle(state, action, {
                start: prevState => ({...prevState, isLoading: true, error: null}),
                finish: prevState => ({...prevState, isLoading: false}),
                success: prevState => {
                    console.log('success', payload);
                    return {...prevState, entities: Object.assign({}, prevState.entities, {[payload.id]: payload.photo})};
                }
            });
        default:
            return state;
    }
}
