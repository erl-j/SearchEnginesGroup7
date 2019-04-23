var fetch = require('node-fetch');

const submissionUrl = (afterTime, beforeTime, size) => {
	return `https://api.pushshift.io/reddit/search/submission/?size=${size}&subreddit=explainlikeimfive&before=${beforeTime}&after=${afterTime}&num_comments>=5&sortType=score&sort=desc`;
};

const commentUrl = subId => {
	return `https://api.pushshift.io/reddit/search/comment/?link_id=${subId}&nest_level=1&sortType=score&sort=desc`;
};

var fs = require('fs');

const startTime = 1389433600;
const endTime = 1556039583;

let spanStart = startTime;
const secondsInAWeek = 60 * 60 * 12;

const batchSize = 2;

var stream = fs.createWriteStream("QA.json", {flags:'a'});


setInterval(
	() =>{
		spanStart += secondsInAWeek;
		console.log(spanStart);
		fetch(submissionUrl(spanStart, spanStart + secondsInAWeek, batchSize))
			.then(res => res.json())
			.then(body => {
				body.data.forEach(post=>
				fetch(commentUrl(post.id))
				.then(res2=>res2.json())
				.then(body2=>{
					if(body2.data.length>0){
						var QA={"title":post.title, "question_detail":post.selftext,"answer":body2.data[0].body};
						stream.write(JSON.stringify(QA)+",\n",()=>console.log("success!"));
					}
					
				}).catch(e=>"failed to get comment")
				)
				
				



				

			}).catch(e=>"failed to get posts")
		}
			,
	1000
);

