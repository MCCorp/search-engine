$(document).ready(function () {
    /* Prepare */
    $('#btnProcess').click(function () {
        var sites = $('#txtSite').val();
        sites = sites.split('\n');
        console.log('Parsing %s links', sites.length);
        if(sites.length > 0){
            var vl = '';
            for(var i = 0; i < sites.length; i++){
                var site = sites[i].trim();

                if(site !== '' && site.indexOf('.facebook.com') === -1
                    && site.indexOf('https://www.youtube.com') === -1
                    && site.indexOf('google.com') === -1
                    && site.indexOf('twitter.com') === -1
                    && site.indexOf('linkedin.com') === -1
                    && site.indexOf('wikipedia.org') === -1
                    && site.indexOf('forum') === -1
                )
                    vl += '<p class="_site" is-checked-rank="0"><a target="_blank" href="'+site+'">'+site+'</a></p>';
            }
            $('#prepareProcess').append(vl);
        }
    });
    /* Process */
    $('#processNow').click(function () {
        console.time('processNow');
        loop();
    });
    $('#removeRankSmaller').click(function () {
        if($('#ignoreAlexaRank').is(':checked')){
            loopGetRankAlexa();
        }
    });
    $('#stopNow').click(function () {
        $('#prepareProcess').empty();
    });
    function loopGetRankAlexa() {
        var firstLink = $('._site[is-checked-rank=0]').first();
        if(firstLink.length > 0){
            var href = firstLink.find('a').attr('href');
            $.ajax({
                url: 'alexa',
                data: {url: href},
                type: "GET",
                success: function(response) {
                    response = JSON.parse(response);
                    var globalRank = parseInt(response.globalRank);
                    var nf = new Intl.NumberFormat();
                    globalRank = nf.format(globalRank);

                    var remove = ignoreAlexaRankBelow(globalRank);
                    if(remove) {
                        console.log('Remove %s rank %s', href, globalRank);
                        firstLink.remove();
                    }else{
                        console.log('Valid %s %s', globalRank, href);
                    }
                    firstLink.attr('is-checked-rank', 1);
                    firstLink.attr('alexa', globalRank);
                    $('#remainCheckedRank').text($('p[is-checked-rank=0]').length);

                    loopGetRankAlexa();
                }
            });
        }else{
            console.log('Done');
        }
    }
    function loop() {
        $('#remainLink').text($('._site').length);
        if($('._site').length === 0){
            console.timeEnd('processNow');
            console.log('Xong');

            /* Co check trung voi CPD khong? */
            if($('#ignoreCPD').is(':checked') === false){
                console.time('removeExistInAfftrust');
                loopFilterWithAfftrust();
            }
            return;
        }

        var limit = 10;
        var arrAjax = [];
        for(var i = 0; i < limit; i++){
            var el = $('._site').eq(i);
            var url = el.text();
            var alexaRank = el.attr('alexa');
            if(url){
                arrAjax.push($.ajax({
                    url: 'process-site',
                    data: {url: url},
                    type: "GET",
                    success: function(response) {
                        response = JSON.parse(response);
                        if(typeof response.domain !== 'undefined' && response.data.length > 0){
                            var affUrls = '';
                            var plainUrls = '';
                            var p = '';
                            for(var i = 0; i < response.data.length; i++){
                                var item = response.data[i];
                                var href = item.href;
                                if(href[0] === '/'){
                                    href = response.domain + href;
                                }
                                if(href.indexOf('http') === -1 && href.indexOf('www.') === -1){
                                    href = response.domain + '/' +href;
                                }
                                p += '<p>'+item.text+' => <a target="_blank" href="'+href+'">'+href+'</a></p>';
                                affUrls += "=HYPERLINK('" + href + "','" + item.text + "');";
                                plainUrls += "=HYPERLINK('" + href + "','" + href + "');";
                            }

                            // var collapseId = response.domain.replace(/\./g, '');
                            // collapseId = collapseId.replace(/www\./g, '');
                            // collapseId = collapseId.replace(/https:\/\//g, '');
                            // collapseId = collapseId.replace(/http:\/\//g, '');
                            // console.log('collapseId',collapseId);

                            var tr = '<tr class="result-row">';
                            tr += '<td><a target="_blank" href="'+response.input+'">'+response.input+'</a></td>';
                            tr += '<td><a checked-afftrust="0" alexa-rank="'+alexaRank+'" title="'+response.title+'" aff-urls="'+affUrls+'" plain-urls="'+plainUrls+'" target="_blank" href="'+response.domain+'">'+response.domain+'</a></td>';
                            tr += '<td>'+response.title+'</td>';

                            var str = '';
                            // str += '<a class="text-primary" style="cursor: pointer;text-decoration: underline; " data-toggle="collapse" data-target="#'+collapseId+'">Ẩn / Hiện</a>';
                            // str += '<div id="'+collapseId+'" class="collapse">';
                            str += '<div class="scroll">';
                            str += p;
                            str += '</div>';

                            tr += '<td>'+str+'</td>';
                            // tr += '<td><a class="getRank" data-domain="'+response.domain+'">rank</a>' + '</td>';
                            tr += '<td>' + alexaRank + '</td>';
                            tr += '</tr>';
                            $('.tblResult_body').append(tr);
                        }else{
                            console.log(response.domain);
                            if(response.domain !== undefined){
                                var tr = '<tr class="result-row">';
                                tr += '<td><a target="_blank" href="'+response.input+'">'+response.input+'</a></td>';
                                tr += '<td><a checked-afftrust="0" alexa-rank="'+alexaRank+'" title="'+response.title+'" aff-urls="'+affUrls+'" plain-urls="'+plainUrls+'" target="_blank" href="'+response.domain+'">'+response.domain+'</a></td>';
                                tr += '<td>'+response.title+'</td>';

                                var str = '';
                                // str += '<a class="text-primary" style="cursor: pointer;text-decoration: underline; " data-toggle="collapse" data-target="#'+collapseId+'">Ẩn / Hiện</a>';
                                // str += '<div id="'+collapseId+'" class="collapse">';
                                str += '<div class="scroll">';
                                str += p;
                                str += '</div>';

                                tr += '<td>'+str+'</td>';
                                // tr += '<td><a class="getRank" data-domain="'+response.domain+'">rank</a>' + '</td>';
                                tr += '<td>' + alexaRank + '</td>';
                                tr += '</tr>';
                                $('.tblResult_body').append(tr);
                            }

                        }
                        // count all results
                        countResult();
                    }
                }));
            }
            el.remove();
        }
        $.when.apply(undefined, arrAjax).then(function () {
            loop();
        })
    }

    function ignoreAlexaRankBelow(inputRank) {
        var ignoreRank = parseInt($('#alexaRank').val());
        inputRank = inputRank.replace(/\,/g, '');
        inputRank = parseInt(inputRank);
        if(inputRank < ignoreRank)
            return true;
        return false;
    }

    function countResult() {
        $('.countResult').text($('.result-row').length);
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /*  */
    var kwNow = '';
    var checkingElementWithAfftrust = '';

    function _searchCJ_1() {
        var status = 'joined';
        return $.ajax({
            url: 'cj/search',
            data: {keyword: kwNow, status: status},
            type: "GET"
        });
    }
    function _searchCJ_2() {
        var status = 'notjoined';
        return $.ajax({
            url: 'cj/search',
            data: {keyword: kwNow, status: status},
            type: "GET"
        });
    }
    function _searchDataFeedr() {
        return $.ajax({
            url: 'datafeedr/search',
            data: {keyword: kwNow},
            type: "GET"
        });
    }
    function _searchViglink() {
        return $.ajax({
            url: 'viglink/search',
            data: {keyword: kwNow},
            type: "GET"
        });
    }
    function _searchCPD() {
        if($('#ignoreCPD').is(':checked')){
            return [];
        }else{
            return $.ajax({
                url: 'cpd/search',
                data: {keyword: kwNow},
                type: "GET"
            });
        }
    }
    function _searchAdrecord() {
        return $.ajax({
            url: 'adrecord/search',
            data: {keyword: kwNow},
            type: "GET"
        });
    }
    function _searchTradedoubler() {
        // api thang nay search qua lau, ke cmnl
        return [];
        return $.ajax({
            url: 'tradedoubler/search',
            data: {keyword: kwNow},
            type: "GET"
        });
    }
    function _searchAdmitad() {
        return $.ajax({
            url: 'admitad/search',
            data: {keyword: kwNow},
            type: "GET"
        });
    }
    function _searchAffiliatly() {
        return $.ajax({
            url: 'affiliatly/search',
            data: {keyword: kwNow},
            type: "GET"
        });
    }
    function _searchShareasale() {
        return $.ajax({
            url: 'shareasale/search',
            data: {keyword: kwNow},
            type: "GET"
        });
    }
    function _searchGoogleSheet() {
        return $.ajax({
            url: 'googlesheet/search',
            data: {keyword: kwNow},
            type: "GET"
        });
    }
    function showData(cj1, cj2, df, vig, cpd, adr, trad, adm, aff, shar, gs) {
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

        /* Neu co bat cu ket qua nao, danh dau $found = true */
        if(cj1.length > 0 || cj2.length > 0 || df.length > 0 || vig.length > 0 || cpd.length > 0 || adr.length > 0 || trad.length > 0 || adm.length > 0 || aff.length > 0 || shar.length > 0 || gs.length > 0)
            $found = true;
        if($found){
            console.log('Exist in Afftrust => Remove %s ', kwNow);
            checkingElementWithAfftrust.closest('.result-row').remove();
        }else{
            console.log('Not Exist in Afftrust => OK %s', kwNow);

            /* Add to GoogleSheet */
            var alexa = checkingElementWithAfftrust.attr('alexa-rank');
            var title = checkingElementWithAfftrust.attr('title');
            var homepage = checkingElementWithAfftrust.attr('href');
            var affUrls = checkingElementWithAfftrust.attr('aff-urls').split(';');
            var plainUrls = checkingElementWithAfftrust.attr('plain-urls').split(';');
            addToGoogleSheet(alexa, title, homepage, affUrls, plainUrls);
        }

        // reset kwNow
        kwNow = '';
        checkingElementWithAfftrust.attr('checked-afftrust', 1);
        $('#remainCheckAfftrust').text($('a[checked-afftrust=0]').length);
        loopFilterWithAfftrust();
    }

    function loopFilterWithAfftrust() {
        checkingElementWithAfftrust = $('a[checked-afftrust=0]').first();
        $found = false;

        kwNow = getDomainOnly(checkingElementWithAfftrust.attr('href'));

        if(checkingElementWithAfftrust.length > 0 && kwNow.length > 0){
            console.log('Checking keyword %s with Afftrust', kwNow);
            $.when(
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
            console.timeEnd('removeExistInAfftrust');
            console.log('Kiểm tra hoàn tất');
        }
    }

    $('#removeExistInAfftrust').click(function () {
        // console.time('removeExistInAfftrust');
        // loopFilterWithAfftrust();
        alert('Auto chay sau khi Bat dau tim');
    });
    var isSubdomain = function(url) {
        url = url || 'http://www.test-domain.com'; // just for the example
        var regex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);
        return !!url.match(regex); // make sure it returns boolean
    };
    function getDomainOnly(href) {
        var tmp = document.createElement ('a');
        tmp.href = href;
        var homepage = tmp.hostname.replace(/www\./g, '');
        var result = homepage;

        if(isSubdomain(homepage)){
            var separate = homepage.split('.');
            separate.shift();
            var currentdomain = separate.join('.');
            result = currentdomain.replace(/\//g, '');
        }
        return result;
    }
    /* Add to Google Sheet file */
    function addToGoogleSheet(alexa, title, homepage, affUrls, plainUrls) {
        $.ajax({
            url: 'googlesheet/update',
            data: {
                alexa: typeof alexa !== 'undefined' ? alexa:'',
                title: title,
                homepage: homepage,
                affUrls: affUrls,
                plainUrls: plainUrls
            },
            type: "POST",
            success: function (response) {

            }
        });
    }
});