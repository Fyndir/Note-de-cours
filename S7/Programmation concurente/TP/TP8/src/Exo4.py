import os
fld = input("folder: ")
for root, dirs, files in os.walk(fld):
    path = root.split(os.sep)
    print((len(path) - 1) * '---', os.path.basename(root))
    for file in files:
        print(len(path) * '---', file)