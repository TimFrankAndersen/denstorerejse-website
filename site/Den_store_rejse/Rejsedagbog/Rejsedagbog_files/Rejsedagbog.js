// Created by iWeb 3.0.4 local-build-20120627

setTransparentGifURL('../Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-2,2,4,146),url:'Rejsedagbog_files/stroke.png'},{rect:new IWRect(-2,-2,4,4),url:'Rejsedagbog_files/stroke_1.png'},{rect:new IWRect(2,-2,340,4),url:'Rejsedagbog_files/stroke_2.png'},{rect:new IWRect(342,-2,4,4),url:'Rejsedagbog_files/stroke_3.png'},{rect:new IWRect(342,2,4,146),url:'Rejsedagbog_files/stroke_4.png'},{rect:new IWRect(342,148,4,4),url:'Rejsedagbog_files/stroke_5.png'},{rect:new IWRect(2,148,340,4),url:'Rejsedagbog_files/stroke_6.png'},{rect:new IWRect(-2,148,4,4),url:'Rejsedagbog_files/stroke_7.png'}],new IWSize(344,150)),shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(4.2426,4.2426),color:'#000000',opacity:0.750000})});registry.applyEffects();}
function hostedOnDM()
{return false;}
function photocastSubscribe()
{photocastHelper("/Den_store_rejse/Rejsedagbog/rss.xml");}
function onPageLoad()
{loadMozillaCSS('Rejsedagbog_files/RejsedagbogMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');detectBrowser();adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('../Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}
