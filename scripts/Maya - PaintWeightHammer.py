from pymel.core import *

def vertexHammerPaint(context):
    artUserPaintCtx(context, e=True,
                	setValueCommand="setVertexValueCmd()")
                	
def setVertexValueCmd(slot, index, val):
    select(sel.vtx[index])
    maya.mel.eval('weightHammerVerts')
    
maya.mel.eval('ScriptPaintTool;')

artUserPaintCtx(context.currentCtx(), e=True, toolSetupCmd="vertexHammerPaint")

