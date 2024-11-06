function onFormOpenDialogHandler() {
    $("#form-dialog").dialog("open");
}

$(document).ready(() => {
    $("#form-dialog").dialog({
        autoOpen: false,
        modal: true,
        position: { my: "center center" },
        width: 500,
    });
});
