$(document).ready(function () {
    var entry_1 = [];
    var adword_7_0 = [], adword_7_1 = [];
    var adword_8_0 = [], adword_8_1 = [];
    var adword_9_0 = [], adword_9_1 = [];
    var adword_10_0 = [], adword_10_1 = [];
    var adword_11_0 = [], adword_11_1 = [];
    var adword = [], commission = [];
    var networkPlatform = [];
    function find(entry, col) {
        var found = '';
        $(entry).each(function(){
            if(this.title.$t === col){
                found = this.gs$cell.$t;
                // break loop when found
                return false;
            }
        });
        return found;
    }
    function loop() {
        console.log('Con lai %s', $('.store-name.not-check').length);
        if($('.store-name.not-check').length > 0){
            var el = $('.store-name.not-check').first();
            var storeName = el.text().trim();
            var domain = el.parent().find('.domain').text().trim();
            var affUrl = el.parent().find('.aff-url').text().trim();
            domain = cleanDomain(domain);
            if(domain){
                var linkLogin = '',usr='',pwd='',runningAds='',money='';
                $(entry_1).each(function(){
                    var row = this.gs$cell.row;
                    var val = this.gs$cell.$t;
                    val = cleanDomain(val);
                    /* Tim thong tin chung: link login, usr, pwd... */
                    if(domain === val){
                        var colLinkLogin = 'H' + row;
                        var colUsr = 'K' + row;
                        var colPwd = 'L' + row;
                        // find values in sheet
                        linkLogin = find(entry_1, colLinkLogin);
                        usr = find(entry_1, colUsr);
                        pwd = find(entry_1, colPwd);
                        // break loop when found
                        return false;
                    }
                });
                if(linkLogin == '' || usr == '' || pwd == ''){
                    $(networkPlatform).each(function(){
                        var row = this.gs$cell.row;
                        var val = this.gs$cell.$t;
                        if(storeName === val){
                            var colLinkLogin = 'H' + row;
                            var colUsr = 'K' + row;
                            var colPwd = 'L' + row;
                            var colNetworkName = 'P' + row;
                            // find values in sheet
                            linkLogin = find(networkPlatform, colLinkLogin);
                            usr = find(networkPlatform, colUsr);
                            pwd = find(networkPlatform, colPwd);
                            networkName = find(networkPlatform, colNetworkName);
                            // break loop when found
                            return false;
                        }
                    });
                }
                /* Tim thong tin chay ads */
                $(adword).each(function(){
                    var row = this.gs$cell.row;
                    var val = this.gs$cell.$t;
                    if(storeName === val){
                        var colRunningAds = 'J' + row;
                        // find values in sheet
                        runningAds = find(adword, colRunningAds);
                        // break loop when found
                        return false;
                    }
                });
                /* Tim doanh thu tu ads */
                $(commission).each(function(){
                    var row = this.gs$cell.row;
                    var val = this.gs$cell.$t;
                    if(storeName === val){
                        var colMoneyFromAds = 'B' + row;
                        // find values in sheet
                        money = find(commission, colMoneyFromAds);
                        console.log(typeof money, money);
                        if(money == 0)
                            money = '';
                        // break loop when found
                        return false;
                    }
                });
                /* Do du lieu vao table row */
                el.parent('.row-table').find('.username').text(usr);
                el.parent('.row-table').find('.pwd').text(pwd);
                // el.parent('.row-table').find('.network').text(network);
                el.parent('.row-table').find('.link-login').text(linkLogin);
                el.parent('.row-table').find('.money').text(money);
                el.parent('.row-table').find('.ads').text(runningAds);

                // Get network name
                var networkName = getNetworkName(affUrl, storeName);
                el.parent('.row-table').find('.network').text(networkName);

                //Get alexa rank
                $.ajax({
                    url: sitePath + '/alexa',
                    data: {url: domain},
                    type: "GET",
                    success: function(response) {
                        response = JSON.parse(response);
                        var rank = response.globalRank.replace(/\,/g,'.');
                        el.parent('.row-table').find('.alexa').text(rank);

                        el.removeClass('not-check').addClass('checked');
                        el.parent().addClass('green');

                        console.log(linkLogin,usr,pwd,runningAds,networkName,money,rank);
                        loop();
                    }
                });
            }
        }else{
            // alert('Hoàn thành! Copy tất cả và paste vào google sheet');
            console.log('Hoàn thành! Copy tất cả và paste vào google sheet');
        }
    }

    function cleanDomain(val) {
        val = val.replace(/http(s)?(:\/\/)?(www\.)?/g, '');
        val = val.replace(/(www.)?/g, '');
        return val;
    }

    $('#btnContinue').click(function (e) {
        e.preventDefault();
        loop();
    });

    function loadGoogleSheetData() {
        $.when(
            loadSheet_hastag(),
            loadSheet_adword_7_0(),
            loadSheet_adword_7_1(),
            loadSheet_adword_8_0(),
            loadSheet_adword_8_1(),
            loadSheet_adword_9_0(),
            loadSheet_adword_9_1(),
            loadSheet_adword_10_0(),
            loadSheet_adword_10_1(),
            loadSheet_adword_11_0(),
            loadSheet_adword_11_1(),
            loadSheet_network_platform()
        ).then(function () {
            // alert('Loaded data');
            adword = adword.concat(adword_7_0,adword_8_0,adword_9_0,adword_10_0,adword_11_0);
            commission = commission.concat(adword_7_1,adword_8_1,adword_9_1,adword_10_1,adword_11_1);
            console.log('Loaded data');
            $('.load-data').text('Loaded data');
            console.log(adword.length, commission.length);
        });
    }

    $('#btnLoadGoogleSheet').click(function (e) {
        e.preventDefault();
        loadGoogleSheetData();
    });

    function loadSheet_hastag() {
        // ID of the Google Spreadsheet
        var spreadsheetID = "1qmu9s8gwhevAZ175S42qJLu_BsIlWKLjqfAPhzvqAqo";
        var tabId = 7;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        console.log(url);
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            entry_1 = data.feed.entry;
            console.log('Load done %s items', entry_1.length);
        });
    }
    /* Load thong tin store chay ad */
    /* Load column Doanh thu tu ads */
    function loadSheet_adword_7_0() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '1s4KGnDzeOsZN5JSxAMXP3PYKNvwkaPRx8JVC15gbD20';
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_7_0 = data.feed.entry;
            console.log('Load done %s items', adword_7_0.length);
        });
    }
    function loadSheet_adword_7_1() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '1s4KGnDzeOsZN5JSxAMXP3PYKNvwkaPRx8JVC15gbD20';
        var tabId = 2;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_7_1 = data.feed.entry;
            console.log('Load done %s items', adword_7_1.length);
        });
    }

    function loadSheet_adword_8_0() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '19MsoUPhF0JxGiQ6ZfbkvYchMpwfgvQA4vnCpeu44YNE';
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_8_0 = data.feed.entry;
            console.log('Load done %s items', adword_8_0.length);
        });
    }
    function loadSheet_adword_8_1() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '19MsoUPhF0JxGiQ6ZfbkvYchMpwfgvQA4vnCpeu44YNE';
        var tabId = 2;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_8_1 = data.feed.entry;
            console.log('Load done %s items', adword_8_1.length);
        });
    }

    function loadSheet_adword_9_0() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '1CG5-lsEVAyI-bCf9JbFaVHpDIzNxHh6BWFZEEDlE7s8';
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_9_0 = data.feed.entry;
            console.log('Load done %s items', adword_9_0.length);
        });
    }
    function loadSheet_adword_9_1() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '1CG5-lsEVAyI-bCf9JbFaVHpDIzNxHh6BWFZEEDlE7s8';
        var tabId = 2;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_9_1 = data.feed.entry;
            console.log('Load done %s items', adword_9_1.length);
        });
    }

    function loadSheet_adword_10_0() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '1l7uOBOeaYVn7OeqqA3DYyI3pp_vyYYx9riDxtSugLDs';
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_10_0 = data.feed.entry;
            console.log('Load done %s items', adword_10_0.length);
        });
    }
    function loadSheet_adword_10_1() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '1l7uOBOeaYVn7OeqqA3DYyI3pp_vyYYx9riDxtSugLDs';
        var tabId = 2;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_10_1 = data.feed.entry;
            console.log('Load done %s items', adword_10_1.length);
        });
    }

    function loadSheet_adword_11_0() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '1x_b1cXk_ICPOuc8pVndrzmoPpxYaVSOfiO9Pc1tXX4I';
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_11_0 = data.feed.entry;
            console.log('Load done %s items', adword_11_0.length);
        });
    }
    function loadSheet_adword_11_1() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '1x_b1cXk_ICPOuc8pVndrzmoPpxYaVSOfiO9Pc1tXX4I';
        var tabId = 2;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            adword_11_1 = data.feed.entry;
            console.log('Load done %s items', adword_11_1.length);
        });
    }
    function loadSheet_network_platform() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '19ci4i2gZxEggSbS7R1nTOxSrKZ0J7E4SOUX47q968GM';
        var tabId = 1;
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        // var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json-in-script";
        return $.getJSON(url, function(data) {
            networkPlatform = data.feed.entry;
            console.log('Load done %s items', adword_11_1.length);
        });
    }

    function getNetworkName(input,name) {
        if(input.indexOf('redirect.viglink.com') !== -1){
            return 'Viglink';
        }if(input.indexOf('fave.co') !== -1){
            return 'Skimlink';
        }if(
            input.indexOf('gopjn.com') !== -1
            || input.indexOf('pjatr.com') !== -1
            || input.indexOf('pjtra.com') !== -1
            || input.indexOf('pntra.com') !== -1
            || input.indexOf('pntrac.com') !== -1
            || input.indexOf('pntrs.com') !== -1
        ){
            return 'Pepper jam';
        }if(input.indexOf('tc.tradetracker.net') !== -1){
            return 'Trade tracker';
        }if(input.indexOf('scripts.affiliatefuture.com') !== -1){
            return 'Affiliate Future';
        }if(input.indexOf('hop.clickbank.net') !== -1){
            return 'Click bank';
        }if(input.indexOf('cfjump.com') !== -1 || input.indexOf('track.commissionfactory.com.au') !== -1){
            return 'Commission Factory';
        }if(input.indexOf('clixGalore.com') !== -1){
            return 'ClixGalore';
        }if(input.indexOf('linkconnector.com') !== -1){
            return 'Link Connector';
        }if(input.indexOf('track.markethealth.com') !== -1){
            return 'Market health';
        }if(input.indexOf('track.paydot.com') !== -1 || input.indexOf('track.moreniche.com') !== -1){
            return 'Paydot / Moreniche';
        }if(input.indexOf('plimus.com') !== -1){
            return 'Plimus';
        }if(input.indexOf('afiliapub.com') !== -1){
            return 'Affiliapub';
        }if(input.indexOf('pampanetwork.com') !== -1){
            return 'Pampanetwork';
        }if(input.indexOf('tr.styles.my') !== -1){
            return 'Styles.my';
        }if(input.indexOf('tiny.shopstylers.com') !== -1 || input.indexOf('tracking.shopstylers.com') !== -1){
            return 'Shopstyles.com';
        }if(input.indexOf('track.targetclick.com') !== -1){
            return 'Target click';
        }if(input.indexOf('shopper.mycommerce.com') !== -1){
            return 'Mycommerce';
        }if(input.indexOf('e-junkie.com') !== -1){
            return 'E-junkie';
        }if(input.indexOf('3rdcoastmugs.com') !== -1 || input.indexOf('realliferosary.refersion.com') !== -1 || input.indexOf('refersion') !== -1 || input.indexOf('rfsn=') !== -1){
            return 'Refersion';
        }if(input.indexOf('shop.thehippiediva.com') !== -1){
            return 'Enlistly';
        }if(input.indexOf('shopy2gocom.grsm.io') !== -1){
            return 'Growsumo';
        }if(input.indexOf('shareasale.com') !== -1){
            return 'shareasale.com';
        }if(input.indexOf('anrdoezrs.net') !== -1){
            return 'CJ';
        }if(input.indexOf('paidonresults.net') !== -1){
            return 'Paidonresults';
        }if(input.indexOf('secure.avangate.com') !== -1){
            return 'Avangate';
        }if(input.indexOf('clkuk.tradedoubler.com') !== -1){
            return 'Tradedoubler';
        }if(input.indexOf('click.linksynergy.com') !== -1){
            return 'Linkshare (Rakuten)';
        }else{
            var networkName = '';
            $(networkPlatform).each(function(){
                var row = this.gs$cell.row;
                var val = this.gs$cell.$t;
                if(name === val){
                    var colNetworkName = 'P' + row;
                    // find values in sheet
                    networkName = find(networkPlatform, colNetworkName);
                    // break loop when found
                    return false;
                }
            });
            return networkName;
        }
    }

    loadGoogleSheetData();
});