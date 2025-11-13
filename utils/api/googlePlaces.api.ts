export const googlePlaces = (link: string) => {
  return new Promise<void>((resolve, reject) => {
    let googleScript = document.querySelector(
      `script[src="${link}"]`
    ) as HTMLScriptElement;
    if (!googleScript) {
      googleScript = document.createElement("script");
      googleScript.src = link;
      googleScript.async = true;
      document.head.append(googleScript);

      googleScript.addEventListener("load", () => {
        resolve();
      });
      googleScript.addEventListener("load", () => {
        reject();
      });
    }
  });
};
