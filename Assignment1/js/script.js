$(document).ready(function() {
    var $button = $(document.createElement('button')).prop({
        type: 'button',
        innerHTML: 'Click Here',
        class: 'newBtn'
    });
    $('body').append($button);
    var $div = $(document.createElement('div')).prop({
        class: 'newDiv'
    });
    $('body').append($div);

    var clickCount = 0;
    var imageIndex = 0;
    var images = ['images/img1.jpg','images/img2.jpg','images/img3.jpg'];
    $button.on('click', function() {
        clickCount++;
        if (clickCount === 1) {
            $div.html('jQuery started!');
        } else if (clickCount === 2) {
            $div.html('<img src="images/img1.jpg" alt="Image is not found">');
            $div.append('<button class="nextBtn">next</button>');
            $('.nextBtn').on('click',function() {
                imageIndex = (imageIndex + 1) % images.length;
                $div.find('img').attr('src', images[imageIndex]);
            })
        }
    });
});
