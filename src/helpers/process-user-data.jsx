export default function processUserData(formEvent, formData, isEditing) {
    const formObject = new FormData(formEvent.target);

    appendProfilePicture(formObject, formData, isEditing, originalData);

    // Append other form data
    appendOtherData(formObject, formData, isEditing, originalData);

    return formObject;
}

function appendProfilePicture(formObject, formData, isEditing, originalData) {
    if (!isEditing || (isEditing && formData['profile_picture'].file != originalData['profile_picture'].file)){
        formObject.append('profile_picture', formData['profile_picture'].file);
    }
}

function appendOtherData(formObject, formData, isEditing, originalData) {
    const otherData = [
        'name' , 'email', 'password', 'confirm_password'
    ];

    otherData.forEach(key => {
        if (!isEditing || (isEditing && formData[key] != originalData[key])){
            formObject.append(key, formData[key]);
        }
    });
}

