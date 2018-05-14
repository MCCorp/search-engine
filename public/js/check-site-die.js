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
                url: 'check-site-die/check',
                data: {url: href},
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    var tr = '<tr>';
                    tr += '<td>'+name+'</td>';
                    tr += '<td><a target="_blank" href="'+href+'">'+href+'</a></td>';

                    if(response === 0){
                        die++;
                        tr += '<td>Die</td>';
                    }else{
                        live++;
                        tr += '<td>'+response+'</td>';
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
    function loop_2() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var el = $('.item').first();
            var name = el.text();
            var href = el.attr('href');

            var dataset = {name: name};
            if($('#checkNote').is(':checked')) dataset['note'] = $('#valueNote').val();
            $.ajax({
                url: 'store/get-by-name',
                data: dataset,
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    if(typeof response[0] !== 'undefined'){
                        if(response[0].note != 'ngach'){
                            var tr = '<tr>';
                            tr += '<td>'+name+'</td>';
                            tr += '<td><a target="_blank" href="'+href+'">'+href+'</a></td>';
                            tr += '<td>'+response[0].store_url+',https://couponsplusdeals.com/'+response[0].alias+'-coupons,'+response[0].affiliate_url+','+response[0].logo+','+response[0].coupon_count+'</td>';
                            tr += '</tr>';
                            $('.table-body').append(tr);
                            $('.remain').text($('.item').length);
                        }
                    }else{
                        var tr = '<tr>';
                        tr += '<td>'+name+'</td>';
                        tr += '<td></td>';
                        tr += '<td></td>';
                        tr += '</tr>';
                        $('.table-body').append(tr);
                        $('.remain').text($('.item').length);
                    }
                    el.parent().remove();

                    loop_2();
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

                        loop_2();
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }
    function loop_3() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var el = $('.item').first();
            var name = el.text();

            $.ajax({
                url: 'check-fb-fanpage',
                data: {name: name},
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    if(typeof response[0] !== 'undefined'){
                        var tr = '<tr>';
                        tr += '<td>'+name+'</td>';
                        tr += '<td></td>';

                        if(response === 'die'){
                            die++;
                            tr += '<td>Die</td>';
                        }else if(response === 'live'){
                            live++;
                            tr += '<td>'+response+'</td>';
                        }
                        tr += '</tr>';
                        $('.table-body').append(tr);
                        $('.die').text(die);
                        $('.live').text(live);
                        $('.remain').text($('.item').length);
                    }
                    el.parent().remove();

                    loop_3();
                },
                statusCode: {
                    500: function() {
                        console.log('Error 500! Mark as die');
                        die++;
                        var tr = '<tr>';
                        tr += '<td>'+name+'</td>';
                        tr += '<td></td>';
                        tr += '<td>Unknown</td>';
                        tr += '</tr>';
                        $('.table-body').append(tr);

                        el.parent().remove();

                        $('.die').text(die);
                        $('.live').text(live);
                        $('.remain').text($('.item').length);

                        loop_3();
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }
    function loop_4() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var el = $('.item').first();
            var name = el.attr('href');
            $.ajax({
                url: 'check-site-die/get-dontpayfull-outlink',
                data: {name: name},
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    if(typeof response[0] !== 'undefined'){
                        var tr = '<tr>';
                        tr += '<td>'+name+'</td>';
                        tr += '<td></td>';

                        if(response === 'die'){
                            die++;
                            tr += '<td>Die</td>';
                        }else if(response === 'live'){
                            live++;
                            tr += '<td>'+response+'</td>';
                        }
                        tr += '</tr>';
                        $('.table-body').append(tr);
                        $('.die').text(die);
                        $('.live').text(live);
                        $('.remain').text($('.item').length);
                    }
                    el.parent().remove();

                    loop_3();
                },
                statusCode: {
                    500: function() {
                        console.log('Error 500! Mark as die');
                        die++;
                        var tr = '<tr>';
                        tr += '<td>'+name+'</td>';
                        tr += '<td></td>';
                        tr += '<td>Unknown</td>';
                        tr += '</tr>';
                        $('.table-body').append(tr);

                        el.parent().remove();

                        $('.die').text(die);
                        $('.live').text(live);
                        $('.remain').text($('.item').length);

                        loop_3();
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }
    function loop_5() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var el = $('.item').first();
            var name = el.text();
            var href = el.attr('href');

            var dataset = {name: name};
            if($('#checkNote').is(':checked')) dataset['note'] = $('#valueNote').val();
            $.ajax({
                url: 'store/get-by-url',
                data: dataset,
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    if(typeof response[0] !== 'undefined'){
                        if(response[0].note != 'ngach'){
                            for(var i = 0; i < response.length; i++){
                                var item = response[i];
                                var tr = '<tr>';
                                tr += '<td>'+item.name+'</td>';
                                tr += '<td><a target="_blank" href="'+href+'">'+href+'</a></td>';
                                tr += '<td>'+item.name+','+item.store_url+',https://couponsplusdeals.com/'+item.alias+'-coupons'+','+item.affiliate_url+','+item.coupon_count+'</td>';
                                tr += '</tr>';
                                $('.table-body').append(tr);
                            }
                            $('.remain').text($('.item').length);
                        }
                    }else{
                        var tr = '<tr>';
                        tr += '<td>'+name+'</td>';
                        tr += '<td></td>';
                        tr += '<td></td>';
                        tr += '</tr>';
                        $('.table-body').append(tr);
                        $('.remain').text($('.item').length);
                    }
                    el.parent().remove();

                    loop_5();
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

                        loop_2();
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }
    function loop_6() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var el = $('.item').first();
            var name = el.text();
            var href = el.attr('href');

            var dataset = {name: name};
            if($('#checkNote').is(':checked')) dataset['note'] = $('#valueNote').val();
            $.ajax({
                url: 'store/get-by-alias',
                data: dataset,
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    if(typeof response[0] !== 'undefined'){
                        if(response[0].note != 'ngach'){
                            var tr = '<tr>';
                            tr += '<td>'+response[0].name+'</td>';
                            tr += '<td><a target="_blank" href="'+href+'">'+href+'</a></td>';
                            tr += '<td>'+response[0].name+','+response[0].store_url+',https://couponsplusdeals.com/'+response[0].alias+'-coupons'+','+response[0].affiliate_url+','+response[0].coupon_count+'</td>';
                            tr += '</tr>';
                            $('.table-body').append(tr);
                            $('.remain').text($('.item').length);
                        }
                    }else{
                        var tr = '<tr>';
                        tr += '<td>'+name+'</td>';
                        tr += '<td></td>';
                        tr += '<td></td>';
                        tr += '</tr>';
                        $('.table-body').append(tr);
                        $('.remain').text($('.item').length);
                    }
                    el.parent().remove();

                    loop_6();
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

                        loop_2();
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
    $('#btnGetStoreByUrl').click(function () {
        loop_2();
    });
    $('#btnGetStoreByAlias').click(function () {
        loop_6();
    });
    $('#btnCheckFbFanpage').click(function () {
        loop_3();
    });
    $('#btnGetOutLinkDontPayFull').click(function () {
        loop_4();
    });
    $('#btnGetNameByUrl').click(function () {
        loop_5();
    });
});