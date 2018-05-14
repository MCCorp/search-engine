$(document).ready(function () {
    $('#btnPrepare').click(function () {
        var arr = $('#txtInput').val().split('\n');
        for(var i = 0; i < arr.length; i++){
            var item = arr[i].split('|');
            var href = item[1];
            var name = item[0];
            var el = '<p><a class="item" href="'+href+'">'+name+'</a></p>';
            $('#prepare').append(el);
        }
    });
    var die=0,live=0;
    function loop() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var el = $('.item').first();
            var name = el.text();
            var href = el.attr('href');

            $.ajax({
                url: 'check-die-aff/check',
                data: {url: href},
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    var tr = '<tr>';
                    tr += '<td>'+name+'</td>';
                    tr += '<td><a target="_blank" href="'+href+'">'+href+'</a></td>';

                    if(response === true){
                        die++;
                        tr += '<td>Die</td>';
                    }else{
                        live++;
                        tr += '<td>Live</td>';
                    }
                    tr += '</tr>';
                    $('.table-body').append(tr);

                    el.parent().remove();

                    $('.die').text(die);
                    $('.live').text(live);
                    $('.remain').text($('.item').length);

                    loop();
                },
                statusCode: {
                    500: function() {
                        console.log('Error 500! Mark as die');
                        die++;
                        var tr = '<tr>';
                        tr += '<td>'+name+'</td>';
                        tr += '<td><a target="_blank" href="'+href+'">'+href+'</a></td>';
                        tr += '<td>Unknown</td>';
                        tr += '</tr>';
                        $('.table-body').append(tr);

                        el.parent().remove();

                        $('.die').text(die);
                        $('.live').text(live);
                        $('.remain').text($('.item').length);

                        loop();
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }

    $('#btnProcess').click(function () {
        loop();
    });
});