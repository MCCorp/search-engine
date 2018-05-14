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
                url: 'alexa',
                data: {url: domain},
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);

                    // Stop if google api detect auto
                    var row = name;
                    row += ',' + domain;
                    row += ',' + response.globalRank.replace(/\,/g, '.');
                    row += '\n';
                    $('#checkResult').append(row);

                    firstElement.parent().remove();
                    loop();
                    $('#countResult').text(c);
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