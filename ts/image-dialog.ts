const IMAGE_PATH = "../assets/gallery";

const onImageClickHandler = (id: number) => {
    $("#dialog").html(`<img src="${IMAGE_PATH}/${id}.jpeg" alt=""/>`);

    $("#dialog").dialog("open");
};

$(document).ready(() => {
    $("#dialog").dialog({
        autoOpen: false,
        width: 500,
        height: 500,
    });

    let galleryImages: string = "";

    for (let i: number = 0; i < 6; i++) {
        if (i % 2 == 0) galleryImages += "<tr>";
        galleryImages += `<td onclick="onImageClickHandler(${i})"><img src="../assets/gallery/${i}.jpeg" alt="photo"/></td>`;
        if (i % 2 != 0) galleryImages += "</tr>";
    }

    $("#gallery").append(galleryImages);
});
