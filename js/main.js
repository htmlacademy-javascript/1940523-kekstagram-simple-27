import {makeThumbs} from './thumbs.js';
import {getPhotosList} from './data.js';
import './img-form.js';

const thumbList = getPhotosList();

makeThumbs(thumbList);

