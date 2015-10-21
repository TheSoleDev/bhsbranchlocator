
$( document ).on( "pagebeforeshow", "#branch-screen", function() {
        
    var arr_str = [];   

    // arr_str.push('<ul>');
    //     arr_str.push('<li><a href="branch.html" data-ajax="false" data-icon="grid" class="ui-btn-active">Branch</a></li>');
    //     arr_str.push('<li><a href="map.html" data-ajax="false" data-icon="star">Map</a></li>');
    //     arr_str.push('<li><a href="#" data-icon="gear">Promos</a></li>');
    //     arr_str.push('<li><a href="#" data-icon="star">Reservation</a></li>');
    //     arr_str.push('<li><a href="#" data-icon="star">Fav</a></li>');
    // arr_str.push('</ul>');

    // $('#footer-nav-item').html(arr_str.join(''))).listview('refresh');




    $.each(tags, function(i, tag) {

        var filtertext = '';

            $.each(markers, function(i, marker) {

        
                if($.inArray( tag, marker['tags']) > -1){
                   filtertext = filtertext + ' ' + marker['title'];
                }

                
            });

            arr_str.push('<div data-role="collapsible" data-filtertext="'+tag + ' ' + filtertext + '">');
                arr_str.push('<h3>'+tag+'</h3>');
                arr_str.push('<ul data-role="listview" data-inset="false">');

                    $.each(markers, function(i, marker) {
                
                        if($.inArray( tag, marker['tags']) > -1){
                            arr_str.push('<li class="sub-item" data-filtertext="'+tag + ' ' + marker['title'] + '"><a href="#">'+marker['title']+'</a></li>');

                        }
                        
                    });

                arr_str.push('</ul>');
            arr_str.push('</div>');

    });

    $('#brachlist').append(arr_str.join('')).trigger('create');

});