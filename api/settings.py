import openai
import time
from transformers import GPT2TokenizerFast

MAX_SECTION_LEN = 500
SEPARATOR = "\n* "
COMPLETIONS_MODEL = "text-davinci-002"
# Maximum number of tokens
OPENAI_TOKEN_MAX = 256
MODEL_NAME = "curie"
DOC_EMBEDDINGS_MODEL = f"text-search-{MODEL_NAME}-doc-001"
QUERY_EMBEDDINGS_MODEL = f"text-search-{MODEL_NAME}-query-001"

openai.api_key = "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"
prompt = """Answer the question as truthfully as possible using the provided Search Results. Use this current date: {date}. Do not repeat text. Cite one relevant search result per sentence using [${index}]. Only cite results that were used to create the answer.  Use at most 150 words.

Format:
* Search Result [${index}]: `${search result text}`
 
Search Results:
""".replace("{date}", time.strftime("%A, %B %d, %Y", time.gmtime()))

prompt_question = """\
Q: `{query}`
A:"""

prompt_result = """\
* Search Result [{index}]: `{result}`
"""

tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
separator_len = len(tokenizer.tokenize(SEPARATOR))

f"Context separator contains {separator_len} tokens"