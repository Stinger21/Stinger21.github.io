#target Maya
#me@mattwestphal.com
from pymel.core import *

path = r'folder_path_here';

listOfFiles = [];
filesToExport = 0;
filesExported = 0;

for dirpath,_,filenames in os.walk(path):
   for f in filenames:
        if(f.endswith(".fbx")):
            nameOfFile = os.path.abspath(os.path.join(dirpath, f))
            listOfFiles.append(nameOfFile);

for nameOfFile in listOfFiles:
    print str(filesExported) + "/" + str(len(listOfFiles))
    filesExported += 1;
    
    #Processing code strats here
    newNodes = mc.file(nameOfFile, i=True, returnNewNodes=True)
    select(newNodes)
    for thing in newNodes:
        select(thing)
        if(type(PyNode(thing)) == nodetypes.Mesh):
            polyAutoProjection(uvSetName="lightmap", createNewMap=True)
    #processing code ends here
    
    nameOfFile = nameOfFile.replace("\\", "\\\\");
    maya.mel.eval('file -force -options "v=0;" -typ "FBX export" -pr -es "'+nameOfFile+'";');
    maya.mel.eval("file -f -new;");
