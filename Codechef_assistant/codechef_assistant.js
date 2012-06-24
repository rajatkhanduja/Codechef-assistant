/* 
 * Part of the Codechef_assitant project. 
 * Author : Rajat Khanduja
 */

$(function() { 
  
  var img_url = chrome.extension.getURL("tick.png");

  // Check if the user is logged in
  var login_text = jQuery('div.login-user').text();

  if ( login_text == "")
  {
    // Not logged in.
    return(0);
  }

  var user_link = jQuery('div.login-user a').attr('href');    // This link contains the necessary information.
  
  // Get the list of solved problems in an array.
  var t = jQuery.ajax(
    {
      url : user_link,
      datatype : "html",
      success : function (data) {
        var i = 0 ; 
        links_array = new Array ();
        $(data).find('td a').each (function(){
      	  link = $(this).attr('href');
          if (link.indexOf('status') != -1)
          {
            links_array[i++] = "/problems/" + $(this).attr('href').split(',')[0].match(/[a-zA-Z0-9]+/g)[1];
          }
        });
        // Appending a tick mark.
        $('.problems tr a').each(function(){
      	  link = $(this).attr('href');
          if (links_array.indexOf(link) != -1)
          {
            $(this).after("<img class='tick-mark' src='"+ img_url +"' width='18' height='14' />");
            $('img.tick-mark').css('float','right');
          }
        });
      }
    });
})
