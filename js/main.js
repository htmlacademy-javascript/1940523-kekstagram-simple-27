import {makeThumbs} from './thumbs.js';
import './img-form.js';
import {getPhotos} from './api.js';
import './transform-img.js';
import {setUserFormSubmit, onCloseModal} from './img-form.js';
import {showLoadingError} from './util.js';

getPhotos(makeThumbs, showLoadingError);

setUserFormSubmit(onCloseModal);
