/*
Main behaviour data:
	- Keypress Delay Average (KDA)
	- Typos count (TC)
Server Info:
	- user, timestamp: required
	- kd, bc, sd, kpm: optional
	http://lyceum.ort.md:8080/get/58336ace29d23e4cea259a27
*/

window.onload = function(){
	var keyDurationHandler = 0;
	var userName = "58336ace29d23e4cea259a27";
	var bh = new Vue({
		el: '#bh',
		data: {
			keyHandler: []
		},
		methods: {
			pushBehaveData: function(){
				console.log(this.keyHandler);
				this.$http.post('http://lyceum.ort.md:8080/new', {
				"user": userName,
				"timestamp" : +new Date(),
				"data" : this.keyHandler
				}).then((response) => {console.log("POST done.")}, (response) => {console.log("POST FAILED.")});
			},
			keypressHandle: function(event){
				if(this.keyHandler.length < 90){
					this.keyHandler.push({
						keycode: event.keyCode, 
						timestamp: +new Date(),
						key_duration: new Date() - keyDurationHandler
					});
				}
			},
			setKeyDuration: function(){
				keyDurationHandler = new Date();
			}
		}
	});
}
