var img_url = chrome.extension.getURL("tick.jpg");
// Check if the user is logged in
var login_text = jQuery('div.login-user.login-name').text();

if ( login_text == null)
{
  // Not logged in.
  exit(0);
}

var user_link = jQuery('div.login-user.login-name a').attr('href');    // This link contains the necessary information.
// Get the list of solved problems in an array.
var parser = new DOMParser();
var t = jQuery.ajax(
  {
    url : user_link,
    datatype : "html",
    success : function (data) {
      htmlDoc = parser.parseFromString(data,"text/xml");
      var i = 0 ; 
      links_array = new Array ();
      $(htmlDoc).find('td a').each (function(){
        if ($(this).attr('href').indexOf('status') != -1)
        {
          links_array[i++] = "/problems/" + $(this).attr('href').split(',')[0].match(/[a-zA-Z0-9]+/g)[1];
        }
      });
      // Appending a tick mark.
      $('.problemrow a').each(function(){
      	link = $(this).attr('href');
        if (links_array.indexOf(link) != -1)
        {
          //alert(link); 	 
          $(this).after("<img class='tick-mark' src='"+ img_url +"' width='18' height='14' />");
          $('img.tick-mark').css('float','right');
        }
      });
    }
  });
