// Created by iWeb 3.0.4 local-build-20120627

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(4.2426,4.2426),color:'#000000',opacity:0.750000}),shadow_1:new IWShadow({blurRadius:10,offset:new IWPoint(4.2426,4.2426),color:'#000000',opacity:0.750000}),stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,110),url:'NZ_rejsebeskrivelse_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'NZ_rejsebeskrivelse_files/stroke_1.png'},{rect:new IWRect(2,-2,622,4),url:'NZ_rejsebeskrivelse_files/stroke_2.png'},{rect:new IWRect(624,-2,5,4),url:'NZ_rejsebeskrivelse_files/stroke_3.png'},{rect:new IWRect(624,2,5,110),url:'NZ_rejsebeskrivelse_files/stroke_4.png'},{rect:new IWRect(624,112,5,4),url:'NZ_rejsebeskrivelse_files/stroke_5.png'},{rect:new IWRect(2,112,622,4),url:'NZ_rejsebeskrivelse_files/stroke_6.png'},{rect:new IWRect(-2,112,4,4),url:'NZ_rejsebeskrivelse_files/stroke_7.png'}],new IWSize(626,114))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('NZ_rejsebeskrivelse_files/NZ_rejsebeskrivelseMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
