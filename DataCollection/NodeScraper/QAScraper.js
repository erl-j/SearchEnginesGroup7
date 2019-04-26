var fetch = require('node-fetch');

const submissionUrl = (afterTime, beforeTime, size) => {
	return `https://api.pushshift.io/reddit/search/submission/?size=${size}&subreddit=explainlikeimfive&before=${beforeTime}&after=${afterTime}&num_comments>=5&sortType=score&sort=desc`;
};

const commentUrl = subId => {
	return `https://api.pushshift.io/reddit/comment/search?size=10&link_id=${subId}&sortType=score&sort=desc`;
};

var fs = require('fs');

const startTime = 1320969600;
const endTime = 1556039583;

let spanStart = startTime;
const secondsInAShift = 60 * 60 * 24;

const batchSize = 100;

var stream = fs.createWriteStream("QA6.json", {flags:'a'});


setInterval(
	() =>{
		if(spanStart>endTime){
			throw new Error();
		}
		spanStart += secondsInAShift;
		console.log(spanStart);
		fetch(submissionUrl(spanStart, spanStart + secondsInAShift, batchSize))
			.then(res => res.json())
			.then(body => {
				body.data.slice(0,10).forEach(post=>
				fetch(commentUrl(post.id))
				.then(res2=>res2.json())
				.then(body2=>{
					if(body2.data.length>0){
						var comment=body2.data.find(c=>c.parent_id.substring(0,2)=="t3");
						if(comment){
							var QA={"title":post.title, "question_detail":post.selftext,"answer":comment.body};
							stream.write(JSON.stringify(QA)+",\n",()=>console.log("success!"));

						}
						
					}
					
				}).catch(e=>"failed to get comment")
				)
				
				



				

			}).catch(e=>"failed to get posts")
		}
			,
	5000
);


