$(document).ready(function () {
    var form_store_description = [];
    function getDescriptionByIndex(index) {
        var headDescription = '';
        var footerDescription = '';
        $(form_store_description).each(function(){
            var row = parseInt(this.gs$cell.row);
            var val = this.gs$cell.$t;
            if(row === index){
                var colFooterDescription = 'B' + row;
                footerDescription = find(form_store_description, colFooterDescription);
                headDescription = val;
                return false;
            }
        });
        return {head:headDescription, foot:footerDescription};
    }
    function loadSheet_form_store_description() {
        // ID of the Google Spreadsheet
        var spreadsheetID = '1DtrewUB_Y9wXGYgBLXjq1Vb4BL7EiuTfaQmm5cJRgE8';
        var tabId = 1;
        if(location.href.indexOf('couponsforsave.com') > -1){
            console.log('Load tab 2 for couponsforsave.com');
            tabId = 2;
        }
        // Make sure it is public or set to Anyone with link can view
        var url = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + "/" + tabId + "/public/values?alt=json";
        return $.getJSON(url, function(data) {
            form_store_description = data.feed.entry;
            console.log('Load done %s items', form_store_description.length);
        });
    }

    loadSheet_form_store_description();

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

    var indexStoreDescription = 1;
    var countApply = 1;
    var step = 20;
    function loop() {
        var el = $('.row-table.not-check').first();
        console.log(el.length);
        if(el.length > 0){
            var id = el.find('.id').text().trim();
            var name = el.find('.store-name').text().trim();
            console.log('checking ', name);

            console.log('countApply %s| step %s| countApply/step %s | Lay mo ta so %s ',countApply,step,countApply % step,indexStoreDescription);
            if(countApply % step != 0){
                var descriptions = getDescriptionByIndex(indexStoreDescription);
                $.ajax({
                    url: getDataPath,
                    data: {id: id, descriptions: descriptions},
                    type: "POST",
                    success: function (response) {
                        response = JSON.parse(response);
                        if(response === true){
                            console.log('ok');
                            el.removeClass('not-check').addClass('checked');
                            el.addClass('green');
                        }else{
                            el.removeClass('not-check').addClass('checked');
                        }
                        loop();
                    }
                })
            }else{
                setTimeout(function () {
                    console.log('pause 3s');
                    indexStoreDescription++;
                    loop();
                },3000)
            }
            countApply++;
        }else{
            console.log('done');
        }

    }

    $('#btnAction').click(function () {
        loop();
    });
});