// getting reference of all the read more btn
const read_more_btn = document.querySelectorAll('.muted-btn');
// getting refrence of the hidden content
const hidden_content = document.querySelectorAll('.service_hidden');
// adding event lister to handel the functionality
for (let x = 0; x < read_more_btn.length; x++) {
    read_more_btn[x].addEventListener('click', () => {
        if (getComputedStyle(hidden_content[x]).display === "none") {
            hidden_content[x].style.display = "block";
            read_more_btn[x].innerHTML = "Read less";
            // getting the actual height of the content
            const height = hidden_content[x].scrollHeight;
            // creating temporary variable height
            let actualHeight = 0;
            // defining interval of changing height 
            let id = setInterval(() => {
                if (actualHeight <= height) {
                    hidden_content[x].style.height = `${actualHeight}px`;
                    actualHeight++;
                }
            }, 0)
            // timeout for the clearing interval
            setTimeout(() => {
                clearInterval(id);
            },2000)
        }
        else {
            hidden_content[x].style.display = "none";
            read_more_btn[x].innerHTML = "Read More";
        }
    })
}