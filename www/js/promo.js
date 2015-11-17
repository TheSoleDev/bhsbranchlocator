
$( document ).on( "pagebeforeshow", "#promo-screen", function() {

    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var current_date= new Date();

    //console.log(monthNames[current_date.getMonth()]);
    //var selectedMonthName = months[$("#datepicker").datepicker('getDate').getMonth()];

    var branch_id = localStorage.getItem("selected-branch-id");

    var arr_str = [];

    var data_promo = json_data_promo;

    // data_promo.sort(function(a,b){
    //                         var c = new Date(a.promo_date_from);
    //                         var d = new Date(b.promo_date_from);
    //                         return c-d;
    //                         });

//     var arr_promo = {};
//     $.each(data_promo, function(key, value) {
//         arr_promo[value.promo_month].push(value.promo_title);
//     });
// console.log(arr_promo);

    arr_str.push('<ul data-filter="true" data-role="listview" id="promo-list" data-input="#searchItem" data-inset="true">');

        $.each(data_promo, function(parent_key, parent_value) {

            arr_str.push('<li data-role="list-divider">'+parent_key+'</li>');

            $.each(parent_value, function(key, value) {

                var arr_temp_str = [];
                // var promoStartDate = value.promo_date_from;
                // var arrPromoStartDate = promoStartDate.split('-');
                // var promoEndDate = value.promo_date_to;
                // var arrPromoEndDate = promoEndDate.split('-');
                // console.log(monthNames[arrPromoStartDate[1]-1]);

                    var branch_info = getBranchDetailsById(value.branch_id);

                    arr_temp_str.push('<li data-filtertext="'+branch_info.branch_name+'">');

                        arr_temp_str.push('<a href="#" class="view-promo-details" data-id="'+value.id+'" data-month="'+parent_key+'">');
                        
                        if(value.promo_photo_file != '')
                        {
                            arr_temp_str.push('<img src="'+value.promo_photo_file+'">');
                        }

                        arr_temp_str.push('<h2>'+value.promo_title+'</h2>');
                        arr_temp_str.push('<p>'+value.promo_content+'<br/>');
                        arr_temp_str.push('<strong>Branch name:</strong> '+branch_info.branch_name+'<br/>');
                        arr_temp_str.push('<strong>Promo date:</strong> '+value.promo_date_from+' to '+value.promo_date_to+'</p></a>');            

                    arr_temp_str.push('</li>');
                
                if(branch_id != null)
                {
                    if(branch_id == value.branch_id)
                    {
                          arr_str.push(arr_temp_str.join('') );       
                    }
                }
                else
                {
                    arr_str.push(arr_temp_str.join('') );       
                }
            });


        });

    arr_str.push('</ul>');

    $('#promo-container').append(arr_str.join('')).trigger('create');


});


$( document ).on( "pagebeforeshow", "#promo-info", function() {
  
    var promo_id = localStorage.getItem("selected-promo-id");
    var promo_month = localStorage.getItem("selected-month");    

    // if(promo_id == '' )
    // {
    //     window.location = "#branch-screen";
    // }

    var promo_details = getPromoDetailsById(promo_id,promo_month);
    var branch_details = getBranchDetailsById(promo_details.branch_id);


    $('#promo-photo').html('<img src="'+promo_details.promo_photo_file+'" />');

    var promo_arr_str = [];

        promo_arr_str.push('<li>');

            promo_arr_str.push('<h2>'+promo_details.promo_title+'</h2>');
            promo_arr_str.push('<p>'+promo_details.promo_content+'<br/>');
            promo_arr_str.push('<strong>Promo date:</strong> '+promo_details.promo_date_from+' <strong>to</strong> '+promo_details.promo_date_to+'</p>');            

        promo_arr_str.push('</li>');


    $('#promo-details').html(promo_arr_str.join(''));


    if(localStorage.getItem("selected-branch") != '')
    {
        localStorage.removeItem('selected-branch');
        localStorage.removeItem('selected-branch-position');
        localStorage.removeItem('reference-page');
    }

    localStorage.setItem("selected-branch-id", branch_details.id);
    localStorage.setItem("selected-branch", branch_details.branch_name);
    localStorage.setItem("selected-branch-position", branch_details.lat + ',' + branch_details.long);
    localStorage.setItem("reference-page", 'promo.html');   

    var arr_str = [];

    if(branch_details.branch_name != null)     arr_str.push('<li class="main"><label>'+branch_details.branch_name+'</label></li>');
    if(branch_details.address != null)         arr_str.push('<li><label>Address:</label> <div class="info">'+branch_details.address+'</div></li>');
    if(branch_details.tel_no_1 != null)        arr_str.push('<li><label>Telephone No.:</label> <div class="info">'+branch_details.tel_no_1+'</div></li>');
    if(branch_details.mobile_no_1 != null)     arr_str.push('<li><label>Mobile No.:</label> <div class="info">'+branch_details.mobile_no_1+'</div></li>');
    if(branch_details.email_add != null)       arr_str.push('<li><label>Email:</label> <div class="info">'+branch_details.email_add+'</div></li>');
    if(branch_details.fb_url != null)          arr_str.push('<li><label>Facebook:</label> <div class="info">'+branch_details.fb_url+'</div></li>');

    $('#branch-details').html(arr_str.join(''));

});


$('#promo-screen').on('click','.showAllPromo',function(e) { 
    localStorage.removeItem('selected-branch');
    localStorage.removeItem('selected-branch-id');    
    
    window.location = "promo.html";
});

$('#promo-screen').on('click','.btn-back',function(e) { 

    var backLink = 'index.html';
    if(localStorage.getItem("reference-page") != null)
    {    
        backLink = localStorage.getItem("reference-page");
        localStorage.removeItem('reference-page');
    }
    window.location = backLink;
});

$('#promo-info').on('click','.btn-back',function(e) { 

    var backLink = 'index.html';
    if(localStorage.getItem("reference-page") != null)
    {    
        backLink = localStorage.getItem("reference-page");
        localStorage.removeItem('reference-page');
    }
    window.location = backLink;
});

$('#promo-info').on('click','.showmap',function(e) { 

    localStorage.setItem("reference-page", 'promo.html');  
    localStorage.setItem("reference-page", 'promo.html#promo-info');  
    window.location = "map.html";

});

$('#promo-screen').on('click','.view-promo-details',function(e) { 
    if(localStorage.getItem("selected-promo-id") != '')
    {
        localStorage.removeItem('selected-promo-id');
        localStorage.removeItem('selected-month');
        localStorage.removeItem('reference-page');
    }

    localStorage.setItem("selected-promo-id", $(this).data('id'));
    localStorage.setItem("selected-month", $(this).data('month'));
    localStorage.setItem("reference-page", '#promo-screen');   

    window.location = "#promo-info";

});
