export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Waiting ' + seconds + ' seconds');
      resolve(true);
    }, seconds * 1000);
  });
};
