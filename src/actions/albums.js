import axios from 'axios'


export const loadAlbum = (key) => {
    return (dispatch) => {
        return axios.get(`/data/${key}/index.json`).then(({ data }) => {
            dispatch({
                type: 'ALBUMS_LOADED',
                key,
                data,
            })
        })
    }
}
