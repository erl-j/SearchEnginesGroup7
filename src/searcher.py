#!/usr/bin/env python
# -*- coding: utf-8 -*-

from elasticsearch import Elasticsearch 
from elasticsearch_dsl import Search

es=Elasticsearch([{'host':'localhost','port':9200}])


query = raw_input("What would you like to search for? ")
antiquery = raw_input("What would you like to exclude? ")

s = Search(using=es, index="eli") \
    .query("match", answer=query) \
    .exclude("match", answer=antiquery)

response = s.execute()

for hit in response:
    print hit.meta.score
    print hit.question.encode('utf-8')
    print hit.answer.encode('utf-8')