export default function processProductData(formEvent, formData, isEditing) {
    const formObject = new FormData(formEvent.target);

    // Handle thumbnail data
    appendThumbnailData(formObject, formData.thumbnail_data);

    // Handle images data
    appendImagesData(formObject, formData.images_data);

    // Handle sizes data
    const alternativesWithSize = getAlternativesWithSize(formData.sizes_data);
    appendSizesData(formObject, formData.sizes_data, alternativesWithSize);

    // Append other form data
    appendArrayData(formObject, 'sizes', formData.sizes);
    appendArrayData(formObject, 'colors', formData.colors);
    appendArrayData(formObject, 'tags', formData.tags);
    appendOtherData(formObject, formData);

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

function appendArrayData(formObject, key, dataArray) {
    dataArray.forEach(item => formObject.append(`${key}[]`, item));
}

function appendOtherData(formObject, formData) {
    const otherData = [
        'sizes_unit', 'name', 'description', 'status', 'type', 
        'original_price', 'selling_price', 'quantity', 'category_id', 
        'sale', 'sale_quantity', 'sale_start_date', 'sale_end_date', 
        'discount_percentage'
    ];

    otherData.forEach(key => {
        formObject.append(key, formData[key]);
    });
}

