from Bio import Entrez
import pandas as pd
import openai
import numpy as np
import pickle
from transformers import GPT2TokenizerFast
import re
from typing import Set
from transformers import GPT2TokenizerFast
from nltk.tokenize import sent_tokenize
from nltk import tokenize
from itertools import chain 

COMPLETIONS_MODEL = "text-davinci-002"

def search(query):
    Entrez.email = 'your.email@example.com'
    handle = Entrez.esearch(db='pubmed',
                            sort='relevance',
                            retmax='10',
                            retmode='xml',
                            term=query)
    results = Entrez.read(handle)
    return results


def count_tokens(text: str) -> int:
    """count the number of tokens in a string"""
    tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
    return len(tokenizer.encode(text))

def apa_citation(authors, title, journal, volume, issue, pages, year, doi):
  citation = authors + " (" + year + "). " + title + " " + journal
  if volume and issue:
    citation += ", " + volume + "(" + issue + ")"
  if pages:
    citation += ", " + pages
  if doi:
    citation += ". https://doi.org/" + doi
  return citation

def fetch_details(id_list):
    ids = ','.join(id_list)
    Entrez.email = 'your.email@example.com'
    handle = Entrez.efetch(db='pubmed',
                           retmode='xml',
                           id=ids)
    results = Entrez.read(handle)
    return results

def get_keywords(user_query):

    keywords_response = openai.Completion.create(
      model="text-davinci-002",
      prompt="Extract keywords from this text; only extract keywords from this text and nothing else:" + user_query,
      temperature=0,
      max_tokens=60,
      top_p=1.0,
      frequency_penalty=0.8,
      presence_penalty=0.0
      )
    
    keywords = keywords_response.choices[0].text
    keywords = keywords.replace(',', '')
    keywords = keywords.replace('\n', '')
    
    return(keywords)

def get_papers(user_query):
    
    # if __name__ == '__main__':
    keywords = get_keywords(user_query)
    # print("Keywords retrieved!")
    # print(keywords)
    results = search(keywords)
    # print("Results retrieved!")
    print(results)
    id_list = results['IdList']
    papers = fetch_details(id_list)
    for i, paper in enumerate(papers['PubmedArticle']):
        print("{}) {}".format(i+1, paper['MedlineCitation']['Article']['ArticleTitle']))
                
    return(papers)

def get_dataframe(user_query, is_dataframe = True):
    papers = get_papers(user_query)
    print("Papers retrieved!")

    titles = [0] * len(papers['PubmedArticle'])
    contents = [0] * len(papers['PubmedArticle'])
    tokens = [0] * len(papers['PubmedArticle'])
    abstracts = [0] * len(papers['PubmedArticle'])
    authors = [0] * len(papers['PubmedArticle'])
    length = [0] * len(papers['PubmedArticle'])
    citations = [0] * len(papers['PubmedArticle'])

    for i in range(len(papers['PubmedArticle'])):
        try:
            print(i)

            paper = papers['PubmedArticle'][i]
            title = paper.get('MedlineCitation', {}).get('Article', {}).get('ArticleTitle')
            content = paper.get('MedlineCitation', {}).get('Article', {}).get('Abstract', {}).get('AbstractText')
            if content: 
                content = ''.join(content)
                token = count_tokens(content)
            journal = paper.get('MedlineCitation', {}).get('Article', {}).get('Journal', {}).get('Title')
            volume = paper.get('MedlineCitation', {}).get('Article', {}).get('Journal', {}).get('JournalIssue', {}).get('Volume')
            issue = paper.get('MedlineCitation', {}).get('Article', {}).get('Journal', {}).get('JournalIssue', {}).get('Issue')
        
            pages = paper.get('MedlineCitation', {}).get('Article', {}).get('Pagination', {}).get('MedlinePgn')
            year = paper.get('MedlineCitation', {}).get('Article', {}).get('Journal', {}).get('JournalIssue', {}).get('PubDate', {}).get('Year')
            doi = paper.get('MedlineCitation', {}).get('Article', {}).get('PublicationTypeList', {})[1].attributes['UI']
            
            authorlist = [1] * len(paper['MedlineCitation']['Article']['AuthorList'])
            print(paper['MedlineCitation']['Article']['AuthorList'])

            for j in range(len(paper['MedlineCitation']['Article']['AuthorList'])):
                lastname = paper.get('MedlineCitation', {}).get('Article', {}).get('AuthorList', {})[j].get('LastName')
                firstname = paper.get('MedlineCitation', {}).get('Article', {}).get('AuthorList', {})[j].get('Initials')
                if firstname is not None and lastname is not None: 
                    author = lastname + ' ' + firstname + '.'
                    authorlist[j] = author
            
            authorlist = ', '.join(authorlist)
            authors[i] = authorlist
            
            citations[i] = apa_citation(authorlist, title, journal, volume, issue, pages, year, doi)
        
            titles[i] = title
            contents[i] = content
            if content: tokens[i] = token

        except KeyError as e:
            print('I got a KeyError - reason "%s"' % str(e))
            # continue 
            
        except IndexError as e:
            print('I got a IndexError - reason "%s"' % str(e))
            # continue 

    d = {'titles': titles, 'content': contents, 'tokens': tokens, 'citations': citations}
    df = pd.DataFrame(d, columns=['titles', 'content', 'tokens', 'citations', 'authors'])
    
    if is_dataframe:
        print("OK")
        df = process_dataframe(df)
        print("OK!")
        df = split_df(df)
        return df
    else:
        return data

def process_dataframe(df):
    print("Processing df")
    # Process dataframe
    df = df[df.tokens>40]
    df = df.drop_duplicates(['titles'])
    # df = df.reset_index().drop('index',axis=1) # reset index
    # df = df.set_index(["titles"])
    print(df)
    print("OK")
    return(df)

def split_df(df):
    print("Splitting df")
    list_of_dfs = list(df.apply(split_row, axis=1))
    result_df = pd.concat(list_of_dfs, axis = 0, ignore_index = True)
    result_df['tokens'] = list(result_df['content'].apply(count_tokens))
    return(result_df)

def split_row(row):
    # for each row, return a df with sentences and same columns
    p = row['content']
    p_tokenized = tokenize.sent_tokenize(p)
    dict = {
        'titles': [row['titles']] * len(p_tokenized), 
        'content': p_tokenized, 
        'citations': [row['citations']] * len(p_tokenized),
        'line': list(range(1, len(p_tokenized) + 1))}
    df = pd.DataFrame(dict)
    return(df)
