<?php


return [

    'findgofind.co' => [
		'url' => 'http://findgofind.co/search?q=[q]',
		'box' => ['parent' => '#container-wrapper',  'find' => '.search-result-container'],
		'get' => [
		    'ifignore' => function($item) {return $item->find('cite a',0)?1:0;},
			'title' => 'a',
			'url' => ['find' => 'a', 'attr'=>'href'],
			'description' => '.result-desc'
		]
	],
    'infospace.com' => [
        'url' => 'http://search.infospace.com/search/web?q=[q]&searchbtn=Search',
        'box' => '.result',
        'get' => [
            'title' => '.title',
            'url' => '.url',
            'description' => ['find' => 'span', 'index' => '2']
        ],
        'block' => [
            'suggestion' => [
                'find' => '.sidebar .aylf',
                'func' => function($items) {
                    $a = $items->find('a');
                    $rs = '';
                    $rst = $items->find('.label',0);
                    if($rst) $rs = '<h1>'.$rst->plaintext.'</h1>';
                    foreach($a as $v) {
                        $rs .= $v->plaintext . ', ';
                    }
                    return htmlspecialchars_decode($rs);
                }
            ]
        ]

    ],
//    'www.webcrawler.com' => [ //giong infospace.com
//    ],

//    'bitmotion-tab.com' => [ //ko lay dc vi get qua signature
//        'result' => function($q) {
//            $sign = $this->getCurlHtml('http://bitmotion-tab.com/search/sign.php?q=code');
//            $url = "http://appapi.inspsearchapi.com/search/client?includeClientSettings=false&twocall=true&site=bitmotion&segment=bitmotion1&query=$q&category=web&page=1&adtest=off&isFirstView=false&ssm=false&skip-server-logging=true&qrpr=20&userid=8b47d81334cc4e9a8bf34ff6aafe4a6e&signature=$sign&actionid=646f942255214b26bf83aa422a20b9ec&abpwl=false&jsonp=insp._._1018680779";
//        }
//
//    ],

//    'search.monstercrawler.com' => [ //ko get duoc
//
//    ],

//    'www.searchencrypt.com' => [ //ko get dc, encode
//
//    ],

//    'search.handy-tab.com' => [//ko get dc, encode signature
//
//    ],

    'int.search.myway.com' => [
        'url' => 'https://int.search.myway.com/search/GGmain.jhtml?searchfor=[q]&tpr=hpsb&st=hp&qs=&trs=org&n=',
        'box' => ['parent' => '#algo-container', 'find' => 'li'],
        'get' => [
            'title' => '.algo-title',
            'url' => '.algo-display-url',
            'description' => '.algo-summary'
        ],
        'block' => [
                    'suggestion' => [
                        'find' => '.related-search rel-right .related-items',
                        'func' => function($items) {
                            $a = $items->find('a');
                            $rs = '';
                            $rst = $items->find('.related-title',0);
                            if($rst) $rs = '<h1>'.$rst->plaintext.'</h1>';
                            foreach($a as $v) {
                                $rs .= $v->plaintext . ', ';
                            }
                            return htmlspecialchars_decode($rs);
                        }
                    ]
                ]
    ],

//    'searchprivacy.co' => [ //ko get dc, encode url
//
//    ],

    'www.ask.com' => [
        'url' => 'https://www.ask.com/web?q=[q]&o=0&qo=homepageSearchBox',
        'box' => ['parent' => '.PartialSearchResults-container', 'find' => '.PartialSearchResults-item'],
        'get' => [
            'title' => '.PartialSearchResults-item-title-link',
            'url' => ['find' => '.PartialSearchResults-item-url','func'=>function($item) {return 'http://'.$item->plaintext;}],
            'description' => '.PartialSearchResults-item-abstract'
        ],
    ],

    'search.norton.com' => [ //giong int.search.myway.com
        'url' => 'https://nortonsafe.search.ask.com/web?q=[q]&o=APN11910&geo=vi&prt=&ctype=&ver=&chn=&tpr=121',
        'box' => ['parent' => '#algo-container', 'find' => 'li.algo-result'],
        'get' => [
            'title' => '.algo-title',
            'url' => '.algo-display-url',
            'description' => '.algo-summary'
        ]
    ],

//    'search.lilo.org' => [ //ko ghet dc
//        'url' => 'https://search.lilo.org/searchweb.php?q=[q]',
//        'box' => ['parent' => '.gsc-resultsbox-visible', 'find' => '.gsc-result'],
//        'get' => [
//            'title' => '.gs-title',
//            'url' => '.gs-visibleUrl',
//            'description' => '.gs-bidi-start-align'
//        ]
//
//    ],
//    'www.metacrawler.com' => [ //trung infosface
//        'url' => 'http://www.metacrawler.com/search/web?fcoid=417&fcop=topnav&fpid=27&om_nextpage=True&aid=f19cb8c1-c8b2-4f6c-b314-d3fd62a63fc5&ridx=1&q=[q]',
//        'box' => ['parent' => '.insp_result_main_0', 'find' => '.searchResult'],
//        'get' => [
//            'title' => '.resultTitle',
//            ''
//        ]
//
//    ],

    'www.netfind.com' => [
        'url' => 'https://www.netfind.com/search?s_it=sb-home&v_t=na&q=[q]',
        'ref' => 'https://www.netfind.com',
        'box' => ['parent' => 'ul[content="ALGO"]', 'find' => 'li'],
        'get' => [
            'title' => '.hac .find',
            'url' => '.durl span',
            'description' => 'p[property="f:desc"]'
        ],
        'block' => [
        'suggestion' => [
            'find' => '#r',
            'func' => function($items) {
                $a = $items->find('a');
                $rs = '';
                $rst = $items->find('h3.hac',0);
                if($rst) $rs = '<h1>'.$rst->plaintext.'</h1>';
                foreach($a as $v) {
                    $rs .= $v->plaintext . ', ';
                }
                return htmlspecialchars_decode($rs);
                }
            ]
        ]


    ],

//    'bjorgul.com' => [ //trang nay show list ko fai trang search
//
//
//    ],

    'www.dogpile.com' => [
        'url' => 'http://www.dogpile.com/search/web?q=[q]&ql=&topSearchSubmit.x=0&topSearchSubmit.y=0&topSearchSubmit=Go+Fetch!&fcoid=417&fcop=topnav&fpid=27&om_nextpage=True',
        'box' => ['parent' => '#resultsMain', 'find' => 'div[class="searchResult webResult"]'],
        'get' => [
            'title' => '.resultTitle',
            'url' => ['find' => '.resultDisplayUrl','func'=>function($item) {return 'http://'.$item->plaintext;}],
            'description' => '.resultDescription'
        ],
        'block' => [
            'suggestion' => [
                'find' => '#aylfResults',
                'func' => function($items) {
                    $a = $items->find('a');
                    $rs = '';
                    $rst = $items->find('h3',0);
                    if($rst) $rs = '<h1>'.$rst->plaintext.'</h1>';
                    foreach($a as $v) {
                        $rs .= $v->plaintext . ', ';
                    }
                    return htmlspecialchars_decode($rs);
                }
            ]
        ]

    ],

//    'www.health.zone' => [ //giong www.netfind.com
//
//    ],


];