import maya.mel;
from pymel.core import *;
import maya.mel;
import tempfile;
path = (str(tempfile.gettempdir()) + '/obj.obj').replace("\\", "/");

if(len(ls(sl=True)) == 0):
    print "Nothing Selected";
    sys.exit();

oldMesh = ls(sl=True)[0];
select(oldMesh);
maya.mel.eval('file -force -options "groups=0;ptgroups=0;materials=0;smoothing=0;normals=1" -typ "OBJexport" -pr -es "'+path+'";');
newMesh = maya.mel.eval('file -import -type "OBJ" -returnNewNodes -ignoreVersion -ra true -mergeNamespacesOnClash false -namespace "obj" -options "mo=1"  -pr "'+path+'";');
delete(oldMesh);