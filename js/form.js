const imgForm = document.querySelector('.img-upload__form');
const imgChooser = imgForm.querySelector('.img-upload__input');
const imgPreviewContainer = imgForm.querySelector('.img-upload__preview');
const imgPreview = imgPreviewContainer.querySelector('img');
const descriptionTextarea = imgForm.querySelector('.text__description');
const hashtagsInput = imgForm.querySelector('.text__hashtags');

export {imgForm, imgChooser, imgPreview, descriptionTextarea, hashtagsInput};
