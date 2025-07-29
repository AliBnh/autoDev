from tree_sitter import Language, Parser

PY_LANGUAGE = Language('backend/build/python.so', 'python')

parser = Parser()
parser.set_language(PY_LANGUAGE)

source_code = b"def hello():\n    return 'Hello, World!'"
tree = parser.parse(source_code)

print(tree.root_node.sexp())
