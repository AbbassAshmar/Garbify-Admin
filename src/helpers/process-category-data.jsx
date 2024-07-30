export default function processCategoryData(formEvent, formData, isEditing, originalData) {
    const formObject = new FormData(formEvent.target);

    appendCategoryImage(formObject, formData, isEditing, originalData);

    // Append other form data
    appendOtherData(formObject, formData, isEditing, originalData);

    return formObject;
}

function appendCategoryImage(formObject, formData, isEditing, originalData) {
    console.log(formData['image'].file != originalData['image'].file)
    if (!isEditing || (isEditing && formData['image'].file != originalData['image'].file)){
        formObject.append('image', formData['image'].file);
    }
}

function appendOtherData(formObject, formData, isEditing, originalData) {
    const otherData = [
        'name' , 'description', 'parent_id', 'display_name'
    ];

    otherData.forEach(key => {
        if (!isEditing || (isEditing && formData[key] != originalData[key])){
            formObject.append(key, formData[key]);
        }
    });
}

