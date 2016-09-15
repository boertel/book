import { push } from 'react-router-redux';


function next(index, total)  {
    return (dispatch) => {
        let url = `/pages/${index + 1}`
        if (index >= total) {
            url = '/end';
        }
        dispatch(push(url));
    }
}

function previous(index, total) {
    return (dispatch) => {
        let url = `/pages/${index - 1}`
        if (index === 0) {
            url = '/pages/';
        }
        dispatch(push(url));
    }
}


export default {
    next,
    previous,
};
