
$( document ).on( "pagebeforeshow", "#map-screen", function() {
   
   var selectedBranch = '';
   var selectedBranchPosition = '14.677067,121.031793';
    if(localStorage.getItem("selected-branch") != null)
    {
        selectedBranch = localStorage.getItem("selected-branch");
        selectedBranchPosition = localStorage.getItem("selected-branch-position");
    }


    jgmap.add(function() {           
        $('#map_canvas').gmap({'center': selectedBranchPosition, 'zoom': 12, 'disableDefaultUI':true, }).bind('init', function(evt, map) { 

            // $('#map_canvas').gmap('addControl', 'radios', google.maps.ControlPosition.TOP_LEFT);


            // $.each(tags, function(i, tag) {
            //     $('#radios').append(('<label style="margin-right:5px;display:block;"><input type="checkbox" style="margin-right:3px" value="{0}"/>{1}</label>').format(tag, tag));
            // });

            
            // // [+] THIS IS FOR THE NEARBY FEATURES
            // currentLoc = new google.maps.LatLng(14.6760413,121.04370029999995)
            // $('#map_canvas').gmap('addMarker', { 'position':currentLoc} );
            // $('#map_canvas').gmap({'center': 14.6760413+ ", " + 121.04370029999995, 'zoom': 12, 'disableDefaultUI':true, });
            // $('#map_canvas').gmap('get','map').panTo(currentLoc);

            // var arr_nearestBranch = getNearestBranch(121.04370029999995, 14.6760413, 100);

            // var arrNearestStr = [];
            // $.each(arr_nearestBranch, function(a, b) {

            //         arrNearestStr.push(b.location);
             
            // }); 

            // $.each(markers, function(i, marker) {

            //     if( $.inArray(marker['title'], arrNearestStr) > -1)
            //     {
            //         $('#map_canvas').gmap('addMarker', marker).click(function() {
            //             $('#map_canvas').gmap('openInfoWindow', {'content': this.title}, this);
            //         });
            //     }

            // });    
            // // [-] THIS IS FOR THE NEARBY FEATURES
            
            var arr_option = [];
            var arr_details_str = [];
            var branch_address = '';
            $.each(branch, function(key, value) {

                arr_details_str = [];
                arr_details_str.push('<strong>'+value.branch_name + '</strong><br />' + value.address);

                if(value.tel_no_1 != null)        arr_details_str.push('<strong>Telephone No.:</strong>'+value.tel_no_1);
                if(value.mobile_no_1 != null)     arr_details_str.push('<strong>Mobile No.:</strong>'+value.mobile_no_1);
                if(value.email_add != null)       arr_details_str.push('<strong>Email:</strong>'+value.email_add);
                if(value.fb_url != null)          arr_details_str.push('<strong>Facebook:</strong>'+value.fb_url);

                branch_address = arr_details_str.join('<br />');
                arr_option = {'icon': img_marker, 'tags':Array(value.province), 'bound':true, 'position': value.lat + ',' + value.long, 'title': branch_address};

                if(selectedBranch != '')
                {

                    if(value.branch_name == selectedBranch)
                    {
                        $('#map_canvas').gmap('addMarker', arr_option).click(function() {
                            $('#map_canvas').gmap('openInfoWindow', {'content': this.title}, this);
                        }); 
                    }
                }
                else
                {
                    $('#map_canvas').gmap('addMarker', arr_option).click(function() {
                        $('#map_canvas').gmap('openInfoWindow', {'content': this.title}, this);
                    }); 
                }

            });


        });
    }).load();



    // var currentLoc = '';
    // // Check for geolocation support
    // if (navigator.geolocation) {
    //     // Use method getCurrentPosition to get coordinates
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         // Access them accordingly
            
    //         currentLoc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
    //         $('#map_canvas').gmap('addMarker', { 'position':currentLoc} );
    //         $('#map_canvas').gmap({'center': position.coords.latitude + ", " + position.coords.longitude, 'zoom': 12, 'disableDefaultUI':true, });
    //         $('#map_canvas').gmap('get','map').panTo(currentLoc);

    //     });
    // }

    // // THIS IS FOR THE LOC SEARCH
    //     $('#map_canvas').gmap('search', { 'address': 'quezon city, philippines' }, function(results,isFound) {
    //         if (isFound) {
    //             console.log(results[0].geometry.location.lat() + ' ' + results[0].geometry.location.lng());
    //             // $('#map_canvas').gmap('get','map').panTo(results[0].geometry.location);
    //             //14.6760413 121.04370029999995
    //             $('#map_canvas').gmap('addMarker', { 'position':results[0].geometry.location} );

    //         }
    //     });

    // var arr_nearestBranch = getNearestBranch(121.04370029999995, 14.6760413, 5);

    // $.each(arr_nearestBranch, function(a, b) {
    //     //$('#groups').append('<li>' + b.location + ': ' + b.distance + 'm</li>');

    //         console.log('<li>' + b.location + ': ' + b.distance + 'm</li>');
     
    // }); 

});

