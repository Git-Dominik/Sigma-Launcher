document.getElementById("refresh-page").addEventListener("click", function() {
    setTimeout(function() {
        location.reload();
        console.log("reloaded");
    });
});