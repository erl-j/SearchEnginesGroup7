
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from elasticsearch import Elasticsearch 
from elasticsearch_dsl import Search
import io

questions = {}
answers = {}

def getQuestionsFromFile():
  file = io.open("DataCollection/questions.txt", "r", encoding="utf-8") 
  
  for l in file.readlines():
    numAndString = l.split(' ', 1)
    num = int(numAndString[0])
    string = numAndString[1]
    questions[num] = string
  
def getAnswersFromFile():
  file = io.open("DataCollection/answers.txt", "r")
  
  for l in file.readlines():
    numAndString = l.split(' ', 1)
    num = int(numAndString[0])
    string = numAndString[1]
    answers[num] = string
  
getAnswersFromFile()
getQuestionsFromFile()

es=Elasticsearch([{'host':'localhost','port':9200}])
for id in questions.keys():
  entry={
    "question": questions[id],
    "answer": answers[id],
  }
  es.index(index='eli',doc_type='question',id=id,body=entry)


