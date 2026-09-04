// Created by iWeb 3.0.4 local-build-20120627

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(4.2426,4.2426),color:'#000000',opacity:0.750000}),shadow_1:new IWShadow({blurRadius:10,offset:new IWPoint(8.4853,8.4853),color:'#000000',opacity:0.750000}),stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,357),url:'Krabi_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'Krabi_files/stroke_1.png'},{rect:new IWRect(2,-2,246,4),url:'Krabi_files/stroke_2.png'},{rect:new IWRect(248,-2,4,4),url:'Krabi_files/stroke_3.png'},{rect:new IWRect(248,2,4,357),url:'Krabi_files/stroke_4.png'},{rect:new IWRect(248,359,4,4),url:'Krabi_files/stroke_5.png'},{rect:new IWRect(2,359,246,4),url:'Krabi_files/stroke_6.png'},{rect:new IWRect(-2,359,4,4),url:'Krabi_files/stroke_7.png'}],new IWSize(250,361))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Krabi_files/KrabiMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
