export default function processProductData(formEvent, formData, isEditing,originalData={}) {
    const formObject = new FormData(formEvent.target);

    // Handle thumbnail data
    if (!isEditing || (isEditing && !compareThumbnailData(formData, originalData))){
        appendThumbnailData(formObject, formData.thumbnail_data);
    }

    // Handle images data
    if (!isEditing || (isEditing && !compareImagesData(formData, originalData))){
        appendImagesData(formObject, formData.images_data);
    }

    // Handle sizes data
    if (!isEditing || (isEditing && !compareSizesData(formData, originalData))){
        const alternativesWithSize = getAlternativesWithSize(formData.sizes_data);
        appendSizesData(formObject, formData.sizes_data, alternativesWithSize);
    }

    // Append other form data
    appendArrayData(formObject, 'sizes', formData.sizes, originalData?.sizes, isEditing);
    appendArrayData(formObject, 'colors', formData.colors, originalData?.colors, isEditing);
    appendArrayData(formObject, 'tags', formData.tags, originalData?.tags, isEditing);

    appendOtherData(formObject, formData, originalData, isEditing);

    appendDateTimeField(formObject, formData, "sale_start_date",originalData,isEditing);
    appendDateTimeField(formObject, formData, "sale_end_date",originalData, isEditing);

    return formObject;
}


function appendThumbnailData(formObject, thumbnailData) {
    formObject.append('thumbnail_data[color]', thumbnailData.color);
    formObject.append('thumbnail_data[image]', thumbnailData.image.file);
}

function appendImagesData(formObject, imagesData) {
    imagesData.forEach((imageData, index) => {
        if (imageData.images.length === 0) return;

        formObject.append(`images_data[${index}][color]`, imageData.color);
        imageData.images.forEach(image => {
            formObject.append(`images_data[${index}][images][]`, image.file);
        });
    });
}

// filters out empty table columns, to not be included in the request
function getAlternativesWithSize(sizesData) {
    let alternativesWithSize = {};
    sizesData.forEach((sizeData, i) => {
        sizeData.alternative_sizes.forEach((alternative, j) => {
            if (alternative.size.trim() !== '') {
                alternativesWithSize[j] = true;
            }
        });
    });
    return alternativesWithSize;
}

function appendSizesData(formObject, sizesData, alternativesWithSize) {
    sizesData.forEach((sizeData, i) => {
        formObject.append(`sizes_data[${i}][size]`, sizeData.size);
        formObject.append(`sizes_data[${i}][unit]`, sizeData.unit);

        sizeData.alternative_sizes.forEach((alternative, j) => {
            if (!alternativesWithSize[j]) return;
            if (alternative.size.trim() !== '' || alternative.unit.trim() !== '') {
                formObject.append(`sizes_data[${i}][alternative_sizes][${j}][size]`, alternative.size);
                formObject.append(`sizes_data[${i}][alternative_sizes][${j}][unit]`, alternative.unit);
            }
        });
    });
}

function appendArrayData(formObject, key, dataArray, originalArray, isEditing) {
    if (!isEditing || (isEditing && !compareArrays(dataArray, originalArray))){
        dataArray.forEach(item => formObject.append(`${key}[]`, item));
    }
}

function appendDateTimeField(formObject,formDate, dateTime, originalData, isEditing){
    let DateTime = formDate[dateTime].replace("T", " ");
    let originalDateTime = originalData[dateTime].replace("T", " ");

    if (!isEditing || (isEditing && DateTime != originalDateTime)){
        formObject.append(dateTime, DateTime);
    }
}

function appendOtherData(formObject, formData,originalData, isEditing) {
    const otherData = [
        'sizes_unit', 'name', 'description', 'status_id', 'type', 
        'original_price', 'selling_price', 'quantity', 'category_id', 
        'sale', 'sale_quantity','discount_percentage'
    ];

    otherData.forEach(key => {
        if (!isEditing || (isEditing && formData[key] != originalData[key])){
            formObject.append(key, formData[key]);
        }
    });
}


// comparison 
function compareArrays(arr1, arr2){
    if (arr1.length != arr2.length)
        return false;

    return arr1.every((element)=>{
        return arr2.includes(element);
    })
}

function compareThumbnailData(obj1 , obj2){
    if (!obj1 || !obj2 || !obj1.thumbnail_data || !obj2.thumbnail_data){
        return false;
    }
    return (
        obj1.thumbnail_data.color === obj2.thumbnail_data.color &&
        obj1.thumbnail_data?.image?.file === obj2.thumbnail_data?.image?.file
    )
}

function compareImagesData(obj1, obj2){
    if (!obj1 || !obj2 || !obj1.images_data || !obj2.images_data){
        return false;
    }

    if (obj1.images_data.length != obj2.images_data.length){
        return false;
    }

    return obj1.images_data.every(e1 => (
        obj2.images_data.some(e2 => (
            e1.color === e2.color && 
            compareArrays(e1.images,e2.images)
        ))
    ))
}

function compareSizesDataArrays(arr1, arr2){
    if (arr1 === arr2) return true;

    if (arr1.length != arr2.length){
        return false;
    }

    return arr1.every(e1 => (
        arr2.some(e2 => (
            e1.size === e2.size && 
            e1.unit === e2.unit &&
            compareSizesDataArrays(e1?.alternative_sizes,e2?.alternative_sizes)
        ))
    ))
}

function compareSizesData(obj1, obj2){
    if (obj1 === obj2) return true;

    if (!obj1 || !obj2 || !obj1.sizes_data || !obj2.sizes_data){
        return false;
    }

    return compareSizesDataArrays(obj1.sizes_data, obj2.sizes_data);
}

