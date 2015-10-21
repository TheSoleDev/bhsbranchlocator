
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


            $.each(markers, function(i, marker) {
                if(selectedBranch != '')
                {

                    if(marker['title'] == selectedBranch)
                    {
                        $('#map_canvas').gmap('addMarker', marker).click(function() {
                            $('#map_canvas').gmap('openInfoWindow', {'content': this.title}, this);
                        });
                    }
                }
                else
                {
                    $('#map_canvas').gmap('addMarker', marker).click(function() {
                        $('#map_canvas').gmap('openInfoWindow', {'content': this.title}, this);
                    }); 
                }

            });


        });
    }).load();


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
