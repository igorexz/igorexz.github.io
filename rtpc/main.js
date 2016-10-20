/*
            ______              
       .d$$$******$$$$c.        
    .d$P"            "$$c      
   $$$$$.           .$$$*$.    
 .$$ 4$L*$$.     .$$Pd$  '$b   
 $F   *$. "$$e.e$$" 4$F   ^$b  
d$     $$   z$$$e   $$     '$. 
$P     `$L$$P` `"$$d$"      $$ 
$$     e$$F       4$$b.     $$ 
$b  .$$" $$      .$$ "4$b.  $$ 
$$e$P"    $b     d$`    "$$c$F 
'$P$$$$$$$$$$$$$$$$$$$$$$$$$$  
 "$c.      4$.  $$       .$$   
  ^$$.      $$ d$"      d$P    
    "$$c.   `$b$F    .d$P"     
      `4$$$c.$$$..e$$P"        
          `^^^^^^^`
       MADE BY IGOREXZ
*/
var random = new Random();

var userIDs = ["g59", "jahseh-onfroy", "ramirezdg", "geekeybeats", "j-chetta", "teamsesh", "christravis",
 "yung_goth", "rareakuma", "imrealugly", "yung-meep", "gera_pkhat", "tvethodman", "stereoryze", "slimgucci", "kuwagata_1", "white_punk",
 "i61", "surrenderdorothymusic", "blackkray", "blackksmurf", "xavierwulf", "pouya-kevin", "velial-squad", "night_lovell", "yung-lean-doer",
 "jeembx", "rickybobby-slumpgod", "lil_peep", "itsoktocry", "bladee1000", "aceofpentacles-1", "frozengangbeatz", "southgardendd", "clammyclams",
 "yungsherman", "ikonamsk", "nesatyi", "greafer", "k-i-z-a-r-u", "lunartalk", "the-virus-uk", "sirsyringe", "omenxiii"];

var playRandomTrack = function(){
	var widget = SC.Widget(document.getElementById("mywidget"));
	var userID = userIDs[random.integer(0, userIDs.length - 1)];
	var tracksRand = random.integer(0, 18);
	    widget.load("http://soundcloud.com/" + userID, {
	      show_artwork: true,
	      auto_play: true,
	      hide_related: true,
	      show_comments: false,
	      show_user: true,
	      show_reposts: false,
	      visual: false, 
	      buying: false,
	      liking: false,
	      sharing: false,
	      download: false,
	      show_playcounts: false,
	      start_track: tracksRand
	    });
		/*widget.bind(SC.Widget.Events.FINISH, function() {
		    playRandomTrack();
		});*/
}
$(document).ready(function() {
	$("#mywidget").attr("src", "https://w.soundcloud.com/player/?url=http://soundcloud.com/"+ userIDs[random.integer(0, userIDs.length)] +"&start_track=0" + 
	"&show_artwork=true&auto_play=true&hide_related=true&show_comments=false&download=false&show_user=true&show_reposts=false&buying=false&liking=false&sharing=false&show_playcounts=false&visual=false");
	/*
	var widget = SC.Widget(document.getElementById("mywidget"));
	widget.bind(SC.Widget.Events.FINISH, function() {
		playRandomTrack();
	});*/
	$("#skipButton").click(function(){
		playRandomTrack();
	});
});
