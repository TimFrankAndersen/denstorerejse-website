// Created by iWeb 3.0.4 local-build-20120627

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(4.2426,4.2426),color:'#000000',opacity:0.750000}),stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,345),url:'Tidszoner_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'Tidszoner_files/stroke_1.png'},{rect:new IWRect(2,-2,639,4),url:'Tidszoner_files/stroke_2.png'},{rect:new IWRect(641,-2,4,4),url:'Tidszoner_files/stroke_3.png'},{rect:new IWRect(641,2,4,345),url:'Tidszoner_files/stroke_4.png'},{rect:new IWRect(641,347,4,5),url:'Tidszoner_files/stroke_5.png'},{rect:new IWRect(2,347,639,5),url:'Tidszoner_files/stroke_6.png'},{rect:new IWRect(-2,347,4,5),url:'Tidszoner_files/stroke_7.png'}],new IWSize(643,349))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Tidszoner_files/TidszonerMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
