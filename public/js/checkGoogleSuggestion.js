$(document).ready(function () {
    $('#btnPrepare').click(function () {
        $('#prepare').empty();
        $('#checkResult').empty();
       var inputData = $('#inputData').val().split('\n');
       for(var i = 0; i < inputData.length; i++){
           var row = inputData[i].split('|');
           var el = '<p class="el" ><a href="'+row[1]+'">'+row[0]+'</a></p>';
           $('#prepare').append(el);
       }
    });
    var c = 0;
    var tryAgain = 0;
    $('#btnCheckGgSuggestion').click(function () {
        loop();
    });
    function loop() {
        $('#lblMessage').text('');
        c++;
        var firstElement = $('.el').first().find('a');
        if(firstElement.length > 0){
            var name = firstElement.text();
            var domain = firstElement.attr('href');
            $.ajax({
                url: 'get-google-suggestion',
                data: {name: name,domain: domain},
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);

                    // Stop if google api detect auto
                    if(response.found.indexOf('500') === -1){
                        var row = response.name;
                        row += ',' + response.domain;
                        var found = '';
                        if(response.found.length > 0){
                            for(var i = 0; i < response.found.length; i++){
                                found += response.found[i];
                                if(i < response.found.length - 1){
                                    found += ' | ';
                                }
                            }
                        }
                        row += ',' + found;
                        row += ',' + response.alexa.replace(/,/g, '.');
                        row += '\n';
                        $('#checkResult').append(row);

                        firstElement.parent().remove();
                        setTimeout(function () {
                            loop();
                        },900);
                        $('#countResult').text(c);
                    }else{
                        tryAgain++;
                        var msg = 'Tạm dừng vì Google Api phát hiện auto. Tự động thử lại sau 1p [' + tryAgain + ']';
                        console.log(msg);
                        $('#lblMessage').text(msg);
                        setTimeout(function () {
                            msg = 'Continue after 1m. Run now [' + tryAgain + ']';
                            $('#lblMessage').text(msg);
                            loop();
                        },60000);
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }

    $('#btnResetInput').click(function () {
        $('#inputData').val('');
        $('#prepare').empty();
        $('#checkResult').empty();
    });
});