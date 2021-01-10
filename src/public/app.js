$(function () {

    let price = 0;
    $('#getlist').on('click', () => {
        $.ajax({
            url: '/lists',
            success: function (lists) {
                let tbody = $('tbody');
                tbody.html('');  //para resetear cada click
                tbody.append(`<h1>$ ${price}</h1>`);
                lists.forEach(list => {
                    tbody.append(`
                    <tr>
                    <td class="id">${list.id}</td>
                    <td>${list.movies}</td>
                    <td>${list.category}</td>
                    <td>${list.quantity}</td>
                    </tr>
                    `)
                });
            }
        })
    });
    $('#stack1').on('submit', (e) => {
        e.preventDefault();
        let newMovie = $('#movies');
        let newCategory = $('#category');
        let newQuanity = $('#quantity');
        let newReserve  = $('#reserve');
        let newMonth = $('#monthcc');
        let newYear = $('#yearcc');

        if (newYear.val() < 20) {
            alert('Credit Card Invalided');
        }
        else if (newMonth.val() <= 9 && newYear.val() < 20) {
            alert('Credit Card Invalided');
        }
        
        else{
            if (newReserve.val() == "Reserve") {
                if (newCategory.val() == "2D") {
                    let temp = 5000 * newQuanity.val();
                    price = temp + 2600;
                }
                if (newCategory.val() == "3D") {
                    let temp = 7000 * newQuanity.val();
                    price = temp + 2600;
                }
                if (newCategory.val() == "VIP") {
                    let temp = 10000 * newQuanity.val();
                    price = temp + 2600;
                }
            }
            if (newReserve.val() == "Instant Purchase") {
                if (newCategory.val() == "2D") {
                    price = 5000 * newQuanity.val();
                }
                if (newCategory.val() == "3D") {
                    price = 7000 * newQuanity.val();
                }
                if (newCategory.val() == "VIP") {
                    price = 10000 * newQuanity.val();
                }
            }

            $.ajax({
                url: '/lists',
                method: 'POST',
                data: {
                    movies: newMovie.val(),
                    category: newCategory.val(),
                    quantity: newQuanity.val(),
                    reserve: newReserve.val()
                },
                success: function (response) {
                    $('#getlist').click()
                }
            });
        }

    });
});