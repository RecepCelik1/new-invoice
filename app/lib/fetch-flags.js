// /lib/fetch-flags.js

export const fetchFlags = async (countries) => {

  
    const promises = countries.map(option =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = option.flagURL;
        img.onload = () => resolve(option);
      })
    );
  
    return await Promise.all(promises);
  };
  