// Created by iWeb 3.0.4 local-build-20120627

function writeMovie1()
{document.write('<video controls preload="metadata" width="300" height="241" poster="Film_files/MVI_0980.jpg" style="height: 241px; left: 346px; position: absolute; top: 87px; width: 300px; z-index: 1; "><source src="Media/MVI_0980.mp4" type="video/mp4" /></video>');}
function writeMovie2()
{document.write('<video controls preload="metadata" width="305" height="245" poster="Film_files/MVI_0778.jpg" style="height: 245px; left: 344px; position: absolute; top: 342px; width: 305px; z-index: 1; "><source src="Media/MVI_0778.mp4" type="video/mp4" /></video>');}
setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(4.2426,4.2426),color:'#000000',opacity:0.750000})});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Film_files/FilmMoz.css')
Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
