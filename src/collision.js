export function circlesOverlap(a,b) { const r=a.radius+b.radius; return (a.x-b.x)**2+(a.y-b.y)**2 < r*r; }
export function segmentCircleHit(start,end,circle,radius=0) {
  const dx=end.x-start.x, dy=end.y-start.y, len=dx*dx+dy*dy;
  const t=len ? Math.max(0,Math.min(1,((circle.x-start.x)*dx+(circle.y-start.y)*dy)/len)) : 0;
  const x=start.x+t*dx, y=start.y+t*dy, rr=radius+circle.radius;
  return (x-circle.x)**2+(y-circle.y)**2 <= rr*rr;
}
