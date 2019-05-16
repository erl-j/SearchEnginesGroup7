# Running the QA bot
To run the bot you need to have elasticsearch and npm installed

1. Start elasticsearch on port 9200 by running the ```elasticsearch``` command
2. Navigate to the the ```Interface``` directory.
3. If it's the first time, run```npm install```
4. Run ```npm start```
5. The page should now open automatically

If the elastic search is giving CORS trouble, add the following lines to elasticsearch.yml (in your elastic search dir):

```
http.cors.enabled : true
http.cors.allow-origin: "*"
http.cors.allow-methods: OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers: X-Requested-With,X-Auth-Token,Content-Type,Content-Length
http.cors.allow-credentials: true
```
