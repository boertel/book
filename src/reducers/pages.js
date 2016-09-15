const initialState = {
}

export default function pages(state=initialState, action) {
    switch(action.type) {
        case 'PAGE_LOADED':
            return action.pages;

        default:
            return state;
    }
}
