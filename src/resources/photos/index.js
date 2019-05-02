import flickr from "./api";
import { PHOTOS_LOAD, PHOTOS_SELECT } from "./actionTypes";

export function loadPhotos(photosetId) {
  return {
    type: PHOTOS_LOAD,
    promise: flickr("photosets.getPhotos", { photoset_id: photosetId })
  };
}

export const selectPhoto = id => {
  return {
    type: PHOTOS_SELECT,
    id
  };
};
