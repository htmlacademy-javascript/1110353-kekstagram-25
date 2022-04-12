const FROM_SERVER = 'https://25.javascript.pages.academy/kekstagram/data';
const TO_SERVER = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(FROM_SERVER)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err)=> {
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    TO_SERVER,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error;
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
