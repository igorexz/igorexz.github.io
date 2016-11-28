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
	var delayDate = new Date();
	var delayHandler = 0;
	var spaceDelayDate = new Date();
	var spaceDelayHandler = 0;
	var bh = new Vue({
		el: '#bh',
		data: {
			behaveData: "",
			keyDelayAvg: 0,
			spaceDelayAvg: 0,
			backspaceCount: 0,
			keyCount: 0,
			keyDelayArr: [],
			spaceDelayArr: []
		},
		methods: {
			pushBehaveData: function(){
				this.keyDelayAvg = math.mean(this.keyDelayArr);
				this.spaceDelayAvg = math.mean(this.spaceDelayArr);
				console.log(this.backspaceCount);
				console.log(this.keyDelayArr);
				console.log(this.keyDelayAvg);
				console.log(this.spaceDelayAvg);
				this.$http.post('http://lyceum.ort.md:8080/new', {
				"user": "58336ace29d23e4cea259a27",
				"timestamp" : 1479936155,
				"kd" : this.keyDelayAvg,
				"sd" : this.spaceDelayAvg,
				"bc" : this.backspaceCount
				}).then((response) => {console.log("success")}, (response) => {console.log("failed")});

			},
			keypressHandle: function(){
				delayHandler = new Date() - delayDate;
				delayDate = new Date();
				if(delayHandler < 800 && delayHandler > 50)
					this.keyDelayArr.push(delayHandler);
			},
			spaceHandle: function(){
				spaceDelayHandler = new Date() - spaceDelayDate;
				spaceDelayDate = new Date();
				if(spaceDelayHandler < 5000 && spaceDelayHandler > 50)
					this.spaceDelayArr.push(spaceDelayHandler);
			}
		}
	});
}