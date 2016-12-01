import { push } from 'react-router-redux';


function nextPage(page) {
    let url = `/pages/${page.index + 1}`;
    if (page.index > page.total) {
        url = '/end';
    }
    return url;
}

function previousPage(page) {
    let url = `/pages/${page.index - 1}`;
    if (page.index === 1) {
        url = '/pages/';
    }
    return url;
}

function nextMedium(page, medium) {
    let url = `/pages/${page.index}/${medium.index + 1}`;
    if (medium.index + 1 > medium.total - 1) {
        url = `/pages/${page.index}`;
    }
    return url;
}

function previousMedium(page, medium) {
    let url = `/pages/${page.index}/${medium.index - 1}`;
    if (medium.index === 0) {
        url = `/pages/${page.index}`;
    }
    return url;
}


function wrapPush(func) {
    return (page, medium) => {
        return push(func(page, medium));
    };
}

export default {
    nextPage: wrapPush(nextPage),
    previousPage: wrapPush(previousPage),
    nextMedium: wrapPush(nextMedium),
    previousMedium: wrapPush(previousMedium),
};
