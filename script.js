document.addEventListener('DOMContentLoaded', init, false);

function init() {

    // listens to range selector changes
    const range_inputs = document.querySelectorAll('input[type=range]');
    range_inputs.forEach(ri => {
        ri.addEventListener('input', function (e) {
            document.querySelector(`#${e.target.id}-value`).value = e.target.value;

            // update the-box on any change
            update_box();
        });
    });

    // listens to color picker input
    const color_inputs = document.querySelectorAll('input[type=color]');
    color_inputs.forEach(ci => {
        ci.addEventListener('input', function (e) {
            document.querySelector(`#${e.target.id}-value`).value = e.target.value;

            // update the-box on any change
            update_box();
        });
    });

    // synchronizes values from the text field to color picker for display
    // better UI/UX experience
    const color_values = document.querySelectorAll('input.color-value');
    color_values.forEach(cv => {
        cv.addEventListener('input', function (e) {

            if (e.target.value.charAt(0) !== "#") {
                e.target.value = "#" + e.target.value;
            }

            const color_input_id = e.target.id.replace(/-value$/, '');
            document.querySelector(`#${color_input_id}`).value = e.target.value;

            // update the-box on any change
            update_box();
        });
    });

    // listen to the border style drop down
    document.querySelector('#box-border-style').addEventListener('change', function (e) {
        update_box();
    })

    // update the box and the CSS code area on init
    update_box()
}

function update_box() {
    // get the-box element
    const the_box = document.getElementById("the-box");

    // get the latest values from UI inputs
    const border_size = `${document.querySelector('#box-borders-size').value}px`;
    const border_radius = `${document.querySelector('#box-corners').value}px`;
    const box_width = `${document.querySelector('#box-width').value}px`;
    const box_height = `${document.querySelector('#box-height').value}px`;
    const border_color = document.querySelector('#box-borders-color').value;
    const background_color = document.querySelector('#box-background-color').value;
    const border_style = document.querySelector('#box-border-style').value;

    // update the-box CSS rules
    the_box.style.borderWidth = `${border_size}`;
    the_box.style.borderRadius = `${border_radius}`;
    the_box.style.width = `${box_width}`;
    the_box.style.height = `${box_height}`;
    the_box.style.borderColor = border_color;
    the_box.style.backgroundColor = background_color;
    the_box.style.borderStyle = border_style;

// display CSS code for the-box in the code-area
// &nbsp and <br> for formating
var css_code = `#the-box {<br>
 &nbsp; &nbsp; box-sizing : border-box;<br>
 &nbsp; &nbsp; border : ${border_size} ${border_style} ${border_color};<br>  
 &nbsp; &nbsp; border-radius : ${border_radius};<br>
 &nbsp; &nbsp; background-color : ${background_color};<br>
 &nbsp; &nbsp; height : ${box_height};<br>
 &nbsp; &nbsp; width : ${box_width};<br>
}`;

    document.getElementById('code-area').innerHTML = css_code

}

