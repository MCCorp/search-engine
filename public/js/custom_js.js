$(document).ready(function () {
    var txtStoreName = $('#txtStoreName');
    txtStoreName.select();
    txtStoreName.click(function () {
        $(this).select();
    });
    txtStoreName.on('change', function () {
        searchNow();
    });
    function countResult() {
        var c = $('.search-result').length;
        $('#found').html(c);
    }
    $('#frm-1').submit(function (e) {
        e.preventDefault();
    });
    $('#btnSearch').click(function () {
        searchNow();
    });

    /* Find data in JSON file excel loaded */
    var hasTag_new,hasTag_old,netAndPlatform,stores10k,stores20k,stores25k,storesMarch2018,storesApril2018;
    hasTag_new = hasTag_old = netAndPlatform = stores10k = stores20k = stores25k = storesMarch2018 = storesApril2018 = [];
    function loadGoogleSheetData() {
        $.when(
            loadSheet_hastag_old(),
            loadSheet_hastag_new(),
            loadSheet_storeNetAndPlatform(),
            loadSheet_10kStores(),
            loadSheet_20kStores(),
            loadSheet_25kStores(),
            loadSheet_storesMarch2018(),
            loadSheet_storesApril2018()
        ).then(function () {
            $('.status-load-googlesheetdata').removeClass('alert-danger').addClass('alert-success');
            $('.status-load-googlesheetdata').text('Loaded data');
            console.log('Loaded data');
        });
    }
    function loadSheet_hastag_old() {
        // ID of the Google Spreadsheet
        // var spreadsheetID = "1qmu9s8gwhevAZ175S42qJLu_BsIlWKLjqfAPhzvqAqo";
        var spreadsheetID = "1Y4Bq3p-oP9UyGSFpPLerEKT6M3KXU0EOu0HvAfM3H0s";
        //var tabId = 5; // sheet Store Mạng lẻ (Marketing)
        var tabId = 1; // sheet Store Mạng lẻ (Marketing)
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        return $.getJSON(url, function(data) {
            hasTag_old = data.feed.entry;
            console.log('Load done %s items [HasTag cu]', hasTag_old.length);
        });
    }
    function loadSheet_hastag_new() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1Q2l68SEDZj3o3uPwOta5774nRoJrO-3auJLdppaN9mA";
        var tabId = 1; // sheet Store mạng lẻ
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        return $.getJSON(url, function(data) {
            hasTag_new = data.feed.entry;
            console.log('Load done %s items [HasTag moi]', hasTag_new.length);
        });
    }
    function loadSheet_storeNetAndPlatform() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1XQjOFvL4MnwP-7CxjxLg66oKwk6vydUEhce8H94uO0Y";
        var tabId = 2;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        console.log(url);
        return $.getJSON(url, function(data) {
            netAndPlatform = data.feed.entry;
            console.log('Load done %s items [Net & Platform]', netAndPlatform.length);
        });
    }
    function loadSheet_10kStores() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1XQjOFvL4MnwP-7CxjxLg66oKwk6vydUEhce8H94uO0Y";
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        return $.getJSON(url, function(data) {
            stores10k = data.feed.entry;
            console.log('Load done %s items [10k Stores]', stores10k.length);
        });
    }
    function loadSheet_20kStores() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1llJ7Ul2mJX5NW8tYzPUvUVmcmzRdS6I13TcpjBAiBto";
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        return $.getJSON(url, function(data) {
            stores20k = data.feed.entry;
            console.log('Load done %s items [20k Stores]', stores20k.length);
        });
    }
    function loadSheet_25kStores() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1wdrRTic-owxtccsL4jo8X0mZ9BmJb8pPVapLlcmp4-I";
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        return $.getJSON(url, function(data) {
            stores25k = data.feed.entry;
            console.log('Load done %s items '+url, stores25k.length);
        });
    }
    function loadSheet_storesMarch2018() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1FYDCRcUMX94cyX5s6WAE2K2vqeN9cvBkRjJhugflVVo";
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        return $.getJSON(url, function(data) {
            storesMarch2018 = data.feed.entry;
            console.log('Load done %s items '+url, storesMarch2018.length);
        });
    }
    function loadSheet_storesApril2018() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1YlpNh_5DBET5cpIGr7kAh1wFlVs3MlBHUcmIlC7j214";
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        console.log(url);
        return $.getJSON(url, function(data) {
            storesApril2018 = data.feed.entry;
            console.log('Load done %s items '+url, storesApril2018.length);
        });
    }

    function find(entry, col) {
        var found = '';
        $(entry).each(function(){
            if(this.title.$t.indexOf(col) !== -1){
                console.log(this.title.$t, col);
                found = this.gs$cell.$t;
                // break loop when found
                // return false;
            }
        });
        return found;
    }
    // Load all files
    loadGoogleSheetData();
    /* END json google sheet */

    /* Action search */
    function searchNow() {
        $('.table-body').empty();
        $('#found').empty();
        $('.fa').removeClass('fa-check');
        $('.special-alert').empty();

        var keyword = txtStoreName.val();
        if(keyword === ''){
            txtStoreName.select();
            return false;
        }
        searchFile_Hastag_1(keyword);
        searchFile_Hastag_2(keyword);
        searchFile_NetAndPlatform(keyword);
        searchFile_store10k(keyword);
        searchFile_store20k(keyword);
        searchFile_store25k(keyword);
        searchFile_storeMarch2018(keyword);
        searchFile_storeApril2018(keyword);

        searchCJ(keyword, 'joined');
        searchCJ(keyword, 'notjoined');
        searchDataFeedr(keyword);
        searchViglink(keyword);
        searchCPD(keyword);
        searchAdrecord(keyword);
        searchTradedoubler(keyword);
        searchAdmitad(keyword);
        searchAffiliatly(keyword);
        searchShareasale(keyword);
        // searchGoogleSheet(keyword);
    }

    // var foundIn_HasTag_1_storename,foundIn_HasTag_1_domain;
    function searchFile_Hastag_1(findMe) {
        $(hasTag_old).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            
            if(val.indexOf(findMe) !== -1){
                console.log('match file 1');
                var source = 'File Hastag 1 (Old)';
                var network = '';
                var destination = '';
                var tr = '<tr class="search-result" style="background-color: aliceblue;"> <th scope="row"></th> <td>'+source+'</td><td>'+val+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                $('.table-body').append(tr);
                countResult();
                // break loop when found
                // return false;
            }
        });
        $('#_googlesheet1').addClass('fa-check');
    }
    // var foundIn_HasTag_2_storename,foundIn_HasTag_2_domain;
    function searchFile_Hastag_2(findMe) {
        $(hasTag_new).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            
            if(val.indexOf(findMe) !== -1){
                console.log('match file 2');
                var source = 'File Hastag 2 (New)';
                var network = '';
                var destination = '';
                var tr = '<tr class="search-result" style="background-color: aliceblue;"> <th scope="row"></th> <td>'+source+'</td><td>'+val+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                $('.table-body').append(tr);
                countResult();
                // break loop when found
                return false;
            }
        });
        $('#_googlesheet2').addClass('fa-check');
    }
    // var foundIn_netAndPlatform;
    function searchFile_NetAndPlatform(findMe) {
        $(netAndPlatform).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            
            if(val.indexOf(findMe) !== -1){
                console.log('match file network and platform');
                var source = 'GGS Network and Platform';
                var network = '';
                var destination = '';
                var tr = '<tr class="search-result" style="background-color: aliceblue;"> <th scope="row"></th> <td>'+source+'</td><td>'+val+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                $('.table-body').append(tr);
                countResult();
                // break loop when found
                return false;
            }
        });
        $('#_googlesheet_networkandplatform').addClass('fa-check');
    }
    // var foundIn_store10k;
    function searchFile_store10k(findMe) {
        $(stores10k).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            
            if(val.indexOf(findMe) !== -1){
                console.log('match file 10k stores');
                var source = 'GGS 10k Stores';
                var network = '';
                var destination = '';
                var tr = '<tr class="search-result" style="background-color: aliceblue;"> <th scope="row"></th> <td>'+source+'</td><td>'+val+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                $('.table-body').append(tr);
                countResult();
                // break loop when found
                return false;
            }
        });
        $('#_googlesheet_10k').addClass('fa-check');
    }
    function searchFile_store20k(findMe) {
        $(stores20k).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            
            if(val.indexOf(findMe) !== -1){
                console.log('match file 20k stores');
                var source = 'GGS 20k Stores';
                var network = '';
                var destination = '';
                var tr = '<tr class="search-result" style="background-color: aliceblue;"> <th scope="row"></th> <td>'+source+'</td><td>'+val+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                $('.table-body').append(tr);
                countResult();
                // break loop when found
                return false;
            }
        });
        $('#_googlesheet_20k').addClass('fa-check');
    }
    function searchFile_store25k(findMe) {
        $(stores25k).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            
            if(val.indexOf(findMe) !== -1){
                console.log('match file 25k stores');
                
                var source = 'GGS 25k Stores';
                var network = '';
                var destination = '';
                var tr = '<tr class="search-result" style="background-color: aliceblue;"> <th scope="row"></th> <td>'+source+'</td><td>'+val+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                $('.table-body').append(tr);
                countResult();
                // break loop when found
                return false;
            }
        });
        $('#_googlesheet_25k').addClass('fa-check');
    }
    function searchFile_storeMarch2018(findMe) {
        $(storesMarch2018).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            
            if(val.indexOf(findMe) !== -1){
                console.log('match file March 2018');
                
                var source = 'GGS March 2018 Stores';
                var network = '';
                var destination = '';
                var tr = '<tr class="search-result" style="background-color: aliceblue;"> <th scope="row"></th> <td>'+source+'</td><td>'+val+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                $('.table-body').append(tr);
                countResult();
                // break loop when found
                return false;
            }
        });
        $('#_googlesheet_March2018').addClass('fa-check');
    }

    function searchFile_storeApril2018(findMe) {
        $(storesApril2018).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            
            if(val.indexOf(findMe) !== -1){
                console.log('match file April 2018');
                
                var source = 'GGS April 2018 Stores';
                var network = '';
                var destination = '';
                var tr = '<tr class="search-result" style="background-color: aliceblue;"> <th scope="row"></th> <td>'+source+'</td><td>'+val+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                $('.table-body').append(tr);
                countResult();
                // break loop when found
                return false;
            }
        });
        $('#_googlesheet_April2018').addClass('fa-check');
    }

    /* Search in networks */
    function searchCJ(keyword, status) {
        $.ajax({
            url: 'cj/search',
            data: {keyword: keyword, status: status},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                for(var i = 0; i < response.length; i++){
                    var source = 'CJ';
                    var name = response[i];
                    var network = 'Commission Junction';
                    var destination = '';
                    var tr = '<tr class="search-result" style="background-color: aliceblue;"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                    $('.table-body').append(tr);
                }
                $('#_cj').addClass('fa-check');
                countResult();
            }
        });
    }
    function searchDataFeedr(keyword) {
        $.ajax({
            url: 'datafeedr/search',
            data: {keyword: keyword},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                if(response.length > 0) {
                    for(var i = 0; i < response.length; i++){
                        var source = 'Datafeedr';
                        var name = response[i]['name'];
                        var destination = '';
                        var network = response[i]['source'];
                        var tr = '<tr class="search-result"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                        $('.table-body').append(tr);
                    }
                }
                $('#_datafeedr').addClass('fa-check');
                countResult();
            }
        });
    }
    function searchViglink(keyword) {
        $.ajax({
            url: 'viglink/search',
            data: {keyword: keyword},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                if(response.length > 0) {
                    for(var i = 0; i < response.length; i++){
                        var source = 'Viglink';
                        var name = response[i];
                        var destination = '';
                        var network = 'Viglink';
                        var tr = '<tr class="search-result"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                        $('.table-body').append(tr);
                    }
                }
                $('#_viglink').addClass('fa-check');
                countResult();
            }
        });
    }
    function searchCPD(keyword) {
        $.ajax({
            url: 'cpd/search',
            data: {keyword: keyword},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                if(response.length > 0) {
                    for(var i = 0; i < response.length; i++){
                        var source = 'CouponsPlusDeals.com';
                        var name = '<p><b>'+response[i].name+'</b></p>';
                        name += '<p>Store url: '+response[i].store_url+'</p>';
                        name += '<p>Aff url: '+response[i].affiliate_url+'</p>';
                        name += '<p>Coupon count: '+response[i].coupon_count+'</p>';
                        name += '<p>Deal count: '+response[i].deal_count+'</p>';
                        name += '<p>Created at: '+response[i].created_at+'</p>';
                        name += '<p>Updated at: '+response[i].updated_at+'</p>';
                        var destination = '';
                        var network = '';
                        var tr = '<tr class="search-result"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                        $('.table-body').append(tr);
                    }

                    for(var i = 0; i < response.length; i++){
                        var cls = '';
                        if(response[i].affiliate_url){
                            cls = 'alert-success';
                        }else{
                            cls = 'alert-danger';
                        }
                        var el = '<p class="alert '+cls+'"><strong>CPD: '+response[i].name+'</strong>';
                        if(response[i].affiliate_url){
                            el += ' Aff url: ' + response[i].affiliate_url;
                        }else{
                            el += ' Chưa có link affiliate';
                        }

                        el += '</p>';
                        $('.special-alert').append(el);
                    }
                }
                $('#_cpd').addClass('fa-check');
                countResult();
            }
        });
    }
    function searchAdrecord(keyword) {
        $.ajax({
            url: 'adrecord/search',
            data: {keyword: keyword},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                if(response.length > 0) {
                    for(var i = 0; i < response.length; i++){
                        var e = response[i];
                        var source = 'Adrecord';
                        var name = e.name;
                        var destination = e.homepage;
                        var network = 'Adrecord';
                        var tr = '<tr class="search-result"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                        $('.table-body').append(tr);
                    }
                }
                $('#_adrecord').addClass('fa-check');
                countResult();
            }
        });
    }
    function searchTradedoubler(keyword) {
        $.ajax({
            url: 'tradedoubler/search',
            data: {keyword: keyword},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                if(response.length > 0) {
                    for(var i = 0; i < response.length; i++){
                        var e = response[i];
                        var source = 'TradeDouble';
                        var name = e;
                        var destination = '';
                        var network = 'TradeDouble';
                        var tr = '<tr class="search-result"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                        $('.table-body').append(tr);
                    }
                }
                $('#_tradedouble').addClass('fa-check');
                countResult();
            }
        });
    }
    function searchAdmitad(keyword) {
        $.ajax({
            url: 'admitad/search',
            data: {keyword: keyword},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                if(response.length > 0) {
                    for(var i = 0; i < response.length; i++){
                        var e = response[i];
                        var source = 'Admitad';
                        var name = e;
                        var destination = '';
                        var network = 'Admitad';
                        var tr = '<tr class="search-result"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                        $('.table-body').append(tr);
                    }
                }
                $('#_admitad').addClass('fa-check');
                countResult();
            }
        });
    }
    function searchAffiliatly(keyword) {
        $.ajax({
            url: 'affiliatly/search',
            data: {keyword: keyword},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                if(response.length > 0) {
                    for(var i = 0; i < response.length; i++){
                        var e = response[i];
                        var source = 'Affiliatly';
                        var name = e;
                        var destination = '';
                        var network = 'Affiliatly';
                        var tr = '<tr class="search-result"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                        $('.table-body').append(tr);
                    }
                }
                $('#_affiliatly').addClass('fa-check');
                countResult();
            }
        });
    }
    function searchShareasale(keyword) {
        $.ajax({
            url: 'shareasale/search',
            data: {keyword: keyword},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                if(response.length > 0) {
                    for(var i = 0; i < response.length; i++){
                        var e = response[i];
                        var source = 'Shareasale';
                        var name = e;
                        var destination = '';
                        var network = 'Shareasale';
                        var tr = '<tr class="search-result"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                        $('.table-body').append(tr);
                    }
                }
                $('#_shareasale').addClass('fa-check');
                countResult();
            }
        });
    }
    function searchGoogleSheet(keyword) {
        $.ajax({
            url: 'googlesheet/search',
            data: {keyword: keyword},
            type: "GET",
            success: function(response) {
                response = JSON.parse(response);
                if(response.length > 0) {
                    for(var i = 0; i < response.length; i++){
                        var e = response[i];
                        var source = 'Google Sheet';
                        var name = e;
                        var destination = '';
                        var network = 'Google Sheet';
                        var tr = '<tr class="search-result"> <th scope="row">'+(i+1)+'</th> <td>'+source+'</td><td>'+name+'</td><td>'+destination+'</td><td>'+network+'</td></tr>';
                        $('.table-body').append(tr);
                    }

                    for(var i = 0; i < response.length; i++){
                        var cls = '';
                        if(response[i].affiliate_url){
                            cls = 'alert-success';
                        }else{
                            cls = 'alert-danger';
                        }
                        var el = '<p class="alert '+cls+'"><strong>Google Sheet: '+response[i]+'</strong>';
                        el += '</p>';
                        $('.special-alert').append(el);
                    }
                }
                $('#_googlesheet').addClass('fa-check');
                countResult();
            }
        });
    }
    /* ///////////////////////////////////////////////////////////Multi search////////////////////////////////////////////////// */
    /* Multi search */
    var $found = false;
    var currentKeyword = '';
    var currentDomainOfKeyword = '';
    $('#btnSearchMulti').click(function () {
        // $(this).prop('disabled', true);
        $found = false;
        var input = $('#txtAreaKeyword').val();
        input = input.split('\n');
        // console.log(input.length);
        var els = '';
        for(var i = 0; i < input.length; i++){
            els += "<p class='kw'>"+input[i]+"</p>";
        }
        $('.kw-list').append(els);
    });
    $('#btnStart').click(function () {
        loop();
    });
    function _searchCJ_1() {
        var status = 'joined';
        return $.ajax({
            url: 'cj/search',
            data: {keyword: currentKeyword, status: status},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchCJ_2() {
        var status = 'notjoined';
        return $.ajax({
            url: 'cj/search',
            data: {keyword: currentKeyword, status: status},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchDataFeedr() {
        return $.ajax({
            url: 'datafeedr/search',
            data: {keyword: currentKeyword},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchViglink() {
        return $.ajax({
            url: 'viglink/search',
            data: {keyword: currentKeyword},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchCPD() {
        if($('#ignoreCPD').is(':checked')){
            return [];
        }else{
            return $.ajax({
                url: 'cpd/search',
                data: {keyword: currentKeyword},
                type: "GET",
                statusCode: {
                    500: function() {
                        console.log('Error 500! Try again after 5s');
                        setTimeout(function () {
                            loop();
                        },5000)
                    }
                }
            });
        }
    }
    function _searchAdrecord() {
        return $.ajax({
            url: 'adrecord/search',
            data: {keyword: currentKeyword},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchTradedoubler() {
        return $.ajax({
            url: 'tradedoubler/search',
            data: {keyword: currentKeyword},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchAdmitad() {
        return $.ajax({
            url: 'admitad/search',
            data: {keyword: currentKeyword},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchAffiliatly() {
        return $.ajax({
            url: 'affiliatly/search',
            data: {keyword: currentKeyword},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchShareasale() {
        return $.ajax({
            url: 'shareasale/search',
            data: {keyword: currentKeyword},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchGoogleSheet() {
        return $.ajax({
            url: 'googlesheet/search',
            data: {keyword: currentKeyword},
            type: "GET",
            statusCode: {
                500: function() {
                    console.log('Error 500! Try again after 5s');
                    setTimeout(function () {
                        loop();
                    },5000)
                }
            }
        });
    }
    function _searchFile_store10k() {
        var rs = [];
        $(stores10k).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            if(val == currentKeyword){
                rs.push(val);
                console.log('match file 10k stores');
                return false;
            }
        });
        console.log('tim thay %s', rs.length,rs);
        return rs;
    }
    function _searchFile_hastag_1() {
        var rs = [];
        $(hasTag_old).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            if(val == currentKeyword){
                rs.push(val);
                console.log('match file hastag old');
                return false;
            }
        });
        console.log('tim thay %s', rs.length,rs);
        return rs;
    }
    function _searchFile_hastag_2() {
        var rs = [];
        $(hasTag_new).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            if(val == currentKeyword){
                rs.push(val);
                console.log('match file hastag new');
                return false;
            }
        });
        console.log('tim thay %s', rs.length,rs);
        return rs;
    }
    function _searchFile_network() {
        var rs = [];
        $(netAndPlatform).each(function(){
            var row = this.gs$cell.row;
            var val = this.gs$cell.$t;
            if(val == currentKeyword){
                rs.push(val);
                console.log('match file network');
                return false;
            }
        });
        console.log('tim thay %s', rs.length,rs);
        return rs;
    }

    // Start multi search
    /* cj1, cj2, df... la response cua cac func _searchCJ_1(), _searchCJ_2()... */
    function showData(store10k, hasTagOld, hasTagNew, fileNetwork, cj1, cj2, df, vig, cpd, adr, trad, adm, aff, shar, gs) {
        if(typeof cj1[0] !== 'undefined')
            cj1 = JSON.parse(cj1[0]);
        else
            cj1 = [];

        if(typeof cj2[0] !== 'undefined')
            cj2 = JSON.parse(cj2[0]);
        else
            cj2 = [];

        if(typeof df[0] !== 'undefined')
            df = JSON.parse(df[0]);
        else
            df = [];

        if(typeof vig[0] !== 'undefined')
            vig = JSON.parse(vig[0]);
        else
            vig = [];

        if(typeof cpd[0] !== 'undefined')
            cpd = JSON.parse(cpd[0]);
        else
            cpd = [];

        if(typeof adr[0] !== 'undefined')
            adr = JSON.parse(adr[0]);
        else
            adr = [];

        if(typeof trad[0] !== 'undefined')
            trad = JSON.parse(trad[0]);
        else
            trad = [];

        if(typeof adm[0] !== 'undefined')
            adm = JSON.parse(adm[0]);
        else
            adm = [];

        if(typeof aff[0] !== 'undefined')
            aff = JSON.parse(aff[0]);
        else
            aff = [];

        if(typeof shar[0] !== 'undefined')
            shar = JSON.parse(shar[0]);
        else
            shar = [];

        if(typeof gs[0] !== 'undefined')
            gs = JSON.parse(gs[0]);
        else
            gs = [];

        console.log($found);
        // console.log(cj1,cj2,df,vig,cpd,adr,trad,adm,aff,shar,gs);
        /* Neu co bat cu ket qua nao, danh dau $found = true */
        if(cj1.length > 0 || cj2.length > 0 || df.length > 0 || vig.length > 0 || cpd.length > 0 || adr.length > 0 || trad.length > 0 || adm.length > 0 || aff.length > 0 || shar.length > 0 || gs.length > 0
        || store10k.length > 0 || hasTagOld.length > 0 || hasTagNew.length > 0 || fileNetwork.length > 0){
            $found = true;
        }

        console.log($found);

        var appendValues = '';

        if($found){
            if($('#modeFilterBigSite').is(':checked')){
                appendValues = currentKeyword + '|' + currentDomainOfKeyword + '\n';
            }else{
                appendValues = currentKeyword + '\n';
            }
            $('#resultFound').append(appendValues);
        }else{
            if($('#modeFilterBigSite').is(':checked')){
                appendValues = currentKeyword + '|' + currentDomainOfKeyword + '\n';
            }else{
                appendValues = currentKeyword + '\n';
            }
            $('#resultNotFound').append(appendValues);
        }

        console.log($('.kw').first().text() + ' => ' + $found);
        $('.kw').first().remove();
        // reset currentKeyword
        currentKeyword = '';
        currentDomainOfKeyword = '';
        loop();
    }
    function loop() {
        /* reset var $found before start again */
        $found = false;
        var inputVal = $('.kw').first().text().split('|');
        currentKeyword = inputVal[0];
        if($('#modeFilterBigSite').is(':checked')){
            var arrHref = inputVal[1].split('/');
            arrHref[arrHref.length - 1] = 'out/' + arrHref[arrHref.length - 1];
            currentDomainOfKeyword = arrHref.join('/');
        }
        console.log(currentKeyword, currentDomainOfKeyword);
        // var remove = [
        //     'discounts',
        //     'discount',
        //     'coupons',
        //     'coupon',
        //     'codes',
        //     'code',
        //     'promos',
        //     'promo',
        //     'promotions',
        //     'promotion'
        // ];
        // for(var i = 0; i < remove.length; i++){
        //     currentKeyword = currentKeyword.replace(remove[i],'');
        // }
        currentKeyword = currentKeyword.trim();
        console.log('currentKeyword %s | length %s', currentKeyword, currentKeyword.length);
        if($('.kw').first().length > 0 && currentKeyword.length > 0){
            $.when(
                _searchFile_store10k(),
                _searchFile_hastag_1(),
                _searchFile_hastag_2(),
                _searchFile_network(),
                _searchCJ_1(),
                _searchCJ_2(),
                _searchDataFeedr(),
                _searchViglink(),
                _searchCPD(),
                _searchAdrecord(),
                _searchTradedoubler(),
                _searchAdmitad(),
                _searchAffiliatly(),
                _searchShareasale(),
                _searchGoogleSheet()
            ).then(showData);
        }else{
            // $('#btnSearchMulti').prop('disabled', false);
            alert('Kiểm tra hoàn tất');
        }
    }
    /* End multi */
});