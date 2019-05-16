

# Running the QA search engine
To run the bot you need to have python 3, elasticsearch, the elasticsearch wrapper for python and npm installed.

### 1. Starting elastic search

 Start elasticsearch on port 9200 by running the ```elasticsearch``` command

### 2. Indexing

navigate to /src and run ```python3 indexer.py```

### 3. Starting the interface.

1. Navigate to the the ```Interface``` directory.
2. If it's the first time, run```npm install```
3. Run ```npm start```
4. The page should now open automatically, otherwise, navigate to http://localhost:3000/

If the elastic search is giving CORS trouble, add the following lines to elasticsearch.yml (in your elastic search dir):

```
http.cors.enabled : true
http.cors.allow-origin: "*"
http.cors.allow-methods: OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers: X-Requested-With,X-Auth-Token,Content-Type,Content-Length
http.cors.allow-credentials: true
```
