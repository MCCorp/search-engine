/* Function convert string to slug */
String.prototype.toSlug = function(){
    st = this.toLowerCase();
    st = st.replace(/[\u00C0-\u00C5]/ig,'a')
    st = st.replace(/[\u00C8-\u00CB]/ig,'e')
    st = st.replace(/[\u00CC-\u00CF]/ig,'i')
    st = st.replace(/[\u00D2-\u00D6]/ig,'o')
    st = st.replace(/[\u00D9-\u00DC]/ig,'u')
    st = st.replace(/[\u00D1]/ig,'n')
    // st = st.replace(/[^a-z0-9 ]+/gi,'')
    st = st.trim().replace(/ /g,'-');
    st = st.replace(/[\-]{2}/g,'');
    return (st.replace(/[^a-z\- ]*/gi,''));
}
$(document).ready(function () {
    $('#btnPrepare').click(function () {
        var arr = $('#txtInput').val().split('\n');
        for(var i = 0; i < arr.length; i++){
            var item = arr[i].split('|');
            var url = item[0];
            var name = item[1];
            var logo = item[2];
            var affUrl = '';
            if(typeof item[3] !== 'undefined'){
                affUrl = item[3];
            }

            var el = '<p><a class="item" href="'+url+'" logo="'+logo+'" affurl="'+affUrl+'">'+name+'</a></p>';
            $('#prepare').append(el);
        }
    });

    $('#btnProcess').click(function () {
        loop();
    });
    var die=0,live=0;
    function loop() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var dontUpdateResult = $('#dontUpdateResult').is(':checked') ? 1:0;
            var dontUploadLogo = $('#dontUploadLogo').is(':checked') ? 1:0;
            var defaultStoreStatus = $('#slDefaultStatus').val();
            var item = $('.item').first();
            var url = item.attr('href');
            var name = item.text();
            var logo = item.attr('logo');
            var affUrl = item.attr('affurl');
            var customNote = $('#customNote').val();
            var data = {
                url: url,
                name: name,
                logo: logo,
                status: defaultStoreStatus,
                affUrl: affUrl,
                customNote: customNote,
                dontUploadLogo: dontUploadLogo
            };
            $.ajax({
                url: 'store/save',
                data: data,
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);

                    var tr = '<tr>';
                    tr += '<td>'+name+'</td>';
                    tr += '<td><a target="_blank" href="'+url+'">'+name+'</a></td>';

                    if(response === 'duplicate'){
                        die++;
                        tr += '<td>Trung</td>';
                    }else if(response === true){
                        live++;
                        tr += '<td>OK</td>';
                    }
                    tr += '</tr>';
                    /* Khong in ra ket qua de tranh lag may */
                    if(dontUpdateResult === 0){
                        $('.table-body').append(tr);
                    }

                    item.parent().remove();

                    $('.die').text(die);
                    $('.live').text(live);
                    $('.remain').text($('.item').length);
                    loop();
                },
                statusCode: {
                    500: function() {
                        console.log('Error 500! Mark as die');
                    }
                }
            });
        }else{
            console.log('Done');
            alert('Da xong');
        }
    }

    /* get store of dontpayfull.com */
    $('#btnPrepare_dontpayfull').click(function () {
        var arr = $('#txtInput').val().split('\n');
        for(var i = 0; i < arr.length; i++){
            var item = arr[i].split('|');
            var el = '<p><a class="item" href="'+item+'">'+item+'</a></p>';
            $('#prepare').append(el);
        }
    });
    $('#btnProcess_dontpayfull').click(function () {
        loop_dontpayfull();
    });
    function loop_dontpayfull() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            var url = item.attr('href');
            var data = {
                url: url
            };
            $.ajax({
                url: 'store/read',
                data: data,
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    var vl = response.website + '|' + response.name + '|' + response.logo + '\n';
                    $('.result-dontpayfull').append(vl);

                    item.parent().remove();

                    loop_dontpayfull();
                },
                statusCode: {
                    500: function() {
                        console.log('Error 500! Mark as die');
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }

    /* get store of couponsoar.com */
    $('#btnPrepare_couponsoar').click(function () {
        var arr = $('#txtInput').val().split('\n');
        for(var i = 0; i < arr.length; i++){
            var item = arr[i].split('|');
            var el = '<p><a class="item" href="'+item+'">'+item+'</a></p>';
            $('#prepare').append(el);
        }
    });
    $('#btnProcess_couponsoar').click(function () {
        loop_couponsoar();
    });
    function loop_couponsoar() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            var url = item.attr('href');
            var data = {
                url: url
            };
            $.ajax({
                url: 'store/read',
                data: data,
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    var vl = response.website + '|' + response.name + '|' + response.logo + '\n';
                    $('.result-laystorecuadich').append(vl);

                    item.parent().remove();

                    loop_couponsoar();
                },
                statusCode: {
                    500: function() {
                        console.log('Error 500! Mark as die');
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }

    $('#btnPrepare_couponasion').click(function () {
        var arr = $('#txtInput').val().split('\n');
        for(var i = 0; i < arr.length; i++){
            var item = arr[i].split('|');
            var el = '<p><a class="item" href="'+item[1]+'">'+item[0]+'</a></p>';
            $('#prepare').append(el);
        }
    });

    $('#btnProcess_couponasion').click(function () {
        loop_couponAsion();
    });
    function loop_couponAsion() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            var url = item.attr('href');
            var name = item.text();
            var data = {
                name: name,
                url: url
            };
            $.ajax({
                url: 'store/read',
                data: data,
                type: "GET",
                success: function(response) {
                    try{
                        response = JSON.parse(response);
                        var vl = response.website + '|' + response.name + '|' + response.logo + '\n';
                        $('.result-laystorecuadich').append(vl);
                        item.parent().remove();
                        loop_couponAsion();
                    }catch (err){
                        item.parent().remove();
                        loop_couponAsion();
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }

    /* Update link aff theo domain */
    $('#btnPrepare_updateaff').click(function () {
        var arr = $('#txtInput').val().split('\n');
        for(var i = 0; i < arr.length; i++){
            var item = arr[i].split('|');
            var el = '<p><a class="item" domain="'+item[0]+'" aff-url="'+item[1]+'">'+arr[i]+'</a></p>';
            $('#prepare').append(el);
        }
    });
    $('#btnProcess_updateaff').click(function () {
        loop_updateaff();
    });
    function loop_updateaff() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            var domain = item.attr('domain');
            var affUrl = item.attr('aff-url');
            var data = {
                domain: domain,affUrl: affUrl
            };
            $.ajax({
                url: 'store/update-aff-by-domain',
                data: data,
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    var vl = domain + '|' + affUrl + '|' + response + '\n';
                    $('.result-laystorecuadich').append(vl);
                    item.parent().remove();
                    //
                    loop_updateaff();
                },
                statusCode: {
                    500: function() {
                        console.log('Error 500! Mark as die');
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }

    /* Add keyword vao site SERP */
    $('#btnPrepare_SERP').click(function () {
        var arr = $('#txtInput').val().split('\n');
        for(var i = 0; i < arr.length; i++){
            var item = arr[i];
            var el = '<p><a class="item">'+item+'</a></p>';
            $('#prepare').append(el);
        }
    });
    $('#btnProcess_SERP').click(function () {
        loop_SERP();
    });
    function loop_SERP() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            var serp_defaultKw = $('#serp_defaultKw').val();
            var data = {
                kw: item.text(),
                serp_defaultKw: serp_defaultKw
            };
            $.ajax({
                url: 'serp/add',
                data: data,
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    var vl = item + '|' + response + '\n';
                    $('.result-laystorecuadich').append(vl);

                    item.parent().remove();
                    //
                    loop_SERP();
                },
                statusCode: {
                    500: function() {
                        console.log('Error 500! Mark as die');
                    }
                }
            });
        }else{
            console.log('Done');
        }
    }
    /* GEnerate google site template */
    $('.btnPrepare_gene').click(function () {
        var arr = $('#txtInput').val().split('\n');
        for(var i = 0; i < arr.length; i++){
            var item = arr[i];
            var el = '<p><a class="item">'+item+'</a></p>';
            $('#prepare').append(el);
        }
    });
    $('#btnProcess_gene').click(function () {
        loop_gene();
    });
    function loop_gene() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            var data = {
                storeName: item.text(),
                domain: $('.domain').val()
            };
            $.ajax({
                url: 'store/gene',
                data: data,
                type: "GET",
                success: function(response) {
                    $('#resultTemplate').text(response);
                    item.parent().remove();
                }
            });
        }else{
            console.log('Done');
        }
    }
    /* Find coupon add to new store */
    $('#btnStartFind').click(function () {
        var parentStore = $('#parentStore').val(), childStore = $('#childStore').val(),findCpContaintText = $('#findCpContaintText').val(),dontCopyVerifyCp = $('#dontCopyVerifyCp').is(':checked') ? 1:0;

        var data = { findCpContaintText:findCpContaintText , parentStore:parentStore ,childStore:childStore,dontCopyVerifyCp:dontCopyVerifyCp};
        $.ajax({
            url: 'store/findCpContaintText',
            data: data,
            type: "GET",
            success: function(response) {
                $('.result-laystorecuadich').text(response);
            }
        });
    });
    /* Find all coupon of this store */
    $('#btnStartFindAllCoupon').click(function () {
        var parentStore = $('#parentStore').val(), childStore = $('#childStore').val(),findCpContaintText = $('#findCpContaintText').val(),dontCopyVerifyCp = $('#dontCopyVerifyCp').is(':checked') ? 1:0
            ,numberGenerated = $('#numberGenerated').val();
        var data = { findCpContaintText:findCpContaintText , parentStore:parentStore ,childStore:childStore,dontCopyVerifyCp:dontCopyVerifyCp,numberGenerated:numberGenerated };
        $.ajax({
            url: 'store/findAllCpContaintText',
            data: data,
            type: "GET",
            success: function(response) {
                $('.result-laystorecuadich').text(response);
            }
        });
    });
    /* Generate html template for google site api */
    $('#btnStartGoogleAPI').click(function () {
        loop_gene_gg_api();
    });
    function loop_gene_gg_api() {
        /*var blob = new Blob(['asdadasdads'], {
            "type": "text/html"
        });
        var a = document.createElement("a");
        // a.download = name;
        a.download = 'hehe';
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        // document.body.removeChild(a);
        return;*/

        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            var data = {
                storeName: item.text()
            };
            $.ajax({
                url: 'store/geneGoogleAPI',
                data: data,
                type: "GET",
                success: function(response) {
                    var fileName = response.fileName;
                    $('#txtResultTemplateGoogleApi').append(fileName + '\n');
                    if(response.html){
                        /* Save file to client */
                        var fileContent = response.html;

                        var blob = new Blob([fileContent], {
                            "type": "text/html"
                        });
                        var a = document.createElement("a");
                        a.download = fileName;
                        a.href = URL.createObjectURL(blob);
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        /*  */
                    }

                    item.parent().remove();
                    loop_gene_gg_api();
                }
            });
        }else{
            console.log('Done');
        }
    }
    /* Update list store running update coupon */
    function loopAddRunningStoreUpdateCp() {
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            var data = {
                storeName: item.text()
            };
            $.ajax({
                url: 'store/updateListStoreRunningUpdateCoupon',
                data: data,
                type: "GET",
                success: function(response) {
                    item.parent().remove();
                    loopAddRunningStoreUpdateCp();
                }
            });
        }else{
            console.log('Done');
        }
    }
    $('#btnUpdateList').click(function () {
        loopAddRunningStoreUpdateCp();
    });
    /* Fix fake coupon title+descrition */
    /*function loopFix() {
        $.ajax({
            url: 'store/fixCouponFake',
            type: "GET",
            success: function(response) {
                // loopFix();
            }
        });
    }
    $('#btnFixFakeCouponTitleDescription').click(function () {
        loopFix();
    });*/
    /* Auto add fake coupon when add Child store */
    function loopAddFakeCouponWhenAddChildStore() {
        $('.running').text('');
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            $('.running').text(item.text());
            var data = {
                strInput: item.text(),
                minCp: $('#minCp').val(),
                maxCp: $('#maxCp').val()
            };
            $.ajax({
                url: 'store/AddFakeCouponWhenAddChildStore',
                data: data,
                type: "POST",
                success: function(response) {
                    item.parent().remove();
                    loopAddFakeCouponWhenAddChildStore();
                }
            });
        }else{
            $('.running').text('Nothing');
            console.log('Done');
        }
    }
    $('#btnAddChildStoreAndFakeCoupon').click(function () {
        loopAddFakeCouponWhenAddChildStore();
    });
    /* Check status running auto pull coupon from other source */
    $('#btnCheckUpdateStatus').click(function () {
        $.ajax({
            url: 'getStatusRunningUpdate',
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                $('.updated').html(response.updated);
                $('.remain').html(response.remain);
                $('.total').html(response.remain + response.updated);
            }
        });
    });
    /* Fake coupon theo list dua vao */
    function loopFakeCouponByList() {
        $('.running').text('');
        console.log('Con lai %s', $('.item').length);
        if($('.item').length > 0){
            var item = $('.item').first();
            $('.running').text(item.text());
            var data = {
                storeName: item.text(),
                minCp: $('#minCp').val(),
                maxCp: $('#maxCp').val()
            };
            $.ajax({
                url: 'store/fakeCouponByList',
                data: data,
                type: "GET",
                success: function(response) {
                    item.parent().remove();
                    loopFakeCouponByList();
                }
            });
        }else{
            $('.running').text('Nothing');
            console.log('Done');
        }
    }
    $('#btnFakeCouponByList').click(function () {
        loopFakeCouponByList();
    });
});