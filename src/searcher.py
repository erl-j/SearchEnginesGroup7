#!/usr/bin/env python
# -*- coding: utf-8 -*-

from elasticsearch import Elasticsearch 
from elasticsearch_dsl import Search

es=Elasticsearch([{'host':'localhost','port':9200}])


query = raw_input("What would you like to search for? ")

s = Search(using=es, index="eli") \
    .query("match", title=query) \

response = s.execute()

for hit in response:
    print hit.meta.score
    print hit.title.encode('utf-8')
    if hasattr(hit, 'question_detail'):
      print hit.question_detail.encode('utf-8')
    print hit.answer.encode('utf-8')
