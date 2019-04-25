
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from elasticsearch import Elasticsearch 
from elasticsearch_dsl import Search
import io
import json

  
  
es=Elasticsearch([{'host':'localhost','port':9200}])

# Make sure we start with a clean index
es.indices.delete(index='eli')

file = io.open("DataCollection/NodeScraper/QA.json")
data = json.load(file)
for obj in data['data']:
  es.index(index='eli',doc_type='question',body=obj)