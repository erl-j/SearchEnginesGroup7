
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
import io
import json

  
  
es=Elasticsearch([{'host':'localhost','port':9200}])

# Make sure we start with a clean index
try:
  es.indices.delete(index='test')
except:
  print("no index found")

index_settings = {
  "settings" : {
    "index" : {
        "analysis" : {
            "analyzer" : {
                "synonym" : {
                    "tokenizer" : "standard",
                    "filter" : ["synonym", "english_stop", "english_stemmer"]
                }
            },
            "filter" : {
                "synonym" : {
                    "type": "synonym",
                        "format": "wordnet",
                        "synonyms_path": "analysis/wn_s.pl"
                },
        		"english_stop": {
          			"type":       "stop",
          			"stopwords":  "_english_" 
        		},
        		"english_stemmer": {
          			"type":       "stemmer",
          			"language":   "english"
        		}
            }
        }
    }
  },
  "mappings" : {
       "_default_": {
           "properties" : {
               "title" : {
                   "type" : "text",
                   "analyzer" : "synonym"
               },
               "question_detail" : {
                   "type" : "text",
                   "analyzer" : "synonym"
               },
               "answer" : {
                   "type" : "text",
                   "analyzer" : "synonym"
               }
           }
        }
    }
}

es.indices.create(index = 'test', body = index_settings)

file = io.open("../DataCollection/NodeScraper/QA.json")
data = json.load(file)
for obj in data['data']:
  es.index(index='test',doc_type='question',body=obj)