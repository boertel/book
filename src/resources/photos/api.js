import axios from 'axios';
import pick from 'lodash/pick';

const FLICKR_API_KEY = process.env.REACT_APP_FLICKR_API_KEY;
const FLICKR_USER_ID = process.env.REACT_APP_FLICKR_USER_ID;

export default function(method, params) {
  params = Object.assign(
    {
      method: `flickr.${method}`,
      api_key: FLICKR_API_KEY,
      user_id: FLICKR_USER_ID,
      format: 'json',
      nojsoncallback: 1,
      per_page: 150,
      extras: 'o_dims,url_o,original_format',
    },
    params,
  );
  return axios
    .get('https://api.flickr.com/services/rest/', { params })
    .then(response => {
      const { photoset } = response.data;
      let output = {
        id: photoset.id,
      };

      const attributes = ['farm', 'server', 'id', 'secret', 'originalsecret'];
      output.photo = photoset.photo.map(photo => {
        let src = pick(photo, attributes);
        src.type = 'flickr';
        return {
          id: photo.id,
          src,
          width: photo.width_o,
          height: photo.height_o,
        };
      });

      return output;
    });
};
