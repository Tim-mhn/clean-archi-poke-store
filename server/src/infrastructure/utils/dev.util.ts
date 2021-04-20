export const sleep = (sleepTime) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("The request is successful.");
        }, sleepTime);
    });
};