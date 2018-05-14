@extends('app')
<style>
    textarea{width:100%;height:auto;max-height:300px}
    .panel-title {
        padding-left: 10px;
    }
    .panel-title > a:before {
        margin-right: 10px;
        float: left !important;
        font-family: FontAwesome;
        content:"\f068";
        padding-right: 5px;
        display:block;
    }
    .panel-title > a.collapsed:before {
        float: left !important;
        content:"\f067";
    }
    .panel-title > a:hover,
    .panel-title > a:active,
    .panel-title > a:focus  {
        text-decoration:none;
    }
    .card-content {padding: 15px;padding-left: 30px}
    .items-domain {margin-bottom: 10px !important;}
    .items-domain .link{
        font-size: 18px;
        font-family: Arial,Helvetica,sans-serif;
        color: #1a0dab;
    }
    .holder-link {
        color: #006621;
    }
    .items {margin-bottom: 15px;}
</style>
@section('content_main')
<div class="container">
<div class="row">
    <div class="col-md-6">
        <div class="input-group">
            <input class="form-control" type="text" id="keywords" placeholder="search keywords..."<?=isset($_GET['q'])?' value="'.$_GET['q'].'"':''?>>
            <div class="input-group-append">
                <button id="search-button" class="input-group-text"><em class="fa fa-search fa-lg"></em></button>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <textarea readonly="1">@foreach($config as $domain){{$domain."\n"}}@endforeach</textarea>
    </div>
</div>
</div>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card" id="accordion" role="tablist" aria-multiselectable="true">
                    @foreach($config as $domain)<?php $domainId = str_replace('.','',$domain);?>
                        <div class="{{$domainId}}">
                                <div role="tab" id="headingOne" class="items-domain card-header">
                                    <h4 class="panel-title">
                                        <a class="collapsed" data-toggle="collapse" aria-controls="{{$domainId}}" href="#{{str_replace('.','',$domain)}}">
                                            {{$domain}}
                                        </a><b class="loading"></b>
                                    </h4>
                                </div>
                                <div id="{{$domainId}}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                    <div class="card-content">
                                        /* box content */
                                    </div>
                                </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
<script>
    function getResult(domains) {
        var domainId = domains.replace(/\./g,'');
        var domainItem = $('.'+domainId).eq(0);
        domainItem.find('.loading').eq(0).html('Loadding...');
        $.get('{{url('/search-result-html')}}', {q: $('#keywords').val(), domain: domains}, function(data) {
            domainItem.find('#'+domainId).find('.card-content').eq(0).html(data);
            domainItem.find('.loading').eq(0).html('<i class="fa fa-check-circle"></i>');
        });
    }
    $('#search-button').click(function(){
        @foreach($config as $domain)getResult('{{$domain}}');@endforeach
    });
    @if(isset($_GET['q']))$('#search-button').click();@endif
</script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
@endsection