
const replaceTranslit = (string) => {
  let fromArray = ["ä", "ö", "ü", "Ä", "Ö", "Ü", "ß"];
  let toArray = ["ae", "oe", "ue", "Ae", "Oe", "Ue", "ss"];
  fromArray.forEach(function (element, index) {
    // string = string?.replace(fromArray[index], toArray[index])?.replace(' ', '-');
    string = string?.replace(fromArray[index], toArray[index])?.replace(' ', ' ');
  });
  return string;
};
export { replaceTranslit };


import { mapInit } from "./strings";
export const loadMapLibrary = () => {
    return new Promise((resolve, reject) => {
        if (typeof google === "undefined") {
            let googleScript = document?.querySelector(`script[src="${mapInit}"]`);


            if (!googleScript) {
                googleScript = document?.createElement("script");
                googleScript.src = mapInit;
                googleScript.async = true;
                googleScript.onload = resolve;
                googleScript.onerror = reject;
                document?.head.appendChild(googleScript);
            } else {
                resolve(() => {
                });
            }
        } else {

            resolve(() => {
            });
        }
    });
};

export const openModal = (store) => {
    store.commit("counter/changePopupOpen", true);
};

