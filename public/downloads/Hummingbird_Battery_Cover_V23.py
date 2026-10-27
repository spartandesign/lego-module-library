"""Hummingbird Battery Cover V23 — tabs flush with INNER face of short wall.
Classroom test-fit prototype; not validated on hardware.
Requires cadquery and trimesh. Run python Hummingbird_Battery_Cover_V23.py.
"""
from pathlib import Path
import cadquery as cq
import trimesh
IN=25.4
W,L=2.516*IN,2.904*IN
OVERALL=.241*IN; RECESS=.163*IN; SKIN=OVERALL-RECESS
TAB_W=.268*IN; TAB_EXT=.144*IN; TAB_INSET=.435*IN; TAB_BASE_Z=.045*IN
RAIL=1.45; LIP_PROJ=.60
GROOVE=.022*IN; NOTCH_DEPTH=1.0
SCREW_FROM_OPPOSITE_EDGE=.525*IN; SCREW_Y=-L/2+SCREW_FROM_OPPOSITE_EDGE
BOSS_DIAMETER=.255*IN; BOSS_HEIGHT=.080*IN
SCREW_HOLE_DIAMETER=.070*IN
SCREW_HEAD_RECESS_DIAMETER=.270*IN; SCREW_HEAD_RECESS_DEPTH=.6
SHORT_WALL_TOTAL_HEIGHT=.122*IN
SHORT_WALL_RISE=SHORT_WALL_TOTAL_HEIGHT-SKIN
SHORT_WALL_THICKNESS=.8
TAB_TOP_Z=SHORT_WALL_TOTAL_HEIGHT
TAB_STEM_THICK=TAB_TOP_Z-TAB_BASE_Z

def cover(lip_height):
    s=cq.Workplane('XY').box(W,L,SKIN,centered=(True,True,False)).edges('|Z').fillet(1.1)
    for x in [-W/2+RAIL/2,W/2-RAIL/2]:
        s=s.union(cq.Workplane('XY').box(RAIL,L-1.2,RECESS).translate((x,0,SKIN+RECESS/2)))
    s=s.union(cq.Workplane('XY').box(W-2*RAIL,RAIL,RECESS).translate((0,-L/2+RAIL/2,SKIN+RECESS/2)))
    s=s.union(cq.Workplane('XY').box(W-2*RAIL,SHORT_WALL_THICKNESS,SHORT_WALL_RISE)
       .translate((0,L/2-SHORT_WALL_THICKNESS/2,SKIN+SHORT_WALL_RISE/2)))
    xc=W/2-TAB_INSET-TAB_W/2
    inner_face_y=L/2-SHORT_WALL_THICKNESS
    tip_y=L/2+TAB_EXT
    hook_start_y=tip_y-LIP_PROJ
    for x in [-xc,xc]:
        stem_begin=inner_face_y-.15
        stem_end=hook_start_y+.10
        s=s.union(cq.Workplane('XY').box(TAB_W,stem_end-stem_begin,TAB_STEM_THICK)
          .translate((x,(stem_begin+stem_end)/2,TAB_BASE_Z+TAB_STEM_THICK/2)))
        s=s.union(cq.Workplane('XY').box(TAB_W-.6,tip_y-hook_start_y+.10,lip_height)
          .translate((x,(hook_start_y+tip_y)/2,TAB_TOP_Z-lip_height/2)))
    z0=SKIN+RECESS-GROOVE
    strips=[(GROOVE+.10,L-1.6,-W/2+RAIL-GROOVE/2,0),(GROOVE+.10,L-1.6,W/2-RAIL+GROOVE/2,0),(W-2*RAIL+.2,GROOVE+.10,0,-L/2+RAIL-GROOVE/2)]
    for wx,ly,x,y in strips:
        s=s.cut(cq.Workplane('XY').box(wx,ly,GROOVE+.12,centered=(True,True,False)).translate((x,y,z0)))
    for x in [-xc,xc]:
        s=s.cut(cq.Workplane('XY').box(TAB_W,RAIL+.4,NOTCH_DEPTH,centered=(True,True,False))
          .translate((x,-L/2+RAIL/2,SKIN+RECESS-NOTCH_DEPTH)))
    s=s.union(cq.Workplane('XY').center(0,SCREW_Y).circle(BOSS_DIAMETER/2).extrude(BOSS_HEIGHT).translate((0,0,SKIN)))
    s=s.cut(cq.Workplane('XY').center(0,SCREW_Y).circle(SCREW_HOLE_DIAMETER/2).extrude(SKIN+BOSS_HEIGHT+1).translate((0,0,-.5)))
    s=s.cut(cq.Workplane('XY').center(0,SCREW_Y).circle(SCREW_HEAD_RECESS_DIAMETER/2).extrude(SCREW_HEAD_RECESS_DEPTH+.001).translate((0,0,-.001)))
    return s.combine()

if __name__=='__main__':
    root=Path(__file__).parent
    for name,lip in [('A',.45),('B',.70)]:
        p=root/f'Hummingbird_Battery_Cover_V23{name}_Inner_Face_Tabs.stl'
        cq.exporters.export(cover(lip),str(p),tolerance=.06,angularTolerance=.1)
        mesh=trimesh.load_mesh(p)
        print(p.name,'watertight=',mesh.is_watertight,'components=',len(mesh.split()),'bounds=',mesh.extents)
