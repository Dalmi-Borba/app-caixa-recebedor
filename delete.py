import sys 
import os

a = "" + sys.argv[1]
dirname = os.path.dirname(os.path.abspath(__file__))

caminho_public = dirname + "/public/uploads/" + a + ".pdf"
caminho_uploads = dirname + "/uploads/" + a

os.remove(caminho_public)
os.remove(caminho_uploads)