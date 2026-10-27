"""V26: four reinforced side-mounted brad pads, clear of snap tabs.
Uses measured V23 cover geometry; mounting positions/clearance are design choices.
"""
from pathlib import Path
import cadquery as cq
import trimesh
from Hummingbird_Battery_Cover_V23 import cover, W, L
SLOT_LONG=3.6
SLOT_NARROW=1.8
PAD_RADIUS=7.0
PAD_THICKNESS=2.8
PAD_Y=20.0
PAD_X=W/2+8.5
GUSSET_REACH=14.0

def reinforced_cover(lip_height):
    part=cover(lip_height)
    for sx in (-1,1):
        for sy in (-1,1):
            cx=sx*PAD_X
            cy=sy*PAD_Y
            pad=cq.Workplane('XY').center(cx,cy).circle(PAD_RADIUS).extrude(PAD_THICKNESS)
            points=[
                (sx*(W/2-2.0),cy-GUSSET_REACH),
                (sx*(W/2-2.0),cy+GUSSET_REACH),
                (sx*(PAD_X+2.0),cy+5.3),
                (sx*(PAD_X+2.0),cy-5.3),
            ]
            import math
            ox=sum(x for x,y in points)/4; oy=sum(y for x,y in points)/4
            points.sort(key=lambda p:math.atan2(p[1]-oy,p[0]-ox))
            web=cq.Workplane('XY').polyline(points).close().extrude(PAD_THICKNESS)
            part=part.union(web).union(pad)
            slot=cq.Workplane('XY').center(cx,cy).slot2D(SLOT_LONG,SLOT_NARROW,angle=90).extrude(PAD_THICKNESS+2).translate((0,0,-1))
            part=part.cut(slot)
    return part.combine().clean()

if __name__=='__main__':
    for name,lip in [('A',.45),('B',.70)]:
        path=Path(__file__).parent/f'Hummingbird_Battery_Cover_V26{name}_Side_Brad_Mounts.stl'
        cq.exporters.export(reinforced_cover(lip),str(path),tolerance=.055,angularTolerance=.11)
        mesh=trimesh.load_mesh(path)
        assert mesh.is_watertight and len(mesh.split())==1
        print(path.name,'watertight',mesh.is_watertight,'bounds',mesh.extents)
