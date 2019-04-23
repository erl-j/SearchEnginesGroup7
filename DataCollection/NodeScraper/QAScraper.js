var express = require('express');
const https = require('https');
var app = express();

const Base =
	'https://api.pushshift.io/reddit/search/submission/?size=2&subreddit=explainlikeimfive&score>=10num_comments>=2';

const baseUrl = 'https://api.pushshift.io/reddit/comments/search?';

const submissionUrl = (afterTime, beforeTime, size) => {
	return `https://api.pushshift.io/reddit/search/submission/
    ?size=${size}&subreddit=explainlikeimfive&before${beforeTime}&after${afterTime}`;
};

const commentUrl = subId => {
	return `https://api.pushshift.io/reddit/search/comment/?link_id=${subId}`;
};

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

var fs = require('fs');

const startTime = 1429812522;
const endTime = 1556039583;

let spanStart = startTime;
const secondsInAWeek = 60 * 60 * 24 * 7;

function getAndLog(ss){
    https.get(submissionUrl(ss, ss + secondsInAWeek, 100), (res, err) => {
		if (err) {
			return 0;
		}
		res.setEncoding('utf8');
		
		let body = '';
		res.on('data', data => {
			body += data;
		});
		res.on('end', () => {
            try{
			body = JSON.parse(body);

			body.data.forEach(submission => {
				https.get(commentUrl(submission.id), (res2, err) => {
					if (err) {
						console.log(err);
						return 0;
					}
					res2.setEncoding('utf8');
					let body2 = '';

					res2.on('data', data2 => {
						body2 += data2;
					});

					res2.on('end', () => {
						body2 = JSON.parse(body2);

						let QA = {
							title: submission.title,
							question_details: submission.selftext,
							answer: body2.body,
						};
						console.log('writing submission');
						fs.writeFile('questions.json', QA, 'utf8');
					});
				});
            });
            
        }catch{

        }
        });
        
    });


}
while (spanStart < endTime) {

    debounce(()=>getAndLog(spanStart,0,true));
    console.log(spanStart);
    
	
		// next week
	
	spanStart += secondsInAWeek;
}
