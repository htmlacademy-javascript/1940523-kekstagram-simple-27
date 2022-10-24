import {makeThumbs} from './thumbs.js';
import {getPhotosList} from './data.js';

const thumbList = getPhotosList();

makeThumbs(thumbList);

