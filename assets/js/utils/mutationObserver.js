export const mutationObserver = (containerToBeObserved, callback , observeAttributes = true, observeChildList = true, observeSubtree = true ) => {

    //configuration of the observer
    const config = { attributes: observeAttributes, childList: observeChildList, subtree: observeSubtree };

    // Dummy callback function to execute when mutations are observed
    function mutationCallback (mutationsList, observer){

        callback();

        for (let mutation of mutationsList) {

            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
            } else if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }

        }
    }

    //create a MutationObserver instance linked to the callback function
    const observer = new MutationObserver(mutationCallback);

    //start observing the target node for configured mutations
    observer.observe(containerToBeObserved, config);
} 

