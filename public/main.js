$.getJSON( "login.json", function( data ) {
	var items = [];
	$.each( data.login, function(Titre, val ) {
		items.push(`<p>${val.user}</p>`);
		  		
	});
	$( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	}).appendTo( "ol" );
});

//Vidéo

$.getJSON( "login.json", function( data ) {
	var items = [];
	$.each( data.video, function(Titre, val ) {
		items.push(`<div id="allBox"><video id="videomini" loop autoplay controls muted><source src="uploads/${val.files}"></video><br><h3>${val.titre}</h3><p3>${val.text}<br>${val.date}</p3></div>`);
		  		
	});
	$( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	}).appendTo( "ol2" );
});