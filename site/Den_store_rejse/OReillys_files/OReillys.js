// Created by iWeb 3.0.4 local-build-20120627

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(5.6569,5.6569),color:'#000000',opacity:0.750000}),stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,204),url:'OReillys_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'OReillys_files/stroke_1.png'},{rect:new IWRect(2,-2,307,4),url:'OReillys_files/stroke_2.png'},{rect:new IWRect(309,-2,5,4),url:'OReillys_files/stroke_3.png'},{rect:new IWRect(309,2,5,204),url:'OReillys_files/stroke_4.png'},{rect:new IWRect(309,206,5,4),url:'OReillys_files/stroke_5.png'},{rect:new IWRect(2,206,307,4),url:'OReillys_files/stroke_6.png'},{rect:new IWRect(-2,206,4,4),url:'OReillys_files/stroke_7.png'}],new IWSize(311,208))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('OReillys_files/OReillysMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
