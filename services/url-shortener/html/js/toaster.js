$(window).on({
	load: function(){
	
	}
});

function makeToast( message ) {
	
	$("body")
		.prepend("<p id='toast-message'><span></span></p>")
		.find("#toast-message")
		.css({
			position: "fixed",
			bottom: "50px",
			width: "100%",
			zIndex: "9999",
			opacity: 0
		})
		.find("span")
		.css({
			background: "rgba(0,0,0,0.7)",
			color: "white",
			display: "block",
			margin: "0 auto",
			width: "75%",
			textAlign: "center",
			"border-radius": "256px",
			padding: "10px"
		})
		.text( message )
	
	$("#toast-message").animate({
			opacity: 1
		}, 500, "easeInOutExpo", function(){
			var toast = $(this);
			setTimeout( function(){ removeToast( toast ); }, 2000 );
		});
		
}

function removeToast( toast ){
	
	toast
		.animate({
			opacity: 0
		},500, "easeInOutExpo",function(){
			toast.remove();
		})
	
}