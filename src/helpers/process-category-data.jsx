export default function processCategoryData(formEvent, formData, isEditing) {
    const formObject = new FormData(formEvent.target);

    // Handle thumbnail data
    appendProfilePicture(formObject, formData.image);

    // Append other form data
    appendOtherData(formObject, formData);

    return formObject;
}


function appendProfilePicture(formObject, image) {
    formObject.append('image', image.file);
}

function appendOtherData(formObject, formData) {
    const otherData = [
        'name' , 'description', 'parent_id', 'display_name'
    ];

    otherData.forEach(key => {
        formObject.append(key, formData[key]);
    });
}

