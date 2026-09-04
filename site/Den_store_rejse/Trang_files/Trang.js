// Created by iWeb 3.0.4 local-build-20120627

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_1:new IWShadow({blurRadius:10,offset:new IWPoint(5.6569,5.6569),color:'#000000',opacity:0.750000}),shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(4.2426,4.2426),color:'#000000',opacity:0.750000}),shadow_2:new IWShadow({blurRadius:10,offset:new IWPoint(5.6569,5.6569),color:'#000000',opacity:0.750000}),stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,221),url:'Trang_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'Trang_files/stroke_1.png'},{rect:new IWRect(2,-2,296,4),url:'Trang_files/stroke_2.png'},{rect:new IWRect(298,-2,5,4),url:'Trang_files/stroke_3.png'},{rect:new IWRect(298,2,5,221),url:'Trang_files/stroke_4.png'},{rect:new IWRect(298,223,5,5),url:'Trang_files/stroke_5.png'},{rect:new IWRect(2,223,296,5),url:'Trang_files/stroke_6.png'},{rect:new IWRect(-2,223,4,5),url:'Trang_files/stroke_7.png'}],new IWSize(300,225)),shadow_4:new IWShadow({blurRadius:10,offset:new IWPoint(5.6569,5.6569),color:'#000000',opacity:0.750000}),shadow_3:new IWShadow({blurRadius:10,offset:new IWPoint(5.6569,5.6569),color:'#000000',opacity:0.750000})});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Trang_files/TrangMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
