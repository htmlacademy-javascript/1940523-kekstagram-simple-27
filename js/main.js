import {makeThumbs} from './thumbs.js';
import {getPhotos} from './api.js';
import {setUserFormSubmit, onCloseModal} from './img-form.js';
import {showLoadingError} from './util.js';

getPhotos(makeThumbs, showLoadingError);

setUserFormSubmit(onCloseModal);
