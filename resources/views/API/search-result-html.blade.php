@if(!empty($results['items']))
    @foreach($results['items'] as $items)
        <div class="items">
            <h4><a class="link" href="{{$items['url']}}">{{htmlspecialchars_decode($items['title'])}}</a></h4>
            <div class="holder-link">{{$items['url']}}</div>
            <div class="description">
                {{$items['description']}}
            </div>
        </div>
    @endforeach
@endif
@if(!empty($results['block']))
    @foreach($results['block'] as $name=>$items)
        <div class="items">
            {{htmlspecialchars_decode($items)}}
        </div>
    @endforeach
@endif