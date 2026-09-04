// Created by iWeb 3.0.4 local-build-20120627

function createMediaStream_id3()
{return IWCreatePhotocast("/Den_store_rejse/Fotos_Australien/Sider/Great_Barrier_Reef_under_vandet_files/rss.xml",true);}
function initializeMediaStream_id3()
{createMediaStream_id3().load('/Den_store_rejse/Fotos_Australien/Sider',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget1'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id3',{pageIndex:0}));});}
function layoutMediaGrid_id3(range)
{createMediaStream_id3().load('/Den_store_rejse/Fotos_Australien/Sider',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id3',new IWPhotoGridLayout(3,new IWSize(206,206),new IWSize(206,54),new IWSize(218,275),27,27,0,new IWSize(24,18)),new IWPhotoFrame([IWCreateImage('Great_Barrier_Reef_under_vandet_files/Portfolio_Frame_01.png'),IWCreateImage('Great_Barrier_Reef_under_vandet_files/Portfolio_Frame_02.png'),IWCreateImage('Great_Barrier_Reef_under_vandet_files/Portfolio_Frame_03.png'),IWCreateImage('Great_Barrier_Reef_under_vandet_files/Portfolio_Frame_06.png'),IWCreateImage('Great_Barrier_Reef_under_vandet_files/Portfolio_Frame_09.png'),IWCreateImage('Great_Barrier_Reef_under_vandet_files/Portfolio_Frame_08.png'),IWCreateImage('Great_Barrier_Reef_under_vandet_files/Portfolio_Frame_07.png'),IWCreateImage('Great_Barrier_Reef_under_vandet_files/Portfolio_Frame_04.png')],null,2,0.750000,0.000000,20.000000,10.000000,20.000000,22.000000,31.000000,19.000000,31.000000,407.000000,320.000000,407.000000,320.000000,null,null,null,0.100000),imageStream,range,null,null,1.000000,{backgroundColor:'rgb(0, 0, 0)',reflectionHeight:100,reflectionOffset:2,captionHeight:100,fullScreen:0,transitionIndex:2},'../../Media/slideshow.html','widget1','widget2','widget3')});}
function relayoutMediaGrid_id3(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id3(range);}
function onStubPage()
{var args=window.location.href.toQueryParams();parent.IWMediaStreamPhotoPageSetMediaStream(createMediaStream_id3(),args.id);}
if(window.stubPage)
{onStubPage();}
setTransparentGifURL('../../Media/transparent.gif');function hostedOnDM()
{return false;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','../../Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','../../Media/Photo-Overlay-Movie.png')
loadMozillaCSS('Great_Barrier_Reef_under_vandet_files/Great_Barrier_Reef_under_vandetMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');NotificationCenter.addObserver(null,relayoutMediaGrid_id3,'RangeChanged','id3')
Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('../../Media/transparent.gif');initializeMediaStream_id3()
performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
