export default function processUserData(formEvent, formData, isEditing) {
    const formObject = new FormData(formEvent.target);

    // Handle thumbnail data
    appendProfilePicture(formObject, formData.profile_picture);

    // Append other form data
    appendOtherData(formObject, formData);

    return formObject;
}


function appendProfilePicture(formObject, profilePicture) {
    formObject.append('profile_picture', profilePicture.file);
}

function appendOtherData(formObject, formData) {
    const otherData = [
        'name' , 'email', 'password', 'confirm_password'
    ];

    otherData.forEach(key => {
        formObject.append(key, formData[key]);
    });
}

