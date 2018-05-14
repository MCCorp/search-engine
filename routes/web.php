<?php

Route::get('/', 'HomeSearchController@index');
Route::get('/search-keywords', 'HomeSearchController@index');
Route::get('/search-result', 'HomeSearchController@searchResult');
Route::get('/search-result-html', 'HomeSearchController@searchResultHtml');


