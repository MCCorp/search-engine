$(document).ready(function () {
    $('#btnConvert').click(function () {
        var inputVal = $('#txtInput').val().split('\n');
        for(var i = 0; i < inputVal.length; i++){
            var a = inputVal[i].split('|');
            var href = a[1];
            // var arrHref = href.split('/');
            // arrHref[arrHref.length - 1] = 'out/' + arrHref[arrHref.length - 1];
            // var outLink = arrHref.join('/');
            var outLink = href;
            var name = a[0];
            var el = '<p class="item"><a target="_blank" out-link="'+outLink+'" href="'+href+'">'+name+'</a></p>';
            $('#convertedBox').append(el);
        }
    });
    $('#btnGo').click(function () {
       loop();
    });
    function loop() {
        var checkedRemoveNetwork = 0;
        if($('#chkRemoveNetwork').is(':checked')){
            checkedRemoveNetwork = 1;
        }

        var item = $('.item').first();
        if(item.length === 0){
            console.log('Done');
            return false;
        }
        var outLink = item.find('a').attr('out-link');
        var name = item.find('a').text();
        $.ajax({
            url: 'getRedirected',
            data: {link: outLink, checkedRemoveNetwork:checkedRemoveNetwork},
            type: "GET",
            success: function (resp) {
                resp = JSON.parse(resp);
                var result = '';
                for (var i = resp.length-1; i >= 0; i--){
                    result += resp[i];
                    if(i > 0){
                        result += ',';
                    }
                }
                $('#result').append(name + ',' + result + '\n');
                item.remove();
                loop();
            },
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                },
                504: function () {
                    console.log('Error 504! remove and this element and try again');
                    item.remove();
                    loop();
                }
            }
        });
    }
});