from shutil import make_archive
import os

dirname = os.path.dirname(os.path.abspath(__file__))
caminho = dirname + "/zip/nome.zip"

os.remove(caminho)

make_archive('./zip/nome', 'zip', 'uploads')