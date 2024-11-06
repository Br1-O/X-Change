export const redirectToPage = (uri = "", timeOutInterval = 0) => {
    setTimeout(() => {
        let hashUri = "#" + uri;
        window.location.hash = hashUri;
    }, timeOutInterval);
}             