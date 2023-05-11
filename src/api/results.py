
import openai
import settings
import pandas as pd

## borrowed from Researcher

def generate_prompt(query, chunks):
    question = settings.prompt
    for i, chunk in enumerate(chunks):
        text = " ".join(chunk.text.split())
        question += settings.prompt_result.format(index=i + 1, result=text)
    user_prompt = question + "\n" + settings.prompt_question.format(query=query)
    # print('1' + question)
    # print('2' + prompt_question)
    return user_prompt


def replace_links(response, chunks):
    for i, chunk in enumerate(chunks):
        response = response.replace(f"[{i + 1}]", f"<a href='#result-{i + 1}'>[{i + 1}]</a>")
    return response


def get_summary(query, chunks):
    prompt = generate_prompt(query, chunks)
    try:
        response = openai.Completion.create(model="text-davinci-003", prompt=prompt, temperature=0,
                                            max_tokens=OPENAI_TOKEN_MAX)
        response = response.choices[0].text
    except (ServiceUnavailableError, APIError, Timeout):
        response = "Error generating summary"
    response = html.escape(response)
    response = replace_links(response, chunks)
    return response

def answer_query_with_context(
    query: str,
    df: pd.DataFrame,
    document_embeddings: dict[(str, str), np.array],
    show_prompt: bool = False
) -> str:
    
    prompt = construct_prompt(
        query,
        document_embeddings,
        df
        )
    
    if show_prompt:
        print(prompt)

    response = openai.Completion.create(
        model="text-davinci-003", 
        prompt=prompt, 
        temperature=0,
        max_tokens=settings.OPENAI_TOKEN_MAX
        )
    
    response = response.choices[0].text

    return(response)

