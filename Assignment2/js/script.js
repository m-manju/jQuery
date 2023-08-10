$(document).ready(function() {
    $('#submit').click(function(event) {
        event.preventDefault();

        const vname = $('#name').val();
        const vaddress = $('#address').val();
        const vdob = $('#date').val();
        const vage = $('#age').val();
        const vgenderMale = $('#male').is(':checked');
        const vgenderFemale = $('#female').is(':checked');
        const vterms = $('#terms').is(':checked');
        let hasError = false;
        $('.errorMessage').text('');

        if (vname === '') {
            $('#nameError').text("Please enter name");
            hasError = true;
        }
        if (vaddress === '') {
            $('#addressError').text("Please enter address");
            hasError = true;
        }
        if (vdob === '') {
            $('#dobError').text("Please enter Date of Birth");
            hasError = true;
        }
        if (vage === '') {
            $('#ageError').text("Please select an age");
            hasError = true;
        }
        if (!vgenderMale && !vgenderFemale) {
            $('#genderError').text("Please select a gender");
            hasError = true;
        }
        if (!vterms) {
            $('#termsError').text("Please agree to the terms");
            hasError = true;
        }
        if (!hasError) {
            alert("Form submitted successfully!");
            $('#form')[0].reset();
        }
        if (hasError) {
            alert("Form not submitted! fill all required fields.");
        }
    });
});

// ---------------------------- answer2 ----------------------------------

$(document).ready(function() {
    const images = ['images/img1.jpg','images/img2.jpeg','images/img3.jpeg',
    'images/img4.jpeg','images/img5.jpg'];
    const gallery = $('.gallery');
    const dotsContainer = $('.dots');
    let currentIndex = 0;
    let interval;

    for (let i = 0; i < images.length; i++) {
        const dot = $('<div>').addClass('dot');
        dot.click(function() {
            sliding(i);
        });
        dotsContainer.append(dot);
    }
    slidingImg();
    autoSliding();

    function slidingImg() {
        gallery.find('img').attr('src', images[currentIndex]);
        runDots();
    }
    function runDots() {
        $('.dot').removeClass('active');
        $('.dot:eq(' + currentIndex + ')').addClass('active');
    }
    function sliding(index) {
        currentIndex = index;
        slidingImg();
    }
    function autoSliding() {
        interval = setInterval(function() {
            currentIndex = (currentIndex + 1) % images.length;
            slidingImg();
        }, 2000);
    }
});

  



