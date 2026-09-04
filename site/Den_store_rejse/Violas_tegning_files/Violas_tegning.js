// Created by iWeb 3.0.4 local-build-20120627

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,463),url:'Violas_tegning_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'Violas_tegning_files/stroke_1.png'},{rect:new IWRect(2,-2,642,4),url:'Violas_tegning_files/stroke_2.png'},{rect:new IWRect(644,-2,4,4),url:'Violas_tegning_files/stroke_3.png'},{rect:new IWRect(644,2,4,463),url:'Violas_tegning_files/stroke_4.png'},{rect:new IWRect(644,465,4,5),url:'Violas_tegning_files/stroke_5.png'},{rect:new IWRect(2,465,642,5),url:'Violas_tegning_files/stroke_6.png'},{rect:new IWRect(-2,465,4,5),url:'Violas_tegning_files/stroke_7.png'}],new IWSize(646,467))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Violas_tegning_files/Violas_tegningMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
