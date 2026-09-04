// Created by iWeb 3.0.4 local-build-20120627

function createMediaStream_id2()
{return IWCreateMediaCollection("/Den_store_rejse/Fotos_Australien/Fotos_Australien_files/rss.xml",true,9,["Endnu ingen fotos","%d foto","%d fotos"],["","%d klip","%d klip"]);}
function initializeMediaStream_id2()
{createMediaStream_id2().load('/Den_store_rejse/Fotos_Australien',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget13'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id2',{pageIndex:0}));});}
function layoutMediaGrid_id2(range)
{createMediaStream_id2().load('/Den_store_rejse/Fotos_Australien',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id2',new IWPhotoGridLayout(2,new IWSize(253,190),new IWSize(253,32),new IWSize(336,237),27,27,0,new IWSize(89,73)),new IWPhotoFrame([IWCreateImage('Fotos_Australien_files/spiralboook_ul.png'),IWCreateImage('Fotos_Australien_files/spiralboook_top.png'),IWCreateImage('Fotos_Australien_files/spiralboook_ur.png'),IWCreateImage('Fotos_Australien_files/spiralboook_right.png'),IWCreateImage('Fotos_Australien_files/spiralboook_lr.png'),IWCreateImage('Fotos_Australien_files/spiralboook_bottom.png'),IWCreateImage('Fotos_Australien_files/spiralboook_ll.png'),IWCreateImage('Fotos_Australien_files/spiralboook_left.png')],null,1,0.800000,0.000000,10.000000,0.000000,19.000000,62.000000,49.000000,48.000000,72.000000,20.000000,1.000000,20.000000,1.000000,null,null,null,0.100000),imageStream,range,(null),null,1.000000,null,'../Media/slideshow.html','widget13',null,'widget14',{showTitle:true,showMetric:true})});}
function relayoutMediaGrid_id2(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id2(range);}
function onStubPage()
{var args=window.location.href.toQueryParams();parent.IWMediaStreamPhotoPageSetMediaStream(createMediaStream_id2(),args.id);}
if(window.stubPage)
{onStubPage();}
setTransparentGifURL('../Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_0:new IWShadow({blurRadius:10,offset:new IWPoint(4.2426,4.2426),color:'#000000',opacity:0.750000})});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','../Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','../Media/Photo-Overlay-Movie.png')
loadMozillaCSS('Fotos_Australien_files/Fotos_AustralienMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');NotificationCenter.addObserver(null,relayoutMediaGrid_id2,'RangeChanged','id2')
Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('../Media/transparent.gif');applyEffects()
initializeMediaStream_id2()}
function onPageUnload()
{Widget.onunload();}
