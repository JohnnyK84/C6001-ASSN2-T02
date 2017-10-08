function buttonInit(modalId, buttonId, spanId){
   
    // Get the modal
    var modal = document.getElementById(modalId);

    // Get the button that opens the modal
    var btn = document.getElementById(buttonId);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName(spanId)[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

buttonInit('myModal', 'more-details', 'close');
buttonInit('myModal2', 'more-details2', 'close2');
