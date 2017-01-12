
var vid, playbtn,curtimetext,durtimetext,mutebtn,volumeslider,fullscreenbtn,vid2;
function initializePlayer(){
	//Set object references
	//video element one
	vid = document.getElementById("my_video");
	playbtn = document.getElementById("playpausebtn");
	//seekslider = document.getElementById("seekslider");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
	mutebtn = document.getElementById("mutebtn");
	volumeslider = document.getElementById("volumeslider");
	fullscreenbtn = document.getElementById("fullscreenbtn");

	var progress = document.getElementById('progress');
	var progressBar = document.getElementById('progress-bar');

	//video element two
	vid2 = document.getElementById("my_video2");	
	
	//Add Event listeners	
	playbtn.addEventListener("click", function(e){
		if(vid.paused){
			vid.play();
			playbtn.innerHTML = "Pause";
			vid2.play();
		}
		else{
			vid.pause();	
			playbtn.innerHTML = "Play";
			vid2.pause();			
		}
	});
	
	/*seekslider.addEventListener("change", function(e){
		var seekto = vid.duration * (seekslider.value / 100);
		vid.currentTime = seekto;
		vid2.currentTime = seekto;
	});*/
	
	vid.addEventListener("timeupdate", function(e){
		if(vid.duration > vid2.duration){
			var nt = vid.currentTime * (100/ vid.duration);
			//seekslider.value = nt;
			var curmins = Math.floor(vid.currentTime / 60);
			var cursecs = Math.floor(vid.currentTime - curmins * 60);
			var durmins = Math.floor(vid.duration / 60);
			var dursecs = Math.floor(vid.duration - durmins * 60);
			if(cursecs < 10){
				cursecs = "0"+cursecs;
			}
			if(dursecs < 10){
				dursecs = "0"+dursecs;
			}
			if(curmins < 10){
				curmins = "0"+curmins;
			}
			if(durmins < 10){
				durmins = "0"+durmins;
			}
			curtimetext.innerHTML = curmins+":"+cursecs;
			durtimetext.innerHTML = durmins+":"+dursecs;

			if (!progress.getAttribute('max')) progress.setAttribute('max', vid.duration);
			progress.value = vid.currentTime;
   			progressBar.style.width = Math.floor((vid.currentTime / vid.duration) * 100) + '%';
		}
		else{
			var nt2 = vid2.currentTime * (100/ vid2.duration);
			//seekslider.value = nt2;
			var curmins2 = Math.floor(vid2.currentTime / 60);
			var cursecs2 = Math.floor(vid2.currentTime - curmins2 * 60);
			var durmins2 = Math.floor(vid2.duration / 60);
			var dursecs2 = Math.floor(vid2.duration - durmins2 * 60);
			if(cursecs2 < 10){
				cursecs2 = "0"+cursecs2;
			}
			if(dursecs2 < 10){
				dursecs2 = "0"+dursecs2;
			}
			if(curmins2 < 10){
				curmins2 = "0"+curmins2;
			}
			if(durmins2 < 10){
				durmins2 = "0"+durmins2;
			}
			curtimetext.innerHTML = curmins2+":"+cursecs2;
			durtimetext.innerHTML = durmins2+":"+dursecs2;

			if (!progress.getAttribute('max')) progress.setAttribute('max', vid2.duration);
			progress.value = vid2.currentTime;
   			progressBar.style.width = Math.floor((vid2.currentTime / vid2.duration) * 100) + '%';
		}
	});
	
	mutebtn.addEventListener("click", function(e){
		if(vid.muted){
			vid.muted = false;
			mutebtn.innerHTML = "Mute";
			volumeslider.value = 100;
		}
		else{
			vid.muted = true;
			mutebtn.innerHTML = "unMute";
			volumeslider.value = 0;
		}
	});
	
	volumeslider.addEventListener("change", function(e){
		vid.volume = volumeslider.value / 100;
	});
	
	fullscreenbtn.addEventListener("click", function(e){
		if (vid.requestFullscreen) {
			vid.requestFullscreen();
		} else if (vid.mozRequestFullScreen) {
			vid.mozRequestFullScreen(); // Firefox
		} else if (vid.webkitRequestFullscreen) {
			vid.webkitRequestFullscreen(); // Chrome and Safari
		}
	});

	
	vid.addEventListener("loadedmetadata", function(e){
		if(vid.duration > vid2.duration){
			progress.setAttribute('max', vid.duration);
		}
		else{
			progress.setAttribute('max', vid2.duration);
		}
	});
	
	progress.addEventListener('click', function(e) {
        var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
        vid2.currentTime = pos * vid2.duration;
        vid.currentTime = pos * vid.duration;
      });

	vid2.muted = true;	
}
window.onload = initializePlayer();
