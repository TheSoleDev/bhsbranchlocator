
$( document ).on( "pagebeforeshow", "#promo-screen", function() {

    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    //var selectedMonthName = months[$("#datepicker").datepicker('getDate').getMonth()];

    var branch_id = localStorage.getItem("selected-branch-id");

    var arr_str = [];

    var data_promo = json_data.branch_promo;

    data_promo.sort(function(a,b){
                            var c = new Date(a.promo_date_from);
                            var d = new Date(b.promo_date_from);
                            return c-d;
                            });

    arr_str.push('<ul data-filter="true" data-role="listview" id="promo-list" data-input="#searchItem" data-inset="true">');
        
        arr_str.push('<li data-role="list-divider">October</li>');

        $.each(data_promo, function(key, value) {

            var arr_temp_str = [];

                var branch_info = getBranchDetailsById(value.branch_id);

                arr_temp_str.push('<li data-filtertext="'+branch_info.branch_name+'">');

                    arr_temp_str.push('<a href="#">');
                    
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

    arr_str.push('</ul>');

    $('#promo-container').append(arr_str.join('')).trigger('create');


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
