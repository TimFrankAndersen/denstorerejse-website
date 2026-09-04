// Created by iWeb 3.0.4 local-build-20120627

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,154),url:'Vores_fotos_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'Vores_fotos_files/stroke_1.png'},{rect:new IWRect(2,-2,233,4),url:'Vores_fotos_files/stroke_2.png'},{rect:new IWRect(235,-2,4,4),url:'Vores_fotos_files/stroke_3.png'},{rect:new IWRect(235,2,4,154),url:'Vores_fotos_files/stroke_4.png'},{rect:new IWRect(235,156,4,4),url:'Vores_fotos_files/stroke_5.png'},{rect:new IWRect(2,156,233,4),url:'Vores_fotos_files/stroke_6.png'},{rect:new IWRect(-2,156,4,4),url:'Vores_fotos_files/stroke_7.png'}],new IWSize(237,158))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Vores_fotos_files/Vores_fotosMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');adjustLineHeightIfTooBig('id6');adjustFontSizeIfTooBig('id6');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
