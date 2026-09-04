// Created by iWeb 3.0.4 local-build-20120627

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_1:new IWShadow({blurRadius:10,offset:new IWPoint(5.6569,5.6569),color:'#000000',opacity:0.750000}),shadow_2:new IWShadow({blurRadius:10,offset:new IWPoint(5.6569,5.6569),color:'#000000',opacity:0.750000}),shadow_3:new IWShadow({blurRadius:10,offset:new IWPoint(5.6569,5.6569),color:'#000000',opacity:0.750000}),shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(5.6569,5.6569),color:'#000000',opacity:0.750000}),stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,493),url:'Uluru_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'Uluru_files/stroke_1.png'},{rect:new IWRect(2,-2,311,4),url:'Uluru_files/stroke_2.png'},{rect:new IWRect(313,-2,5,4),url:'Uluru_files/stroke_3.png'},{rect:new IWRect(313,2,5,493),url:'Uluru_files/stroke_4.png'},{rect:new IWRect(313,495,5,4),url:'Uluru_files/stroke_5.png'},{rect:new IWRect(2,495,311,4),url:'Uluru_files/stroke_6.png'},{rect:new IWRect(-2,495,4,4),url:'Uluru_files/stroke_7.png'}],new IWSize(315,497))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Uluru_files/UluruMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
