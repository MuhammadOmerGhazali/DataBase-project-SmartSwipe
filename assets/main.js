$(document).ready(function(){

    // banner owl carousel
    $("#banner-area .owl-carousel").owlCarousel({
        dots: true,
        items: 1
    });

    // categories owl carousel
    $("#categories .owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        responsive : {
            0: {
                items: 3
            },
            600: {
                items: 4
            },
            800: {
                items: 5
            },
            1000: {
                items: 7
            },
            1200 : {
                items: 8
            }
        }
    });

    // new phones owl carousel
    $("#carousel-products .owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        responsive : {
            0: {
                items: 3
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            },
            1220 : {
                items: 5
            }
        }
    });
    
    
    $("#carousel-brands .owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        responsive : {
            0: {
                items: 6
            },
            600: {
                items: 7
            },
            800: {
                items: 8
            },
            1050 : {
                items: 9
            },
            1250 : {
                items: 10
            }
        }
    });

    // isotope filter
    var $grid = $(".grid").isotope({
        itemSelector : '.grid-item',
        layoutMode : 'fitRows'
    });

    // filter items on button click
    $(".button-group").on("click", "button", function(){
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue});
    })

    
    // product qty section
    let $qty_up = $(".qty .qty-up");
    let $qty_down = $(".qty .qty-down");
    // let $input = $(".qty .qty_input");

    // click on qty up button
    $qty_up.click(function(e){
        let $input = $(`.qty_input[data-id='${$(this).data("id")}']`);
        if($input.val() >= 1 && $input.val() <= 9){
            $input.val(function(i, oldval){
                return ++oldval;
            });
        }
    });

       // click on qty down button
       $qty_down.click(function(e){
        let $input = $(`.qty_input[data-id='${$(this).data("id")}']`);
        if($input.val() > 1 && $input.val() <= 10){
            $input.val(function(i, oldval){
                return --oldval;
            });
        }
    });


    
});
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}