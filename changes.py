import os
import fileinput

path = "./src"
test_id = input("TEST ID please: ")
phrases_to_replace = ["test01", "T01", "t01"]

for file in os.listdir(path):
        this_file = path + "/" + file

        opened_file = open(this_file, 'r')
        filedata = opened_file.read()
        opened_file.close()

        for phrase in phrases_to_replace:
                filedata = filedata.replace(phrase, test_id)

        opened_file = open(this_file, 'w')
        opened_file.write(filedata)
        opened_file.close()