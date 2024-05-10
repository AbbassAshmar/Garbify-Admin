
export default function useDeleteResource(sendRequest, setResource, resource,endpointURL){
    async function handleDeleteResource(elementID, onSuccess, onError){
        let init = {method:"DELETE"};
        let url =  `${endpointURL}/${elementID}`;
        
        // remove resource temporarily
        let removedElement = resource.find(element => element.id === elementID);
        setResource((prev) => prev.filter((element) => element.id !== elementID));

        const {request, response} = await sendRequest(url,init);

        // if success, don't add the removed category back
        if (request?.ok) {
            onSuccess(response.metadata.message);
        }
    
        if (request && !request.ok) {
            onError(response.metadata.message);
        }

        // if failure or server down, add the removed category back
        if (!request || !request.ok){
            setResource([...resource, removedElement]);
        }
    }

    return {handleDeleteResource};
}