$('#map-screen').on('click','input:checkbox',function(e) { 

                $('#map_canvas').gmap('closeInfoWindow');
                $('#map_canvas').gmap('set', 'bounds', null);
                var filters = [];
                $('input:checkbox:checked').each(function(i, checkbox) {
                    filters.push($(checkbox).val());
                });
                if ( filters.length > 0 ) {
                    $('#map_canvas').gmap('find', 'markers', { 'property': 'tags', 'value': filters, 'operator': 'OR' }, function(marker, found) {
                        if (found) {
                            $('#map_canvas').gmap('addBounds', marker.position);
                        }
                        marker.setVisible(found); 
                    });
                } else {
                    $.each($('#map_canvas').gmap('get', 'markers'), function(i, marker) {
                        $('#map_canvas').gmap('addBounds', marker.position);
                        marker.setVisible(true); 
                    });
                }

});


String.prototype.format = function() { a = this; for ( k in arguments ) { a = a.replace("{" + k + "}", arguments[k]); } return a; };
window.jgmap = { 
    'version': '3.0-rc1',
    'ga': '',
    'primaryUrl': 'http://code.google.com/p/jquery-ui-map/',
    'url': 'http://jquery-ui-map.googlecode.com/', 
    'forum': 'http://groups.google.com/group/jquery-ui-map-discuss/feed/rss_v2_0_msgs.xml', 
    'subscribe': 'http://groups.google.com/group/jquery-ui-map-discuss/boxsubscribe', 
    'exception': 'Unable to load due to either poor internet connection or some CDN\'s aren\'t as responsive as we would like them to be. Try refreshing the page :D.', 
    'init': function() {
        //window._gaq = [['_setAccount', this.ga], ['_trackPageview'], ['_trackPageLoadTime']];
        //Modernizr.load({ 'test': ( location.href.indexOf(this.url) > -1 ), 'yep': 'http://www.google-analytics.com/ga.js' });
        this.test('Backbone', function() {
            $('#forum').append('<h2>Forum</h2><ul id="forum_posts"></ul><h2>Subscribe</h2><form id="forum_subscribe" class="subscribe" action="#"><label for="email">E-mail:</label><input id="email" type="text" name="email" /><input type="submit" name="sub" value="Subscribe" /></form>');
            ForumCollection = Backbone.Collection.extend({ 'url': 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q={0}'.format(encodeURIComponent(jgmap.forum)), 'parse': function(response) { return response.responseData.feed.entries; } });
            ForumPost = Backbone.View.extend({ 'tagName': 'li', 'className': 'group-item', 'template': _.template('<a href="<%=link%>"><%=title%></a></h3>'), 'render': function() { $(this.el).html(this.template(this.model.toJSON())); return this; } }); 
            Forum = Backbone.View.extend({ 'el': $("#forum"), 'initialize': function() { this.col = new ForumCollection(); this.col.bind('reset', this.load, this); this.col.fetch(); }, 'add': function(post) { var view = new ForumPost({'model': post}); $('#forum_posts').append(view.render().el); }, 'load': function () { this.col.each(this.add); $('#forum_subscribe').attr('action', jgmap.subscribe); $(this.el).show(); } });
            var app = new Forum();
        });
        this.test('prettyPrint', function() { prettyPrint(); });
        $('#version').text(this.version);
    },
    'redirect': function(url) { alert('This page is deprecated. Please update your URL. Redirecting to new page.'); window.location = url; },
    'col': [], 
    'tests': [],
    'test': function(a, b) { if ( window[a] ) { b(); } },
    'add': function(a, b) { if (b) { this.col[a] = b; } else { this.col.push(a); } return this; },
    'load': function(a) { var self = this; if (a) { self.col[a](); } else { $.each(self.col, function(i,d) { try { d(); } catch (err) { alert(self.exception); } }); } },
    'timeStart': function(key, desc) { this.tests[key] = { 'start': new Date().getTime(), 'desc': desc }; },
    'timeEnd': function(key) { this.tests[key].elapsed = new Date().getTime(); },
    'report': function(id) { var i = 1; for ( var k in this.tests ) { var t = this.tests[k]; $(id).append('<div class="benchmark rounded"><div class="benchmark-result lt">' + (t.elapsed - t.start) + ' ms</div><div class="lt"><p class="benchmark-iteration">Benchmark case ' + i + '</p><p class="benchmark-title">' + t.desc + '</p></div></div>'); i++; }; }
};
    
jgmap.init();




function convertToMeter(currentLongitude, currentLatitude, long1, lat1) {
    erdRadius = 6371;

    currentLongitude = currentLongitude * (Math.PI / 180);
    currentLatitude = currentLatitude * (Math.PI / 180);
    long1 = long1 * (Math.PI / 180);
    lat1 = lat1 * (Math.PI / 180);

    x0 = currentLongitude * erdRadius * Math.cos(currentLatitude);
    y0 = currentLatitude * erdRadius;

    x1 = long1 * erdRadius * Math.cos(lat1);
    y1 = lat1 * erdRadius;

    dx = x0 - x1;
    dy = y0 - y1;

    d = Math.sqrt((dx * dx) + (dy * dy));


    return Math.round(d * 1000);
};


function getNearestBranch(currentLongitude, currentLatitude, targetRadius)
{
     var distanceObj = [],
        i = 0
        convertedVal = '';

    $.each(markers, function (a, marker) {
        var str = marker['position'];
        var res = str.split(",");

        convertedVal = convertToMeter(currentLongitude, currentLatitude,res[1], res[0]);

        if((convertedVal / 1000) <= targetRadius)
        {
            distanceObj[i] = { distance: convertedVal, location: marker['title'] };
            ++i;
        }
        
        
    });

    distanceObj.sort(function(a,b) {
        return parseInt(a.distance) - parseInt(b.distance)
    });

  

    return distanceObj;
}
