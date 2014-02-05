/**
 * Javascript for assignsubmission_youtube
 * Development funded by: Global Awakening (@link http://www.globalawakening.com)
 *
 * @copyright &copy; 2012 Justin Hunt
 * @author Justin Hunt
 * @license http://www.gnu.org/copyleft/gpl.html GNU Public License
 * @package assignsubmission_youtube
 */

M.assignsubmission_youtube = {}



// Replace designated div with a YUI tab set
M.assignsubmission_youtube.loadyuitabs = function(Y,opts) {
	Y.use('tabview', function(Y) {
		var tabview = new Y.TabView({
			srcNode: '#' + opts['tabviewid']
		});

		tabview.render();
	});
}

// Replace youtube designated divs with youtube players
M.assignsubmission_youtube.loadytplayer = function(Y,opts) {

    //  function onYouTubeIframeAPIReady() {
	directLoadYTPlayer(opts['playerid'],
		opts['width'],
        opts['height'],      
        opts['videoid']);   
	  //}
}

M.assignsubmission_youtube.loadytrecorder = function(Y,opts) {

	directLoadYTRecorder(opts['recorderid'],
		opts['width']);   

}

//Insert video link back into htmlarea
function assignsubmission_youtube_insertYoutubeLink(vid) {
	//we may or may not be in an iframe so we try both levels
	var usedoc = document.getElementById('id_assignsubmission_youtube_youtubeid');
	if(!usedoc){
		usedoc = parent.document.getElementById('id_assignsubmission_youtube_youtubeid');
	}
	usedoc.value=vid;
}

function assignsubmission_youtube_directLoadYTRecorder(recorderid,videoname,width) {
	videotitle = videoname;
	widget = new YT.UploadWidget(recorderid, {
	  width: width,
	  webcamOnly: true,
	  events: {
	'onUploadSuccess': onUploadSuccess,
	'onProcessingComplete': onProcessingComplete,
	'onApiReady': onApiReady
	}
});

}

/************************************ we may not need this section *********/

// Replace designated div with a YUI tab set
M.assignsubmission_youtube.init = function(Y,opts) {
    console.log('running init');
    //mytube_repo_tabsetid=opts['tabviewid'];
    M.assignsubmission_youtube.browselist_html=opts['browselist_html'];
    M.assignsubmission_youtube.uploader_html=opts['uploader_html'];

	
}
		
// Show upload form and browse list
//this will be called after user has auth'ed with google in popup
function assignsubmission_youtube_initTabsAfterLogin() {
	assignsubmission_youtube_displayBrowseList();
	assignsubmission_youtube_displayUploadForm();
}

//show the upload form in upload tab
//only called from initTabsAfterLogin
function assignsubmission_youtube_displayUploadForm() {
	var uploadtab	= document.getElementById('tabupload');
	if(uploadtab){
		uploadtab.innerHTML = M.assignsubmission_youtube.uploader_html;
	}
}

//show the list of videos in browse list tab
//called from initTabsAfterLogin and onclick event of "browse list display" button
function assignsubmission_youtube_displayBrowseList() {
	var browsetab = document.getElementById('tablist');
	if(browsetab){
		browsetab.innerHTML = M.assignsubmission_youtube.browselist_html;
	}
}
/************************************ *********/
		
	 
	    function directLoadYTPlayer(playerid,width,height,videoid){
			new YT.Player(playerid, {
			width: width,
			height: height,      
			videoId: videoid,
			events: {
            'onReady': onYTPlayerReady,
            'onStateChange': onYTPlayerStateChange		
          }
        });
		
		}

	   function onYTPlayerReady(event) {
			//do something, eg event.target.playVideo();
	  }
	    function onYTPlayerStateChange(event) {
			//do something, eg event.target.playVideo();
	  }
	  
	     function onUploadSuccess(event) {
			document.getElementById('id_assignsubmission_youtube_youtubeid').value=event.data.videoId;
	  }
	    function onProcessingComplete(event) {
			//document.getElementById('id_assignsubmission_youtube_youtubeid').value=event.data.videoId;
	  }
	  
	   function onApiReady(event) {
			//var widget = event.target; //this might work, if global "widget" doesn't
			widget.setVideoTitle(videotitle);
			widget.setVideoDescription(videotitle);
			widget.setVideoPrivacy('unlisted'); 
	  }

  

	 
 
