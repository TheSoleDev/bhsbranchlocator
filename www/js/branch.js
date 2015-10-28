
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




    $.each(province, function(i, tag) {

        var filtertext = '';

        $.each(branch, function(key, value) {
    
            if($.inArray( tag, value.province) > -1){
               filtertext = filtertext + ' ' + value.branch_name;
            }

        });

        arr_str.push('<div data-role="collapsible" class="tag-item" data-filtertext="'+tag + ' ' + filtertext + '">');
            arr_str.push('<h3>'+tag+'</h3>');
            arr_str.push('<ul data-role="listview" data-inset="false">');

                $.each(branch, function(key, value) {

                    if( tag == value.province){
                        if(value.lat != null && value.long != null)
                        {
                            arr_str.push('<li class="sub-item" data-filtertext="'+tag + ' ' + value.branch_name + '"><a href="#" class="showmap" data-position="'+value.lat + ',' + value.long+'" data-branch="'+value.branch_name+'" data-id="'+value.id+'">'+value.branch_name+'</a></li>');
                        }
                    }
                    
                });

            arr_str.push('</ul>');
        arr_str.push('</div>');

    });

    $('#brachlist').append(arr_str.join('')).trigger('create');

});


$( document ).on( "pagebeforeshow", "#branch-info", function() {
  
    var branch_id = localStorage.getItem("selected-branch-id");

    if(branch_id == '' )
    {
        window.location = "#branch-screen";
    }

    var details = getBranchDetailsById(branch_id);

    var arr_str = [];

    if(details.branch_name != null)     arr_str.push('<li class="main"><label>'+details.branch_name+'</label></li>');
    if(details.address != null)         arr_str.push('<li><label>Address:</label> <div class="info">'+details.address+'</div></li>');
    if(details.tel_no_1 != null)        arr_str.push('<li><label>Telephone No.:</label> <div class="info">'+details.tel_no_1+'</div></li>');
    if(details.mobile_no_1 != null)     arr_str.push('<li><label>Mobile No.:</label> <div class="info">'+details.mobile_no_1+'</div></li>');
    if(details.email_add != null)       arr_str.push('<li><label>Email:</label> <div class="info">'+details.email_add+'</div></li>');
    if(details.fb_url != null)          arr_str.push('<li><label>Facebook:</label> <div class="info">'+details.fb_url+'</div></li>');

    $('#branch-details').html(arr_str.join(''));

    var arr_str_photo = [];

    var data_photo = json_data.branch_photo;

    $.each(data_photo, function(key, value) {

        if( value.branch_id == branch_id){
            arr_str_photo.push('<a href="#popupPhotoLarge" class="showPopupPhoto" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="'+value.photo_file+'" alt="Paris, France" style="width:30%"></a>');
        }
    });

    $('#branch-photo-list').html(arr_str_photo.join(''));

});


$('#branch-info').on('click','.showPopupPhoto',function(e) { 

    $("#img-large-photo").attr('src',$(this).find('img').attr('src'));

});




$('#branch-screen').on('click','.showmap',function(e) { 

    if(localStorage.getItem("selected-branch") != '')
    {
        localStorage.removeItem('selected-branch');
        localStorage.removeItem('selected-branch-position');
        localStorage.removeItem('reference-page');
    }

    localStorage.setItem("selected-branch-id", $(this).data('id'));
    localStorage.setItem("selected-branch", $(this).data('branch'));
    localStorage.setItem("selected-branch-position", $(this).data('position'));
    localStorage.setItem("reference-page", 'branch.html');   
    console.log('cccccccc' + localStorage.getItem("selected-branch"));
    window.location = "#branch-info";

});

// $('#branch-screen').on('click','.showmap',function(e) { 

//     if(localStorage.getItem("selected-branch") != '')
//     {
//         localStorage.removeItem('selected-branch');
//         localStorage.removeItem('selected-branch-position');
//         localStorage.removeItem('reference-page');
//     }

//     localStorage.setItem("selected-branch", $(this).data('branch'));
//     localStorage.setItem("selected-branch-position", $(this).data('position'));
//     localStorage.setItem("reference-page", 'branch.html');    
//     window.location = "map.html";
// });
