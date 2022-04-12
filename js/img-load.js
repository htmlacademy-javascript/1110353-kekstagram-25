import {imgChooser, imgPreview} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgLoad = () => {
  imgChooser.addEventListener('change', () => {
    const file = imgChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      imgPreview.src = URL.createObjectURL(file);
    }
  });
};

export {imgLoad};
