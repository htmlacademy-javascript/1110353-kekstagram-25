const FROM_SERVER = 'https://25.javascript.pages.academy/kekstagram/data';
// const TO_SERVER = ;


const getData = (onSuccess, onFail) => {
  fetch(FROM_SERVER)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      // throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    // .catch((err)=> {
    //   onFail(err);
    // });
    .catch(()=> {
      onFail();
    });
};

export {getData};
