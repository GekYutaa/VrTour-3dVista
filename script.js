(function(){
    var script = {
 "mouseWheelEnabled": true,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "horizontalAlign": "left",
 "vrPolyfillScale": 0.75,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_23C0B275_0415_77D7_4191_A1AB84AE3952], 'cardboardAvailable'); this.syncPlaylists([this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist,this.mainPlayList])",
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_270E7C0C_0434_9335_418B_F7861C47E08A",
  "this.Container_222AB707_0415_9D33_417A_EBEDE3FBF508"
 ],
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scripts": {
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "registerKey": function(key, value){  window[key] = value; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "unregisterKey": function(key){  delete window[key]; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "existsKey": function(key){  return key in window; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 20,
 "paddingBottom": 0,
 "defaultVRPointer": "laser",
 "scrollBarMargin": 2,
 "downloadEnabled": false,
 "height": "100%",
 "layout": "absolute",
 "buttonToggleMute": "this.IconButton_26177B59_0434_95DF_414F_E7244A19A0B5",
 "shadow": false,
 "class": "Player",
 "borderRadius": 0,
 "paddingTop": 0,
 "data": {
  "name": "Player15653"
 },
 "overflow": "visible",
 "gap": 10,
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -166.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_050903EE_11B1_E47F_417E_ED8BDC003E1C"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 6.03,
   "backwardYaw": -116.06,
   "distance": 1,
   "panorama": "this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -167.06,
   "backwardYaw": -1.51,
   "distance": 1,
   "panorama": "this.panorama_D108D923_C067_9680_41DF_FC7852981F40"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383",
 "thumbnailUrl": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_t.jpg",
 "hfovMin": "120%",
 "label": "20261107_155743_225",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_tcap0",
  "this.overlay_15654F84_0DDC_6466_41A0_E4BD4FA0EDBF",
  "this.overlay_1483CF5D_0DDC_24E7_419B_395F5446C210"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -84.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_063CF2F2_11B1_E467_4195_94C6BAB7E0C2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 23.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0537B40E_11B1_E3BF_4171_88CA3E540FFA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 7.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_07A45511_11B1_EDA5_41AF_47591BD85229"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -1.26,
   "backwardYaw": -174.1,
   "distance": 1,
   "panorama": "this.panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -173.09,
   "backwardYaw": 76.87,
   "distance": 1,
   "panorama": "this.panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B",
 "thumbnailUrl": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-11 (utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_1E7555DE_041C_BCD5_4184_3F3BFB37171D",
  "this.overlay_1EB43F82_041D_8D2D_417D_FCDE3234FA74",
  "this.overlay_18E63BD5_041D_94D6_4158_737610052A10",
  "this.panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_tcap0"
 ],
 "hfovMax": 130
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -95.34,
   "backwardYaw": 63.81,
   "distance": 1,
   "panorama": "this.panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD",
 "thumbnailUrl": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_t.jpg",
 "hfovMin": "120%",
 "label": "p-4-3(merajan)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_tcap0",
  "this.overlay_2E5A5831_0E3C_2CBE_4183_BF97BCB0D678"
 ],
 "hfovMax": 130
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -171.84,
   "backwardYaw": 116.82,
   "distance": 1,
   "panorama": "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220",
 "thumbnailUrl": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_t.jpg",
 "hfovMin": "120%",
 "label": "p-2p7(semanggen)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_0B298950_0414_B52E_4181_63FDF851197F",
  "this.panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -8.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_06ABD29E_11B1_E4DF_41A9_5DC4917E990A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -14.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_055DD42C_11B1_E3E3_41A6_F8856A3AA2BD"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108C978_C067_B681_41C6_59D59F2B78E7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_D108C978_C067_B681_41C6_59D59F2B78E7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D1093845_C065_B683_41D8_B045377D044B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_D1093845_C065_B683_41D8_B045377D044B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_D1097C7E_C065_AE81_413D_5F46F91C687C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_D108D86A_C065_9681_41CF_C5D368F19D2C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_D2B55F8F_C067_A99F_41D9_2063000041BF",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108D923_C067_9680_41DF_FC7852981F40_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "media": "this.panorama_D108D923_C067_9680_41DF_FC7852981F40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "media": "this.panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "media": "this.panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "media": "this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "media": "this.panorama_D2E620BB_C067_9787_41D6_760F3A72B48E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "media": "this.panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "media": "this.panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "media": "this.panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "media": "this.panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "media": "this.panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "media": "this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "media": "this.panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "media": "this.panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "media": "this.panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108C4B2_C065_9F81_4199_9036460AA92D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "media": "this.panorama_D108C4B2_C065_9F81_4199_9036460AA92D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "media": "this.panorama_D108C9A7_C065_698F_41E3_80422CEB50C5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "media": "this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "class": "PhotoAlbumPlayListItem",
   "media": "this.album_2C88C3EC_04F4_94F6_4179_5A5A7EACFC02",
   "player": "this.MainViewerPhotoAlbumPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "class": "PhotoAlbumPlayListItem",
   "media": "this.album_2DBA9119_04F5_B55E_4187_CD1E62329602",
   "player": "this.MainViewerPhotoAlbumPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "media": "this.panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 0)",
   "media": "this.panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0689C287_11B1_E4AD_41A8_BFF84019DF70"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "targetYaw": 0,
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 103.44,
    "path": "shortest",
    "targetPitch": 0,
    "easing": "cubic_in_out",
    "pitchSpeed": 51.98
   },
   {
    "targetYaw": 47.36,
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 33.25,
    "path": "shortest",
    "targetPitch": -30.84,
    "easing": "cubic_in_out",
    "pitchSpeed": 17.05
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_0590D38A_11B1_E4A7_417B_B4A572FDC92C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_065EA301_11B1_E5A5_41B0_588E01BFEC0F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_D108C978_C067_B681_41C6_59D59F2B78E7_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.1,
  "pitch": 0.75
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -156.01,
   "backwardYaw": -16.08,
   "distance": 1,
   "panorama": "this.panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -14.32,
   "backwardYaw": 24.62,
   "distance": 1,
   "panorama": "this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D1093845_C065_B683_41D8_B045377D044B",
 "thumbnailUrl": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_t.jpg",
 "hfovMin": "120%",
 "label": "P-2(masuk semanggen)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_E391AC6E_F95C_B297_41C2_70AE641BB1DA",
  "this.overlay_E0DB9C39_F95C_92FA_4187_71D01DFEDAD0",
  "this.panorama_D1093845_C065_B683_41D8_B045377D044B_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 13.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05CFD3BF_11B1_E4DC_41A3_D0DB1B296672"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.92,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_06D7A2BC_11B1_E4E3_4188_F32EDB6F92A0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 172.71,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_044384C3_11B1_ECA5_41A5_330B1EE2A5EE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 94.84,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0587337B_11B1_E465_4192_1CE5E165316C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D108D923_C067_9680_41DF_FC7852981F40_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.13,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_047174E1_11B1_EC65_41B0_DA94C5A63C32"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -93.45,
   "backwardYaw": 95.46,
   "distance": 1,
   "panorama": "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 45.22,
   "backwardYaw": -171.96,
   "distance": 1,
   "panorama": "this.panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0",
 "thumbnailUrl": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-4(utama ke tmpt ratu)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_100F598B_043C_F532_4187_B080CE379077",
  "this.panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_tcap0",
  "this.overlay_2C06BEF1_04F4_8CEE_4188_7DCE60DE370D"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 138.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05BAB3B0_11B1_E4E3_41A5_2CCA84478AF3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.16,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_02685354_11B1_E5A3_41A2_2D77559C237B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -52.25,
   "backwardYaw": -174.6,
   "distance": 1,
   "panorama": "this.panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -174.1,
   "backwardYaw": -1.26,
   "distance": 1,
   "panorama": "this.panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3",
 "thumbnailUrl": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_t.jpg",
 "hfovMin": "120%",
 "label": "p3-12(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_1B167774_0415_7DD5_418D_4BB9A27D529A",
  "this.overlay_1999FEA4_0417_8F76_4128_27B62FA08410",
  "this.panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_tcap0"
 ],
 "hfovMax": 130
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 63.81,
   "backwardYaw": -95.34,
   "distance": 1,
   "panorama": "this.panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -171.84,
   "backwardYaw": -0.5,
   "distance": 1,
   "panorama": "this.panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B",
 "thumbnailUrl": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_t.jpg",
 "hfovMin": "120%",
 "label": "p-4-2(merajan)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_tcap0",
  "this.overlay_108EC08A_0E3C_3C62_41A1_D3977CA89540",
  "this.overlay_2F141B46_0E3C_2CE2_41A7_BC610F935E41"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -7.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0267234C_11B1_E5A3_41A5_0B8D89C11729"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -14.82,
  "pitch": 3.52
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.64,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_050393E6_11B1_E46F_41A7_2DF30B779FA5"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 11.3,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0278C36B_11B1_E465_41A0_F345F2CD9DBC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.56,
  "pitch": -1
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D1093845_C065_B683_41D8_B045377D044B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0548C41D_11B1_E3DD_4198_C696F9B293D7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_camera"
},
{
 "class": "PhotoAlbumPlayer",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPhotoAlbumPlayer"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 2.39,
   "backwardYaw": 176.36,
   "distance": 1,
   "panorama": "this.panorama_D108D86A_C065_9681_41CF_C5D368F19D2C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -170.83,
   "backwardYaw": -7.29,
   "distance": 1,
   "panorama": "this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD",
 "thumbnailUrl": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_t.jpg",
 "hfovMin": "120%",
 "label": "p-2-8(semanggen)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_DAF9B1FF_F9DD_9576_41EB_D1B8356C5B8D",
  "this.overlay_DA2EAF05_F9DD_8E95_41B7_19785D32239A",
  "this.panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 84.66,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05898383_11B1_E4A5_414D_2CA99603D68D"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -174.6,
   "backwardYaw": -52.25,
   "distance": 1,
   "panorama": "this.panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1,
   "backwardYaw": 171.71,
   "distance": 1,
   "panorama": "this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1",
 "thumbnailUrl": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-13(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_1A17C948_0414_953D_416F_8C691619CB98",
  "this.overlay_1A9B706C_0415_93F5_418A_4C0E5407AD8E",
  "this.panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 104.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0577A43B_11B1_E3E5_41AF_DDF84B9DE9F1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 63.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_052323FE_11B1_E45F_418C_9ABCD82228E8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.13,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0277A363_11B1_E465_4199_49A79973180A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0465C4D9_11B1_ECA5_41A8_A8F28CBB0445"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 12.69,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05E073CF_11B1_E4BD_41B1_7187B871A8B3"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -171.96,
   "backwardYaw": 45.22,
   "distance": 1,
   "panorama": "this.panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -14.57,
   "backwardYaw": -171.08,
   "distance": 1,
   "panorama": "this.panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7",
 "thumbnailUrl": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-6(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_113C04DD_043C_9CD7_418F_48ED11E12468",
  "this.overlay_11498A91_043C_972E_418F_1CE02E651DEB",
  "this.panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_078E54F0_11B1_EC63_41A8_12727E6F4FAA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -151.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_04D9747F_11B1_EC5D_41A1_2B436DF54DB2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -52.7,
   "backwardYaw": 176.36,
   "distance": 1,
   "panorama": "this.panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.73,
   "backwardYaw": 13.82,
   "distance": 1,
   "panorama": "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 24.62,
   "backwardYaw": -14.32,
   "distance": 1,
   "panorama": "this.panorama_D1093845_C065_B683_41D8_B045377D044B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265",
 "thumbnailUrl": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_t.jpg",
 "hfovMin": "120%",
 "label": "P-2-2(semanggen)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_E543D7CB_F95C_9D9D_41D2_FE3D6F24E96C",
  "this.overlay_E2F59EAB_F95C_8F9E_41ED_AD5D8A771EEE",
  "this.overlay_E2A8E557_F95C_92B6_41E4_AE84670DD82E",
  "this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_tcap0",
  "this.overlay_2F3EB5C0_0E44_27DE_418F_48C2625762FC"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.59,
  "pitch": -22.11
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.24,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_04C69470_11B1_EC63_41B0_D2BBA8493C96"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 3.52
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -116.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0696928E_11B1_E4BF_418D_6BBAA09E55AE"
},
{
 "class": "FadeOutEffect",
 "duration": 1000,
 "id": "effect_23D8828B_0414_9732_4186_DB0AE83B349F",
 "easing": "linear"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -179.87,
   "backwardYaw": 1.51,
   "distance": 1,
   "panorama": "this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.25,
   "backwardYaw": -172.09,
   "distance": 1,
   "panorama": "this.panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -116.06,
   "backwardYaw": 6.03,
   "distance": 1,
   "panorama": "this.panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F",
 "thumbnailUrl": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_t.jpg",
 "hfovMin": "120%",
 "label": "p-6 (area pura)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_tcap0",
  "this.overlay_2469B1BA_0E44_3FAD_4190_74B14744ABF8",
  "this.overlay_221E4763_0E44_64A2_41A2_3CB377767B2F",
  "this.overlay_208A0293_0E4C_7C62_41AA_A2C4F56B41B7"
 ],
 "hfovMax": 130
},
{
 "class": "FadeInEffect",
 "duration": 700,
 "id": "effect_23D3EBCA_0414_F53D_4164_86C47DC18DFF",
 "easing": "linear"
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_1CCB2068_114E_A462_4198_E7C329F35FB0",
 "width": 767,
 "label": "WhatsApp Image 2026-11-23 at 02.22.41 (2)",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_1CCB2068_114E_A462_4198_E7C329F35FB0.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 732
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 171.71,
   "backwardYaw": 1,
   "distance": 1,
   "panorama": "this.panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.51,
   "backwardYaw": -179.87,
   "distance": 1,
   "panorama": "this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -41.11,
   "backwardYaw": -150.64,
   "distance": 1,
   "panorama": "this.panorama_D108C9A7_C065_698F_41E3_80422CEB50C5"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092",
 "thumbnailUrl": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-14(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_tcap0",
  "this.overlay_14991F4B_0DC4_24E2_41A2_B4EAA8310A38",
  "this.overlay_146988DB_0DC5_EDE2_41AA_3F1E591C4CB5",
  "this.overlay_2E7A5F8B_0E44_2463_41A4_F52741F90EF3"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_06695308_11B1_E5A3_418F_7186123F4EF6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.64,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_043694BB_11B1_ECE5_4189_B809771B5D7B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 165.93,
   "backwardYaw": -75.12,
   "distance": 1,
   "panorama": "this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 76.87,
   "backwardYaw": -173.09,
   "distance": 1,
   "panorama": "this.panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD",
 "thumbnailUrl": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-12(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_tcap0",
  "this.overlay_1C286040_0DC4_3CDD_4199_CD8025C5DE86",
  "this.overlay_19B847F9_0DFC_23AE_4199_0C48659D547B"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -155.38,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_06E1D2C4_11B1_E4A3_41AC_9AE5D25A8285"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 176.36,
   "backwardYaw": 2.39,
   "distance": 1,
   "panorama": "this.panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D108D86A_C065_9681_41CF_C5D368F19D2C",
 "thumbnailUrl": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_t.jpg",
 "hfovMin": "120%",
 "label": "p-3(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_DD9402A4_F9D3_978B_41E9_29477C051915",
  "this.overlay_0BCC1D74_040D_8DD6_418E_C1AC612F07FE",
  "this.panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "FadeOutEffect",
 "duration": 700,
 "id": "effect_236CCAC4_0414_9735_4190_352F25432A76",
 "easing": "linear"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0682827F_11B1_E45D_419C_B8D888949669"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 171.71,
   "backwardYaw": -0.5,
   "distance": 1,
   "panorama": "this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D108C4B2_C065_9F81_4199_9036460AA92D",
 "thumbnailUrl": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_t.jpg",
 "hfovMin": "120%",
 "label": "p-5-3(saren kelod)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D108C4B2_C065_9F81_4199_9036460AA92D_tcap0",
  "this.overlay_2A2E9F28_0E44_E4AE_419E_13CBBCA5069D"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -62.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05EF73D7_11B1_E4AD_419D_3E6E80AB814D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.04,
  "pitch": 2.01
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.62,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -171.08,
   "backwardYaw": -14.57,
   "distance": 1,
   "panorama": "this.panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91",
 "thumbnailUrl": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-7(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_11B959A3_0433_9572_4188_DF0D537A9B89",
  "this.overlay_12385E4E_0434_8F35_4177_788577BDD505",
  "this.overlay_1285F92A_040C_9572_4164_3A7EC86FC0CC",
  "this.panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 5.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_026DB35C_11B1_E5A3_41A2_50204D8FB04C"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 172.34,
   "backwardYaw": -2.01,
   "distance": 1,
   "panorama": "this.panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D108C978_C067_B681_41C6_59D59F2B78E7",
 "thumbnailUrl": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_t.jpg",
 "hfovMin": "120%",
 "label": "p-1(pintu masuk)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_EBC911DF_F96C_95B5_41E8_1613ADE898FD",
  "this.panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D108C4B2_C065_9F81_4199_9036460AA92D_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -167.31,
   "backwardYaw": 28.51,
   "distance": 1,
   "panorama": "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F",
 "thumbnailUrl": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-8(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_tcap0",
  "this.overlay_1722C74E_0DCC_E4E5_4197_701FC2E8B4EA",
  "this.overlay_16902DDC_0DCD_E7E5_41AB_B05F838FCD33"
 ],
 "hfovMax": 130
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449",
 "thumbnailUrl": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_t.jpg",
 "hfovMin": "120%",
 "label": "p-2-3(semanggen)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_E5370891_F953_F38A_41EA_FDCC877568DA",
  "this.overlay_E20A3571_F955_F28A_41E3_5B7DFF53C8CB",
  "this.panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "Panorama",
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_t.jpg"
  }
 ],
 "label": "pura6-1",
 "id": "panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0",
 "thumbnailUrl": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_t.jpg",
 "hfovMin": "120%",
 "pitch": 0,
 "overlays": [
  "this.overlay_018379AB_1173_A4E5_4193_8C4506D6FDD6",
  "this.overlay_025D7758_1172_ADA3_4184_AAED0494E063"
 ],
 "hfov": 360,
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_041EB4AC_11B1_ECE3_41A3_856A05C2F0F9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.17,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.76,
  "pitch": 16.58
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.92,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_041054A5_11B1_ECED_417B_BC3372BD1451"
},
{
 "class": "Panorama",
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_t.jpg"
  }
 ],
 "label": "P3-2",
 "id": "panorama_D2E620BB_C067_9787_41D6_760F3A72B48E",
 "thumbnailUrl": "media/panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_t.jpg",
 "hfovMin": "120%",
 "pitch": 0,
 "overlays": [
  "this.panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_tcap0"
 ],
 "hfov": 360,
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "targetYaw": 47.36,
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 33.25,
    "path": "shortest",
    "targetPitch": -30.84,
    "easing": "cubic_in_out",
    "pitchSpeed": 17.05
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05A6B3A1_11B1_E4E5_41AF_DBF9CB44380C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.01,
  "pitch": 2.01
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 136.59,
   "backwardYaw": -50.75,
   "distance": 1,
   "panorama": "this.panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.5,
   "backwardYaw": 171.71,
   "distance": 1,
   "panorama": "this.panorama_D108C4B2_C065_9F81_4199_9036460AA92D"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E9A163_C062_9687_41DF_3403A4FDF221",
 "thumbnailUrl": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_t.jpg",
 "hfovMin": "120%",
 "label": "p-5-2(saren kelod)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_tcap0",
  "this.overlay_2D8B4FD0_0E5C_23FD_416B_FEC902D3A958",
  "this.overlay_2A5F7403_0E5F_E462_41A2_023E25200D74"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -8.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0603D2D3_11B1_E4A5_419F_FF6E3CB5A1FF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 129.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_069DA296_11B1_E4AF_41AD_05C7D70785BC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0582F374_11B1_E463_4171_163ECD66AB7E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 127.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_06F172CB_11B1_E4A5_41A4_1DAA8D81330B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -80.89,
   "backwardYaw": -168.7,
   "distance": 1,
   "panorama": "this.panorama_D2B55F8F_C067_A99F_41D9_2063000041BF"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -177.61,
   "backwardYaw": -178.37,
   "distance": 1,
   "panorama": "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2D713BE_C066_B981_419D_B54132CEDE54",
 "thumbnailUrl": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-1(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_0B758D8E_040F_8D35_418A_942714A0EE68",
  "this.overlay_14A88963_040C_F5F3_4187_FAA42094A21B",
  "this.overlay_1630AC68_0434_93FD_417B_91D501694458",
  "this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54_tcap0"
 ],
 "hfovMax": 130
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 117.5,
   "backwardYaw": -24.37,
   "distance": 1,
   "panorama": "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -75.12,
   "backwardYaw": 165.93,
   "distance": 1,
   "panorama": "this.panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35",
 "thumbnailUrl": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-8(utama)(1)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_13478D11_040C_8D2E_417E_4292C79EDA36",
  "this.overlay_19FC8E32_041C_8F52_4185_B6D2C4E8E453",
  "this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 155.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05564424_11B1_E3E3_4191_15BFD5CFAFF6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 29.36,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_078234E9_11B1_EC65_4146_7589026DD328"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.01,
   "backwardYaw": 172.34,
   "distance": 1,
   "panorama": "this.panorama_D108C978_C067_B681_41C6_59D59F2B78E7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 172.59,
   "backwardYaw": -1.76,
   "distance": 1,
   "panorama": "this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3",
 "thumbnailUrl": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_t.jpg",
 "hfovMin": "120%",
 "label": "p-1-2 (pintu masuk)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_EABEBC0A_F96C_929F_41EC_7B00094E891D",
  "this.overlay_ED4CBE30_F96C_8E8B_41E4_3625DC012DD9",
  "this.panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -43.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_044CA4CA_11B1_ECA7_41A8_3AF0755C7D2E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -8.04,
  "pitch": 6.53
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E19D88_C066_A981_41C3_751361EC61D1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_051473F6_11B1_E46F_41B1_3D90F6347112"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.24,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_04F93495_11B1_ECAD_41B1_06C703E54EF0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 83.41,
  "pitch": 1.51
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -12.06,
  "pitch": 6.28
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.48,
  "pitch": -4.27
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 156.89,
   "backwardYaw": -8.29,
   "distance": 1,
   "panorama": "this.panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -16.73,
   "backwardYaw": -166.96,
   "distance": 1,
   "panorama": "this.panorama_D108D923_C067_9680_41DF_FC7852981F40"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA",
 "thumbnailUrl": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_t.jpg",
 "hfovMin": "120%",
 "label": "p-6-1(pura)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_tcap0",
  "this.overlay_19638CAE_0DFC_65A5_41AB_4FEC40E4B5F2",
  "this.overlay_18AB0A6D_0DC4_2CA7_413D_DA51EEDDDFA0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.35,
  "pitch": -5.02
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -160.78,
   "backwardYaw": 76.12,
   "distance": 1,
   "panorama": "this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -8.29,
   "backwardYaw": 156.89,
   "distance": 1,
   "panorama": "this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC",
 "thumbnailUrl": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_t.jpg",
 "hfovMin": "120%",
 "label": "20261107_155804_491",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_DD44F8FF_F92C_F376_41E1_8878641BE076",
  "this.overlay_D97A96D5_F92D_9F8A_41DC_83A6D6A25486",
  "this.panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -7.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_062D22EA_11B1_E467_4187_D297D67B8285"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.36,
   "backwardYaw": -52.7,
   "distance": 1,
   "panorama": "this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F",
 "thumbnailUrl": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_t.jpg",
 "hfovMin": "120%",
 "label": "p-5(saren kelod)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_tcap0",
  "this.overlay_2FA79496_0E4C_2462_416F_AF1C997D6F8E",
  "this.overlay_2FE77043_0E4D_DCE3_41A5_3AE507686D2A"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 6.03,
   "backwardYaw": -85.16,
   "distance": 1,
   "panorama": "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D1097C7E_C065_AE81_413D_5F46F91C687C",
 "thumbnailUrl": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_t.jpg",
 "hfovMin": "120%",
 "label": "p-2-4(semanggen)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_D885774C_F92F_9E9A_41EC_A407DA79A3EC",
  "this.panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_064EB2F9_11B1_E465_41A2_E7B12EEB8E49"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -23.11,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05AC63A9_11B1_E4E5_41B1_2B5B4BB5F8C8"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -168.7,
   "backwardYaw": -80.89,
   "distance": 1,
   "panorama": "this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2B55F8F_C067_A99F_41D9_2063000041BF",
 "thumbnailUrl": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-2(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_1476C4DB_0433_BCD3_4183_65F1FC34D547",
  "this.panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_061372DB_11B1_E4A5_4190_269278A66240"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -150.64,
   "backwardYaw": -41.11,
   "distance": 1,
   "panorama": "this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D108C9A7_C065_698F_41E3_80422CEB50C5",
 "thumbnailUrl": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-16(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_tcap0",
  "this.overlay_17C63CD4_0DCB_E5E7_41A3_D689F4353256",
  "this.overlay_2EABBBD2_0E44_23FD_418B_0B3BBED2AB20"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.39,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05DA13C7_11B1_E4AD_4197_C0DF8F66BA2B"
},
{
 "class": "PhotoAlbum",
 "label": "Photo Album WhatsApp Image 2026-11-23 at 02.22.41 (2)",
 "id": "album_2C88C3EC_04F4_94F6_4179_5A5A7EACFC02",
 "thumbnailUrl": "media/album_2C88C3EC_04F4_94F6_4179_5A5A7EACFC02_t.png",
 "playList": "this.album_2C88C3EC_04F4_94F6_4179_5A5A7EACFC02_AlbumPlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_07B3851F_11B1_EDDD_41A0_CA8E8F90E47E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 12.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_042B04B3_11B1_ECE5_41AF_DA8ED954F478"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -63.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_059F1399_11B1_E4A5_41A2_BF9DBB2B74BB"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108C978_C067_B681_41C6_59D59F2B78E7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 0, 1)",
   "media": "this.panorama_D108C978_C067_B681_41C6_59D59F2B78E7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 1, 2)",
   "media": "this.panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 2, 3)",
   "media": "this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 3, 4)",
   "media": "this.panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D1093845_C065_B683_41D8_B045377D044B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 4, 5)",
   "media": "this.panorama_D1093845_C065_B683_41D8_B045377D044B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 5, 6)",
   "media": "this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 6, 7)",
   "media": "this.panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 7, 8)",
   "media": "this.panorama_D1097C7E_C065_AE81_413D_5F46F91C687C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 8, 9)",
   "media": "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 9, 10)",
   "media": "this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 10, 11)",
   "media": "this.panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 11, 12)",
   "media": "this.panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 12, 13)",
   "media": "this.panorama_D108D86A_C065_9681_41CF_C5D368F19D2C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 13, 14)",
   "media": "this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 14, 15)",
   "media": "this.panorama_D2B55F8F_C067_A99F_41D9_2063000041BF",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 15, 16)",
   "media": "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 16, 17)",
   "media": "this.panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 17, 18)",
   "media": "this.panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 18, 19)",
   "media": "this.panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 19, 20)",
   "media": "this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 20, 21)",
   "media": "this.panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 21, 22)",
   "media": "this.panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 22, 23)",
   "media": "this.panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 23, 24)",
   "media": "this.panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 24, 25)",
   "media": "this.panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 25, 26)",
   "media": "this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108D923_C067_9680_41DF_FC7852981F40_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 26, 27)",
   "media": "this.panorama_D108D923_C067_9680_41DF_FC7852981F40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 27, 28)",
   "media": "this.panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 28, 29)",
   "media": "this.panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 29, 30)",
   "media": "this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 30, 31)",
   "media": "this.panorama_D2E620BB_C067_9787_41D6_760F3A72B48E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 31, 32)",
   "media": "this.panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 32, 33)",
   "media": "this.panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 33, 34)",
   "media": "this.panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 34, 35)",
   "media": "this.panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 35, 36)",
   "media": "this.panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 36, 37)",
   "media": "this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 37, 38)",
   "media": "this.panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 38, 39)",
   "media": "this.panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 39, 40)",
   "media": "this.panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108C4B2_C065_9F81_4199_9036460AA92D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 40, 41)",
   "media": "this.panorama_D108C4B2_C065_9F81_4199_9036460AA92D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 41, 42)",
   "media": "this.panorama_D108C9A7_C065_698F_41E3_80422CEB50C5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 42, 43)",
   "media": "this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 43, 44)",
   "class": "PhotoAlbumPlayListItem",
   "media": "this.album_2C88C3EC_04F4_94F6_4179_5A5A7EACFC02",
   "player": "this.MainViewerPhotoAlbumPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 44, 45)",
   "class": "PhotoAlbumPlayListItem",
   "media": "this.album_2DBA9119_04F5_B55E_4187_CD1E62329602",
   "player": "this.MainViewerPhotoAlbumPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 45, 46)",
   "media": "this.panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist, 46, 0)",
   "media": "this.panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 172.09,
   "backwardYaw": 153.24,
   "distance": 1,
   "panorama": "this.panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 76.12,
   "backwardYaw": -160.78,
   "distance": 1,
   "panorama": "this.panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.76,
   "backwardYaw": 172.59,
   "distance": 1,
   "panorama": "this.panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F",
 "thumbnailUrl": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_t.jpg",
 "hfovMin": "120%",
 "label": "p-1-3(pintu masuk)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_EDC9D1ED_F96F_F595_41ED_10A653960888",
  "this.overlay_EE39033D_F96F_96F5_41D6_83CAB0E33EBA",
  "this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_tcap0",
  "this.overlay_28A47F6A_0E4C_64A2_4190_33C0CEFE1C5F"
 ],
 "hfovMax": 130
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 2.76,
   "backwardYaw": 3.01,
   "distance": 1,
   "panorama": "this.panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E",
 "thumbnailUrl": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-9(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_1D9192B2_0415_976D_4187_D47873EC7280",
  "this.overlay_1D47AA9E_0414_F755_4185_6D8BFC8280CC",
  "this.panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "FadeOutEffect",
 "duration": 700,
 "id": "effect_23D48BCA_0414_F53D_4144_8273E5F3AA86",
 "easing": "linear"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 127.3,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_04CD0478_11B1_EC63_4198_0A67618BCD93"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.16,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0495B452_11B1_E3A7_4185_AD79B5F1EC38"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 86.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05F483DF_11B1_E45D_4197_24A4228B74C6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.74,
  "pitch": -3.01
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 13.82,
  "pitch": 1.51
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 5.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_07747277_11B1_E46D_41A6_EB150660A2FE"
},
{
 "class": "PanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.86,
  "pitch": -3.27
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2D713BE_C066_B981_419D_B54132CEDE54_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.61,
  "pitch": -7.03
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0569D434_11B1_E3E3_41A7_41C8E81602F2"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -166.96,
   "backwardYaw": -16.73,
   "distance": 1,
   "panorama": "this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 146.71,
   "backwardYaw": -16.73,
   "distance": 1,
   "panorama": "this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.51,
   "backwardYaw": -167.06,
   "distance": 1,
   "panorama": "this.panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D108D923_C067_9680_41DF_FC7852981F40",
 "thumbnailUrl": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_t.jpg",
 "hfovMin": "120%",
 "label": "20261107_155750_510",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D108D923_C067_9680_41DF_FC7852981F40_tcap0",
  "this.overlay_18229008_0DC4_5C6D_4180_674402B583DA",
  "this.overlay_15DC66FB_0DDC_25A2_41A7_8675B5160B19",
  "this.overlay_10D8EC19_0DC4_646E_4175_218BD4C73F94"
 ],
 "hfovMax": 130
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 13.82,
   "backwardYaw": 176.73,
   "distance": 1,
   "panorama": "this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -85.16,
   "backwardYaw": 6.03,
   "distance": 1,
   "panorama": "this.panorama_D1097C7E_C065_AE81_413D_5F46F91C687C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -167.56,
   "backwardYaw": 172.09,
   "distance": 1,
   "panorama": "this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 116.82,
   "backwardYaw": -171.84,
   "distance": 1,
   "panorama": "this.panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64",
 "thumbnailUrl": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_t.jpg",
 "hfovMin": "120%",
 "label": "p-2-5(semanggen)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_E5DD6573_F954_B28E_41CB_1D259D070585",
  "this.overlay_D97E9389_F955_759D_41E5_FCF0B4C3CD47",
  "this.overlay_E7F3295D_F955_92BA_41EB_C667BACF274D",
  "this.overlay_E7B88795_F953_9DB5_41EC_3B3498137A90",
  "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "Panorama",
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_t.jpg"
  }
 ],
 "label": "p-5-1(saren kelod)",
 "id": "panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4",
 "thumbnailUrl": "media/panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_t.jpg",
 "hfovMin": "120%",
 "pitch": 0,
 "overlays": [
  "this.panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_tcap0"
 ],
 "hfov": 360,
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05289406_11B1_E3AF_41A3_02400869EA23"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -178.37,
   "backwardYaw": -177.61,
   "distance": 1,
   "panorama": "this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 28.51,
   "backwardYaw": -167.31,
   "distance": 1,
   "panorama": "this.panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -24.37,
   "backwardYaw": 117.5,
   "distance": 1,
   "panorama": "this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 95.46,
   "backwardYaw": -93.45,
   "distance": 1,
   "panorama": "this.panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93",
 "thumbnailUrl": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-3(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_158E9E2B_0437_8F73_4182_EEEC3B037B82",
  "this.overlay_1705CDD5_0435_8CD7_418F_26FE481B56F5",
  "this.overlay_13488654_040D_9FD6_416F_62A4D08C4900",
  "this.overlay_1C612F59_040C_8DDF_4137_12218C65B082",
  "this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PhotoAlbum",
 "label": "Photo Album WhatsApp Image 2026-11-23 at 02.22.41",
 "id": "album_2DBA9119_04F5_B55E_4187_CD1E62329602",
 "thumbnailUrl": "media/album_2DBA9119_04F5_B55E_4187_CD1E62329602_t.png",
 "playList": "this.album_2DBA9119_04F5_B55E_4187_CD1E62329602_AlbumPlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_048E644B_11B1_E3A5_419A_273931749D39"
},
{
 "class": "FadeInEffect",
 "duration": 700,
 "id": "effect_236CDAC4_0414_9735_418F_D86C1A91D85E",
 "easing": "linear"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -16.08,
   "backwardYaw": -156.01,
   "distance": 1,
   "panorama": "this.panorama_D1093845_C065_B683_41D8_B045377D044B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 153.24,
   "backwardYaw": 172.09,
   "distance": 1,
   "panorama": "this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4",
 "thumbnailUrl": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_t.jpg",
 "hfovMin": "120%",
 "label": "P1-4(pintu masuk)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_EC03BE7B_F96C_8F7D_41D9_C403E6ED7D69",
  "this.overlay_E11AC7E0_F96D_9D8B_41B8_A564536D4916",
  "this.panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_tcap0"
 ],
 "hfovMax": 130
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -178.24,
   "backwardYaw": 176.11,
   "distance": 1,
   "panorama": "this.panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 3.01,
   "backwardYaw": 2.76,
   "distance": 1,
   "panorama": "this.panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA",
 "thumbnailUrl": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_t.jpg",
 "hfovMin": "120%",
 "label": "p-3-10(utama)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_1D6AEB57_0417_B5D3_4183_1E3091A6E462",
  "this.panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_tcap0",
  "this.overlay_270F9B50_0E7C_ECFE_41AA_9DC1BD636BDA"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 12.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_06CB32B4_11B1_E4E3_41B1_5CC251C46C5B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -50.75,
   "backwardYaw": 136.59,
   "distance": 1,
   "panorama": "this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339",
 "thumbnailUrl": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_t.jpg",
 "hfovMin": "120%",
 "label": "6-4-sarenkelod",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_2A178874_0E44_6CA5_41A0_C07D0115CD31",
  "this.overlay_2A5996F6_0E44_65A5_417A_765F38A1DA36"
 ],
 "hfovMax": 130
},
{
 "class": "Photo",
 "duration": 5000,
 "id": "album_1A881DB1_114E_9CE5_418E_3A5430061F8A",
 "width": 781,
 "label": "WhatsApp Image 2026-11-23 at 02.22.41",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_1A881DB1_114E_9CE5_418E_3A5430061F8A.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 719
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -7.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_053D1415_11B1_E3AD_41A7_AC5810F20171"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_04A0745A_11B1_E3A7_41B0_7FE0552C48CF"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -172.09,
   "backwardYaw": 0.25,
   "distance": 1,
   "panorama": "this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC",
 "thumbnailUrl": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_t.jpg",
 "hfovMin": "120%",
 "label": "p-6-2(pura)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_tcap0",
  "this.overlay_27E6EDE7_0E44_67A2_41AB_6E1036D59CA5"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -169.32,
  "pitch": -2.76
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0483F443_11B1_E3A5_41A5_53C6A0E980E9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_04E45486_11B1_ECAF_41A4_287B4433137C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.61,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_06BC62AD_11B1_E4FD_41A8_8F6BDEBFC88B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -7.29,
   "backwardYaw": -170.83,
   "distance": 1,
   "panorama": "this.panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 172.09,
   "backwardYaw": -167.56,
   "distance": 1,
   "panorama": "this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D2E19D88_C066_A981_41C3_751361EC61D1",
 "thumbnailUrl": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_t.jpg",
 "hfovMin": "120%",
 "label": "p-2-6(semanggen)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_DA2D461F_F9D3_9EB6_41BB_37911CBA1498",
  "this.overlay_DDA7966B_F9DC_BE9E_41E2_329946F17194",
  "this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1_tcap0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.71,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_05C023B8_11B1_E4E3_4172_71B1F05EA8F9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 99.11,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0458C4D2_11B1_ECA7_41AD_C717878FAA97"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.5,
   "backwardYaw": -171.84,
   "distance": 1,
   "panorama": "this.panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.11,
   "backwardYaw": -178.24,
   "distance": 1,
   "panorama": "this.panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6",
 "thumbnailUrl": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_t.jpg",
 "hfovMin": "120%",
 "label": "p-4(area merajan)",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_t.jpg"
  }
 ],
 "overlays": [
  "this.panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_tcap0",
  "this.overlay_102F353C_0DC4_24A6_41A1_97789DE31088",
  "this.overlay_10332073_0E3C_3CA2_41A9_AEDE174370E0"
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 6.03
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "targetYaw": 0,
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 3.22,
    "path": "shortest",
    "targetPitch": 0,
    "easing": "cubic_in_out",
    "pitchSpeed": 2.11
   },
   {
    "targetYaw": 47.36,
    "class": "TargetPanoramaCameraMovement",
    "yawSpeed": 33.25,
    "path": "shortest",
    "targetPitch": -30.84,
    "easing": "cubic_in_out",
    "pitchSpeed": 17.05
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_04AFA461_11B1_EC65_41AB_4DFE0F27B512"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_04F2B48E_11B1_ECBF_41A0_F7E12D0127A2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -7.66,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -34.42,
  "pitch": 2.26
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_06B6F2A5_11B1_E4ED_41A4_A74815E5920F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_079A94F8_11B1_EC63_417B_6ABECD1617A4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -134.78,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_0405249D_11B1_ECDD_4171_975EEACA69DC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19.22,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_061D12E2_11B1_E467_41A1_12983EBD27D5"
},
{
 "transitionDuration": 500,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "paddingBottom": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "borderSize": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 }
},
{
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_270E7C0C_0434_9335_418B_F7861C47E08A",
 "left": "0.83%",
 "horizontalAlign": "left",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.IconButton_26177B59_0434_95DF_414F_E7244A19A0B5"
 ],
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "top": "21.68%",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "35.707%",
 "click": "if(!this.Container_270E7C0C_0434_9335_418B_F7861C47E08A.get('visible')){ this.setComponentVisibility(this.Container_270E7C0C_0434_9335_418B_F7861C47E08A, true, 0, this.effect_23D3EBCA_0414_F53D_4164_86C47DC18DFF, 'showEffect', false) } else { this.setComponentVisibility(this.Container_270E7C0C_0434_9335_418B_F7861C47E08A, false, 0, this.effect_23D48BCA_0414_F53D_4144_8273E5F3AA86, 'hideEffect', false) }; if(!this.IconButton_26177B59_0434_95DF_414F_E7244A19A0B5.get('visible')){ this.setComponentVisibility(this.IconButton_26177B59_0434_95DF_414F_E7244A19A0B5, true, 0, this.effect_23D3EBCA_0414_F53D_4164_86C47DC18DFF, 'showEffect', false) } else { this.setComponentVisibility(this.IconButton_26177B59_0434_95DF_414F_E7244A19A0B5, false, 0, this.effect_23D48BCA_0414_F53D_4144_8273E5F3AA86, 'hideEffect', false) }",
 "backgroundOpacity": 0.3,
 "shadow": false,
 "class": "Container",
 "borderRadius": 0,
 "visible": false,
 "paddingTop": 0,
 "data": {
  "name": "Container60099"
 },
 "overflow": "scroll",
 "gap": 10,
 "width": "3.498%"
},
{
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_222AB707_0415_9D33_417A_EBEDE3FBF508",
 "left": "0%",
 "horizontalAlign": "left",
 "propagateClick": true,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.Container_222A1707_0415_9D33_4191_1D948113A53F",
  "this.IconButton_23C0B275_0415_77D7_4191_A1AB84AE3952"
 ],
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "top": "0%",
 "paddingBottom": 0,
 "layout": "absolute",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "scrollBarMargin": 2,
 "click": "this.setComponentVisibility(this.Container_222AB707_0415_9D33_417A_EBEDE3FBF508, false, 0, this.effect_23D8828B_0414_9732_4186_DB0AE83B349F, 'hideEffect', false)",
 "backgroundOpacity": 0.6,
 "shadow": false,
 "class": "Container",
 "borderRadius": 0,
 "visible": false,
 "paddingTop": 0,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll",
 "gap": 10
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "id": "IconButton_26177B59_0434_95DF_414F_E7244A19A0B5",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "12.59%",
 "width": 40,
 "minHeight": 0,
 "borderSize": 0,
 "minWidth": 0,
 "mode": "toggle",
 "paddingBottom": 0,
 "height": 40,
 "iconURL": "skin/IconButton_26177B59_0434_95DF_414F_E7244A19A0B5.png",
 "top": "8.49%",
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_26177B59_0434_95DF_414F_E7244A19A0B5_rollover.png",
 "backgroundOpacity": 0,
 "shadow": false,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_26177B59_0434_95DF_414F_E7244A19A0B5_pressed.png",
 "visible": false,
 "paddingTop": 0,
 "data": {
  "name": "Button34604"
 },
 "cursor": "hand"
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F, this.camera_052323FE_11B1_E45F_418C_9ABCD82228E8); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065A32EB_1151_6465_418F_92C09A4448C0",
   "pitch": -8.98,
   "yaw": 6.03,
   "hfov": 13.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_15654F84_0DDC_6466_41A0_E4BD4FA0EDBF",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.03,
   "hfov": 13.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -8.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D108D923_C067_9680_41DF_FC7852981F40, this.camera_05289406_11B1_E3AF_41A3_02400869EA23); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065B82EB_1151_6465_4194_44A37BDC94D1",
   "pitch": -28.07,
   "yaw": -167.06,
   "hfov": 12.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1483CF5D_0DDC_24E7_419B_395F5446C210",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.06,
   "hfov": 12.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -28.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066422DE_1151_645F_4191_6B3FECB18104",
   "pitch": -20.03,
   "yaw": 158.39,
   "hfov": 12.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1E7555DE_041C_BCD5_4184_3F3BFB37171D",
 "data": {
  "label": "Circle 02a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.39,
   "hfov": 12.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -20.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3, this.camera_026DB35C_11B1_E5A3_41A2_50204D8FB04C); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0665B2DE_1151_645F_4192_40D951318BC4",
   "pitch": -21.29,
   "yaw": -1.26,
   "hfov": 12.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1EB43F82_041D_8D2D_417D_FCDE3234FA74",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.26,
   "hfov": 12.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -21.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD, this.camera_0277A363_11B1_E465_4199_49A79973180A); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066502DF_1151_645D_41AA_7BFEBCE26E5F",
   "pitch": -31.84,
   "yaw": -173.09,
   "hfov": 11.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_18E63BD5_041D_94D6_4158_737610052A10",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -173.09,
   "hfov": 11.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -31.84
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B, this.camera_0696928E_11B1_E4BF_418D_6BBAA09E55AE); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065772F1_1151_6465_41AD_8CDEB292154D",
   "pitch": -23.3,
   "yaw": -95.34,
   "hfov": 13.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2E5A5831_0E3C_2CBE_4183_BF97BCB0D678",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -95.34,
   "hfov": 13.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -23.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64, this.camera_059F1399_11B1_E4A5_41A2_BF9DBB2B74BB); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066FD2D3_1151_64A5_41AB_55931F27C4D8",
   "pitch": -14.75,
   "yaw": -171.84,
   "hfov": 13.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_0B298950_0414_B52E_4181_63FDF851197F",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.84,
   "hfov": 13.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -14.75
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265, this.camera_06E1D2C4_11B1_E4A3_41AC_9AE5D25A8285); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067272CD_1151_64BD_419E_CD7D519CA5F3",
   "pitch": -11.49,
   "yaw": -14.32,
   "hfov": 13.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E391AC6E_F95C_B297_41C2_70AE641BB1DA",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.32,
   "hfov": 13.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -11.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4, this.camera_06D7A2BC_11B1_E4E3_4188_F32EDB6F92A0); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0673D2CD_1151_64BD_4174_87F6511FF758",
   "pitch": -25.31,
   "yaw": -156.01,
   "hfov": 12.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E0DB9C39_F95C_92FA_4187_71D01DFEDAD0",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -156.01,
   "hfov": 12.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -25.31
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D1093845_C065_B683_41D8_B045377D044B_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7, this.camera_064EB2F9_11B1_E465_41A2_E7B12EEB8E49); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066872D8_1151_64A3_4184_A4FF40B040A7",
   "pitch": -29.58,
   "yaw": 45.22,
   "hfov": 12.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_100F598B_043C_F532_4187_B080CE379077",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 45.22,
   "hfov": 12.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -29.58
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93, this.camera_063CF2F2_11B1_E467_4195_94C6BAB7E0C2); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0669C2D9_1151_64A5_41AB_55456726A680",
   "pitch": -25.81,
   "yaw": -93.45,
   "hfov": 12.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2C06BEF1_04F4_8CEE_4188_7DCE60DE370D",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -93.45,
   "hfov": 12.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -25.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1, this.camera_07747277_11B1_E46D_41A6_EB150660A2FE); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066292DF_1151_645D_4172_3F0CF8A8AF49",
   "pitch": -32.85,
   "yaw": -52.25,
   "hfov": 13.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1B167774_0415_7DD5_418D_4BB9A27D529A",
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -52.25,
   "hfov": 13.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -32.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B, this.camera_0682827F_11B1_E45D_419C_B8D888949669); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066202E0_1151_6463_41AE_60F04AF250D5",
   "pitch": -31.59,
   "yaw": -174.1,
   "hfov": 11.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1999FEA4_0417_8F76_4128_27B62FA08410",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -174.1,
   "hfov": 11.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -31.59
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD, this.camera_05898383_11B1_E4A5_414D_2CA99603D68D); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065F42E6_1151_646F_419D_72B6A523DD1C",
   "pitch": -18.28,
   "yaw": 63.81,
   "hfov": 13.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_108EC08A_0E3C_3C62_41A1_D3977CA89540",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 63.81,
   "hfov": 13.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -18.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6, this.camera_0590D38A_11B1_E4A7_417B_B4A572FDC92C); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065CC2E6_1151_646F_4190_C354C359C1F4",
   "pitch": -25.06,
   "yaw": -171.84,
   "hfov": 12.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2F141B46_0E3C_2CE2_41A7_BC610F935E41",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.84,
   "hfov": 12.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -25.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D108D86A_C065_9681_41CF_C5D368F19D2C, this.camera_043694BB_11B1_ECE5_4189_B809771B5D7B); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 290,
      "height": 290
     }
    ]
   },
   "pitch": 4.33,
   "yaw": 2.39,
   "hfov": 13.03
  }
 ],
 "id": "overlay_DAF9B1FF_F9DD_9576_41EB_D1B8356C5B8D",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.39,
   "hfov": 13.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1, this.camera_044384C3_11B1_ECA5_41A5_330B1EE2A5EE); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066CB2D3_1151_64A5_41A6_84F4EAF04FFD",
   "pitch": -29.58,
   "yaw": -170.83,
   "hfov": 12.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DA2EAF05_F9DD_8E95_41B7_19785D32239A",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.83,
   "hfov": 12.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -29.58
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092, this.camera_0603D2D3_11B1_E4A5_419F_FF6E3CB5A1FF); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065B12EC_1151_6463_41A0_3066AB8C4DB4",
   "pitch": -12.5,
   "yaw": 1,
   "hfov": 13.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1A17C948_0414_953D_416F_8C691619CB98",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1,
   "hfov": 13.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -12.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3, this.camera_06F172CB_11B1_E4A5_41A4_1DAA8D81330B); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0658B2EC_1151_6463_41A5_0E950FBD4A37",
   "pitch": -26.19,
   "yaw": -174.6,
   "hfov": 13.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1A9B706C_0415_93F5_418A_4C0E5407AD8E",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -174.6,
   "hfov": 13.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -26.19
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91, this.camera_041054A5_11B1_ECED_417B_BC3372BD1451); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066922D9_1151_64A5_41B0_F8F53BF4740E",
   "pitch": -41.64,
   "yaw": -14.57,
   "hfov": 10.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_113C04DD_043C_9CD7_418F_48ED11E12468",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.57,
   "hfov": 10.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -41.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0, this.camera_0405249D_11B1_ECDD_4171_975EEACA69DC); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066682D9_1151_64A5_4153_8ADA417DBB1D",
   "pitch": -24.81,
   "yaw": -171.96,
   "hfov": 12.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_11498A91_043C_972E_418F_1CE02E651DEB",
 "data": {
  "label": "Circle 02a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.96,
   "hfov": 12.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -24.81
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1093845_C065_B683_41D8_B045377D044B, this.camera_051473F6_11B1_E46F_41B1_3D90F6347112); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067352CE_1151_64BF_41A1_047E6CFBDE9C",
   "pitch": -14.26,
   "yaw": 24.62,
   "hfov": 13.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E543D7CB_F95C_9D9D_41D2_FE3D6F24E96C",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 24.62,
   "hfov": 13.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -14.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067092CE_1151_64BF_419A_67BEA131F4D0",
   "pitch": -17.01,
   "yaw": 176.73,
   "hfov": 12.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E2F59EAB_F95C_8F9E_41ED_AD5D8A771EEE",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.73,
   "hfov": 12.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -17.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0670E2CF_1151_64BD_41A0_EC0B653E8525",
   "pitch": -10.74,
   "yaw": -158.02,
   "hfov": 12.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E2A8E557_F95C_92B6_41E4_AE84670DD82E",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.02,
   "hfov": 12.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -10.74
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F, this.camera_050393E6_11B1_E46F_41A7_2DF30B779FA5); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067072CF_1151_64BD_4181_C2F06DC2739B",
   "pitch": -12.85,
   "yaw": -52.7,
   "hfov": 21.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2F3EB5C0_0E44_27DE_418F_48C2625762FC",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -52.7,
   "hfov": 21.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -12.85
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092, this.camera_079A94F8_11B1_EC63_417B_6ABECD1617A4); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065C42E7_1151_646D_41A7_AA7F96B597FE",
   "pitch": -2.58,
   "yaw": -179.87,
   "hfov": 11.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2469B1BA_0E44_3FAD_4190_74B14744ABF8",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -179.87,
   "hfov": 11.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383, this.camera_07B3851F_11B1_EDDD_41A0_CA8E8F90E47E); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065DC2E8_1151_6463_41A9_4FC457806555",
   "pitch": -13.5,
   "yaw": -116.06,
   "hfov": 15.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_221E4763_0E44_64A2_41A2_3CB377767B2F",
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -116.06,
   "hfov": 15.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -13.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC, this.camera_07A45511_11B1_EDA5_41AF_47591BD85229); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065D22E8_1151_6463_41AC_33391DC362D4",
   "pitch": -8.98,
   "yaw": 0.25,
   "hfov": 13.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_208A0293_0E4C_7C62_41AA_A2C4F56B41B7",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.25,
   "hfov": 13.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -8.98
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F, this.camera_047174E1_11B1_EC65_41B0_DA94C5A63C32); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065822ED_1151_647D_41AA_57177FB11E31",
   "pitch": -14.88,
   "yaw": 1.51,
   "hfov": 14.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_14991F4B_0DC4_24E2_41A2_B4EAA8310A38",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.51,
   "hfov": 14.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -14.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1, this.camera_0465C4D9_11B1_ECA5_41A8_A8F28CBB0445); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0659B2EE_1151_647F_4181_C8086A92CE0E",
   "pitch": -32.13,
   "yaw": 171.71,
   "hfov": 14.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_146988DB_0DC5_EDE2_41AA_3F1E591C4CB5",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 171.71,
   "hfov": 14.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -32.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D108C9A7_C065_698F_41E3_80422CEB50C5, this.camera_078234E9_11B1_EC65_4146_7589026DD328); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065922EE_1151_647F_4191_C96DDCD3AF8F",
   "pitch": -27.32,
   "yaw": -41.11,
   "hfov": 17.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2E7A5F8B_0E44_2463_41A4_F52741F90EF3",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -41.11,
   "hfov": 17.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -27.32
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35, this.camera_0577A43B_11B1_E3E5_41AF_DDF84B9DE9F1); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0663A2E1_1151_6465_4198_89E535A7417C",
   "pitch": -33.22,
   "yaw": 165.93,
   "hfov": 13.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C286040_0DC4_3CDD_4199_CD8025C5DE86",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 165.93,
   "hfov": 13.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -33.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B, this.camera_0483F443_11B1_E3A5_41A5_53C6A0E980E9); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066322E1_1151_6465_419E_D7DADCDD0A29",
   "pitch": -23.8,
   "yaw": 76.87,
   "hfov": 12.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_19B847F9_0DFC_23AE_4199_0C48659D547B",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.87,
   "hfov": 12.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -23.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD, this.camera_04E45486_11B1_ECAF_41A4_287B4433137C); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 374,
      "height": 279
     }
    ]
   },
   "pitch": -0.44,
   "yaw": 176.36,
   "hfov": 16.83
  }
 ],
 "id": "overlay_DD9402A4_F9D3_978B_41E9_29477C051915",
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.36,
   "hfov": 16.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 21,
      "height": 16
     }
    ]
   },
   "pitch": -0.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066C42D4_1151_64A3_4192_0932538FC81F",
   "pitch": -38,
   "yaw": 1.26,
   "hfov": 12.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_0BCC1D74_040D_8DD6_418E_C1AC612F07FE",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.26,
   "hfov": 12.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -38
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D108C4B2_C065_9F81_4199_9036460AA92D_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221, this.camera_048E644B_11B1_E3A5_419A_273931749D39); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065412F1_1151_6465_415F_8AA6FCA7B16D",
   "pitch": -22.19,
   "yaw": 171.71,
   "hfov": 17.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2A2E9F28_0E44_E4AE_419E_13CBBCA5069D",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 171.71,
   "hfov": 17.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -22.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7, this.camera_0569D434_11B1_E3E3_41A7_41C8E81602F2); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066602DA_1151_64A7_41A9_22BABF741513",
   "pitch": -37.37,
   "yaw": -171.08,
   "hfov": 16.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_11B959A3_0433_9572_4188_DF0D537A9B89",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.08,
   "hfov": 16.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -37.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 198,
      "height": 167
     }
    ]
   },
   "pitch": 19.41,
   "yaw": -14.01,
   "hfov": 8.41
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12385E4E_0434_8F35_4177_788577BDD505",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.01,
   "hfov": 8.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": 19.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_1_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 198,
      "height": 167
     }
    ]
   },
   "pitch": 20.91,
   "yaw": 16.14,
   "hfov": 8.33
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1285F92A_040C_9572_4164_3A7EC86FC0CC",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 16.14,
   "hfov": 8.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": 20.91
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3, this.camera_0548C41D_11B1_E3DD_4198_C696F9B293D7); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0677E2C8_1151_64A4_41A6_48687A7FFE4C",
   "pitch": -14.12,
   "yaw": 172.34,
   "hfov": 12.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EBC911DF_F96C_95B5_41E8_1613ADE898FD",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 172.34,
   "hfov": 12.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -14.12
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0",
 "hfov": 22.5,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0656D2EF_1151_647D_41A7_8C89AB8B98BC",
   "pitch": -36.87,
   "yaw": -3.27,
   "hfov": 11.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1722C74E_0DCC_E4E5_4197_701FC2E8B4EA",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.27,
   "hfov": 11.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -36.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93, this.camera_04D9747F_11B1_EC5D_41A1_2B436DF54DB2); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065632EF_1151_647D_4197_52E4F63A62BF",
   "pitch": -26.06,
   "yaw": -167.31,
   "hfov": 12.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_16902DDC_0DCD_E7E5_41AB_B05F838FCD33",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.31,
   "hfov": 12.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -26.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_0671D2CF_1151_64BD_4184_6B052E00BFBA",
   "pitch": -12.75,
   "yaw": 83.15,
   "hfov": 13.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E5370891_F953_F38A_41EA_FDCC877568DA",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 83.15,
   "hfov": 13.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -12.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067102D0_1151_64A3_41B0_48D3339E8B1B",
   "pitch": -20.66,
   "yaw": 138.05,
   "hfov": 15.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_E20A3571_F955_F28A_41E3_5B7DFF53C8CB",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 138.05,
   "hfov": 15.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -20.66
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_0650A2F6_1151_646F_4190_E06018320304",
   "pitch": 1.79,
   "yaw": 4.77,
   "hfov": 13.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_018379AB_1173_A4E5_4193_8C4506D6FDD6",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.77,
   "hfov": 13.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_065002F6_1151_646F_4184_E87C8A9DD3C5",
   "pitch": -18.05,
   "yaw": -171.34,
   "hfov": 18.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_025D7758_1172_ADA3_4184_AAED0494E063",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.34,
   "hfov": 18.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -18.05
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E620BB_C067_9787_41D6_760F3A72B48E_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D108C4B2_C065_9F81_4199_9036460AA92D, this.camera_06ABD29E_11B1_E4DF_41A9_5DC4917E990A); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0652A2F3_1151_6465_41AC_AF341778D2F6",
   "pitch": -18.53,
   "yaw": -0.5,
   "hfov": 13.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2D8B4FD0_0E5C_23FD_416B_FEC902D3A958",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.5,
   "hfov": 13.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -18.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339, this.camera_069DA296_11B1_E4AF_41AD_05C7D70785BC); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065252F4_1151_6463_4190_91007BE65817",
   "pitch": -14.38,
   "yaw": 136.59,
   "hfov": 23.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2A5F7403_0E5F_E462_41A2_023E25200D74",
 "data": {
  "label": "Circle 02b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.59,
   "hfov": 23.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -14.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066DD2D5_1151_64AD_41AE_238E8028E84F",
   "pitch": -23.8,
   "yaw": -0.5,
   "hfov": 12.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_0B758D8E_040F_8D35_418A_942714A0EE68",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.5,
   "hfov": 12.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -23.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2B55F8F_C067_A99F_41D9_2063000041BF, this.camera_0278C36B_11B1_E465_41A0_F345F2CD9DBC); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066D32D5_1151_64AD_41AE_128CB66D35E4",
   "pitch": -31.47,
   "yaw": -80.89,
   "hfov": 13.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_14A88963_040C_F5F3_4187_FAA42094A21B",
 "data": {
  "label": "Circle 02a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -80.89,
   "hfov": 13.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -31.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93, this.camera_0582F374_11B1_E463_4171_163ECD66AB7E); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066D62D5_1151_64AD_419F_17981503A723",
   "pitch": -20.79,
   "yaw": -177.61,
   "hfov": 12.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1630AC68_0434_93FD_417B_91D501694458",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.61,
   "hfov": 12.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -20.79
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2D713BE_C066_B981_419D_B54132CEDE54_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93, this.camera_05564424_11B1_E3E3_4191_15BFD5CFAFF6); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0667C2DB_1151_64A5_41AB_A32879A797E4",
   "pitch": -17.77,
   "yaw": 117.5,
   "hfov": 13.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_13478D11_040C_8D2E_417E_4292C79EDA36",
 "data": {
  "label": "Circle 02b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 117.5,
   "hfov": 13.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -17.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD, this.camera_055DD42C_11B1_E3E3_41A6_F8856A3AA2BD); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066742DB_1151_64A5_41AB_0DAB5E0836B9",
   "pitch": -17.52,
   "yaw": -75.12,
   "hfov": 13.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_19FC8E32_041C_8F52_4185_B6D2C4E8E453",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -75.12,
   "hfov": 13.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -17.52
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F, this.camera_04F93495_11B1_ECAD_41B1_06C703E54EF0); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0674D2CA_1151_64A7_41A9_E1EF20D2653F",
   "pitch": -17.28,
   "yaw": 172.59,
   "hfov": 14.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EABEBC0A_F96C_929F_41EC_7B00094E891D",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 172.59,
   "hfov": 14.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -17.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D108C978_C067_B681_41C6_59D59F2B78E7, this.camera_04F2B48E_11B1_ECBF_41A0_F7E12D0127A2); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067432CB_1151_64A5_41AD_003F2B9B8560",
   "pitch": -27.07,
   "yaw": -2.01,
   "hfov": 12.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ED4CBE30_F96C_8E8B_41E4_3625DC012DD9",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.01,
   "hfov": 12.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -27.07
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D108D923_C067_9680_41DF_FC7852981F40, this.camera_05CFD3BF_11B1_E4DC_41A3_D0DB1B296672); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066082E2_1151_6467_41B1_3DF87623D9AA",
   "pitch": 6.11,
   "yaw": -16.73,
   "hfov": 8.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_19638CAE_0DFC_65A5_41AB_4FEC40E4B5F2",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -16.73,
   "hfov": 8.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 6.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC, this.camera_05C023B8_11B1_E4E3_4172_71B1F05EA8F9); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066012E2_1151_6467_41AF_71FF303E70BC",
   "pitch": -34.74,
   "yaw": 156.89,
   "hfov": 14.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_18AB0A6D_0DC4_2CA7_413D_DA51EEDDDFA0",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 156.89,
   "hfov": 14.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -34.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F, this.camera_05A6B3A1_11B1_E4E5_41AF_DBF9CB44380C); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065792F0_1151_6463_4181_A5088C0C279F",
   "pitch": -27.57,
   "yaw": -160.78,
   "hfov": 12.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DD44F8FF_F92C_F376_41E1_8878641BE076",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.78,
   "hfov": 12.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -27.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA, this.camera_05AC63A9_11B1_E4E5_41B1_2B5B4BB5F8C8); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0657D2F0_1151_6463_41AF_DB69CB0170D4",
   "pitch": -14.76,
   "yaw": -8.29,
   "hfov": 13.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D97A96D5_F92D_9F8A_41DC_83A6D6A25486",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -8.29,
   "hfov": 13.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -14.76
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265, this.camera_04CD0478_11B1_EC63_4198_0A67618BCD93); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065AE2E9_1151_6465_41B0_C33B52C7C85A",
   "pitch": 10.74,
   "yaw": 176.36,
   "hfov": 9.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FA79496_0E4C_2462_416F_AF1C997D6F8E",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.36,
   "hfov": 9.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 10.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065A42E9_1151_6465_4180_6E2A1ADBD036",
   "pitch": -21.79,
   "yaw": -0.63,
   "hfov": 14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2FE77043_0E4D_DCE3_41A5_3AE507686D2A",
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.63,
   "hfov": 14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -21.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64, this.camera_0587337B_11B1_E465_4192_1CE5E165316C); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067162D0_1151_64A3_4195_65DDE297C105",
   "pitch": -16.77,
   "yaw": 6.03,
   "hfov": 13.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D885774C_F92F_9E9A_41EC_A407DA79A3EC",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.03,
   "hfov": 13.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -16.77
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54, this.camera_0458C4D2_11B1_ECA7_41AD_C717878FAA97); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066A12D6_1151_64AF_41AA_7AB6C786E299",
   "pitch": -30.33,
   "yaw": -168.7,
   "hfov": 11.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1476C4DB_0433_BCD3_4183_65F1FC34D547",
 "data": {
  "label": "Circle 02a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -168.7,
   "hfov": 11.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -30.33
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0655B2F2_1151_6467_41B1_5C15657D6673",
   "pitch": -9.23,
   "yaw": 175.85,
   "hfov": 18.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_17C63CD4_0DCB_E5E7_41A3_D689F4353256",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.85,
   "hfov": 18.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -9.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092, this.camera_05BAB3B0_11B1_E4E3_41A5_2CCA84478AF3); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065522F3_1151_6465_41A0_A21786EF31A8",
   "pitch": -31.59,
   "yaw": -150.64,
   "hfov": 20.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2EABBBD2_0E44_23FD_418B_0B3BBED2AB20",
 "data": {
  "label": "Circle 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -150.64,
   "hfov": 20.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -31.59
  }
 ]
},
{
 "class": "PhotoPlayList",
 "items": [
  {
   "camera": {
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "targetPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.46",
     "y": "0.28",
     "zoomFactor": 1.1
    },
    "initialPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.50",
     "y": "0.50",
     "zoomFactor": 1
    },
    "duration": 5000,
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_1CCB2068_114E_A462_4198_E7C329F35FB0"
  }
 ],
 "id": "album_2C88C3EC_04F4_94F6_4179_5A5A7EACFC02_AlbumPlayList"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3, this.camera_062D22EA_11B1_E467_4187_D297D67B8285); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067582CB_1151_64A5_4189_42CF91F7526B",
   "pitch": -23.3,
   "yaw": -1.76,
   "hfov": 12.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EDC9D1ED_F96F_F595_41ED_10A653960888",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.76,
   "hfov": 12.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -23.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4, this.camera_061372DB_11B1_E4A5_4190_269278A66240); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0675D2CC_1151_64A3_4192_04C9291381AE",
   "pitch": -20.41,
   "yaw": 172.09,
   "hfov": 14.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EE39033D_F96F_96F5_41D6_83CAB0E33EBA",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 172.09,
   "hfov": 14.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -20.41
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC, this.camera_061D12E2_11B1_E467_41A1_12983EBD27D5); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067552CC_1151_64A3_41AC_23B0E05EDB4E",
   "pitch": -22.55,
   "yaw": 76.12,
   "hfov": 12.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_28A47F6A_0E4C_64A2_4190_33C0CEFE1C5F",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.12,
   "hfov": 12.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -22.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0664D2DC_1151_64A3_4159_9B32EFCAF6FE",
   "pitch": -26.82,
   "yaw": -175.1,
   "hfov": 12.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D9192B2_0415_976D_4187_D47873EC7280",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.1,
   "hfov": 12.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -26.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA, this.camera_078E54F0_11B1_EC63_41A8_12727E6F4FAA); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066422DC_1151_64A3_4185_DCFE5FD90D20",
   "pitch": -22.55,
   "yaw": 2.76,
   "hfov": 12.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D47AA9E_0414_F755_4185_6D8BFC8280CC",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.76,
   "hfov": 12.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -22.55
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D108D923_C067_9680_41DF_FC7852981F40_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA, this.camera_06B6F2A5_11B1_E4ED_41A4_A74815E5920F); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0661B2E3_1151_6465_4194_94018C53D518",
   "pitch": 7.87,
   "yaw": -166.96,
   "hfov": 10.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_18229008_0DC4_5C6D_4180_674402B583DA",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -166.96,
   "hfov": 10.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 7.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA, this.camera_06BC62AD_11B1_E4FD_41A8_8F6BDEBFC88B); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066102E3_1151_6465_41A8_A12C59E2CF48",
   "pitch": -9.73,
   "yaw": 146.71,
   "hfov": 13.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_15DC66FB_0DDC_25A2_41A7_8675B5160B19",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 146.71,
   "hfov": 13.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -9.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383, this.camera_06CB32B4_11B1_E4E3_41B1_5CC251C46C5B); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065E82E4_1151_6463_41A4_C53028AC8B1B",
   "pitch": -8.98,
   "yaw": -1.51,
   "hfov": 9.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_10D8EC19_0DC4_646E_4175_218BD4C73F94",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.51,
   "hfov": 9.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -8.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265, this.camera_065EA301_11B1_E5A5_41B0_588E01BFEC0F); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066EE2D1_1151_64A5_4170_94F60E2D5D09",
   "pitch": -14.76,
   "yaw": 13.82,
   "hfov": 13.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E5DD6573_F954_B28E_41CB_1D259D070585",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 13.82,
   "hfov": 13.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -14.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1097C7E_C065_AE81_413D_5F46F91C687C, this.camera_06695308_11B1_E5A3_418F_7186123F4EF6); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066E42D1_1151_64A5_41A4_0BA35DA8CD21",
   "pitch": -17.02,
   "yaw": -85.16,
   "hfov": 13.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D97E9389_F955_759D_41E5_FCF0B4C3CD47",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.16,
   "hfov": 13.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -17.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220, this.camera_02685354_11B1_E5A3_41A2_2D77559C237B); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066FB2D1_1151_64A5_41A2_6139C4AC9F0B",
   "pitch": -16.02,
   "yaw": 116.82,
   "hfov": 13.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E7F3295D_F955_92BA_41EB_C667BACF274D",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 116.82,
   "hfov": 13.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -16.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E19D88_C066_A981_41C3_751361EC61D1, this.camera_0267234C_11B1_E5A3_41A5_0B8D89C11729); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066F02D1_1151_64A5_41B1_15465BCDAA11",
   "pitch": -15.76,
   "yaw": -167.56,
   "hfov": 13.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E7B88795_F953_9DB5_41EC_3B3498137A90",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.56,
   "hfov": 13.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -15.76
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D108C85E_C067_7681_41E1_2C7F0CDABBF4_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2D713BE_C066_B981_419D_B54132CEDE54, this.camera_05DA13C7_11B1_E4AD_4197_C0DF8F66BA2B); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066A72D6_1151_64AF_41B0_69D527D07E60",
   "pitch": -22.55,
   "yaw": -178.37,
   "hfov": 12.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_158E9E2B_0437_8F73_4182_EEEC3B037B82",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.37,
   "hfov": 12.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -22.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0, this.camera_05F483DF_11B1_E45D_4197_24A4228B74C6); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066BC2D7_1151_64AD_418A_1D1C89A8EE4E",
   "pitch": -18.28,
   "yaw": 95.46,
   "hfov": 13.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1705CDD5_0435_8CD7_418F_26FE481B56F5",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 95.46,
   "hfov": 13.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -18.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35, this.camera_05EF73D7_11B1_E4AD_419D_3E6E80AB814D); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066B62D7_1151_64AD_41A7_18E285AEDB4D",
   "pitch": -24.43,
   "yaw": -24.37,
   "hfov": 15.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_13488654_040D_9FD6_416F_62A4D08C4900",
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -24.37,
   "hfov": 15.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -24.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F, this.camera_05E073CF_11B1_E4BD_41B1_7187B871A8B3); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0668A2D7_1151_64AD_4150_A1504A18952C",
   "pitch": -17.52,
   "yaw": 28.51,
   "hfov": 11.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1C612F59_040C_8DDF_4137_12218C65B082",
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.51,
   "hfov": 11.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -17.52
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "PhotoPlayList",
 "items": [
  {
   "camera": {
    "class": "MovementPhotoCamera",
    "easing": "linear",
    "targetPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.32",
     "y": "0.37",
     "zoomFactor": 1.1
    },
    "initialPosition": {
     "class": "PhotoCameraPosition",
     "x": "0.50",
     "y": "0.50",
     "zoomFactor": 1
    },
    "duration": 5000,
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem",
   "media": "this.album_1A881DB1_114E_9CE5_418E_3A5430061F8A"
  }
 ],
 "id": "album_2DBA9119_04F5_B55E_4187_CD1E62329602_AlbumPlayList"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D1093845_C065_B683_41D8_B045377D044B, this.camera_0537B40E_11B1_E3BF_4171_88CA3E540FFA); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0672A2CD_1151_64BD_419E_A2A17EF75C02",
   "pitch": -10.36,
   "yaw": -16.08,
   "hfov": 13.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EC03BE7B_F96C_8F7D_41D9_C403E6ED7D69",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -16.08,
   "hfov": 13.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -10.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F, this.camera_053D1415_11B1_E3AD_41A7_AC5810F20171); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_067212CD_1151_64BD_41A2_F920C5E176FD",
   "pitch": -33.35,
   "yaw": 153.24,
   "hfov": 11.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_E11AC7E0_F96D_9D8B_41B8_A564536D4916",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.24,
   "hfov": 11.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -33.35
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E, this.camera_04C69470_11B1_EC63_41B0_D2BBA8493C96); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0665A2DD_1151_645D_419C_10ABB81C4A69",
   "pitch": -19.53,
   "yaw": 3.01,
   "hfov": 13.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D6AEB57_0417_B5D3_4183_1E3091A6E462",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.01,
   "hfov": 13.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -19.53
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6, this.camera_04AFA461_11B1_EC65_41AB_4DFE0F27B512); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0664A2DD_1151_645D_41AC_39782E21ACB2",
   "pitch": -1.82,
   "yaw": -178.24,
   "hfov": 17.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_270F9B50_0E7C_ECFE_41AA_9DC1BD636BDA",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.24,
   "hfov": 17.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E9A163_C062_9687_41DF_3403A4FDF221, this.camera_044CA4CA_11B1_ECA7_41A8_3AF0755C7D2E); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_0653D2F4_1151_6463_4199_B05756A0FF6F",
   "pitch": -13.25,
   "yaw": -50.75,
   "hfov": 13.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2A178874_0E44_6CA5_41A0_C07D0115CD31",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.75,
   "hfov": 13.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -13.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065352F5_1151_646D_416B_29D314347EC5",
   "pitch": -17.81,
   "yaw": -139.09,
   "hfov": 12.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2A5996F6_0E44_65A5_417A_765F38A1DA36",
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -139.09,
   "hfov": 12.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -17.81
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F, this.camera_0689C287_11B1_E4AD_41A8_BFF84019DF70); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065B02EA_1151_6467_419A_C649EAB960B6",
   "pitch": -26.82,
   "yaw": -172.09,
   "hfov": 12.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_27E6EDE7_0E44_67A2_41AB_6E1036D59CA5",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -172.09,
   "hfov": 12.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -26.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD, this.camera_041EB4AC_11B1_ECE3_41A3_856A05C2F0F9); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066E12D2_1151_64A7_41A1_C56D4530F4FA",
   "pitch": -21.04,
   "yaw": -7.29,
   "hfov": 12.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DA2D461F_F9D3_9EB6_41BB_37911CBA1498",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -7.29,
   "hfov": 12.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -21.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64, this.camera_042B04B3_11B1_ECE5_41AF_DA8ED954F478); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_066E62D2_1151_64A7_41B0_D6C56D6C1414",
   "pitch": -22.14,
   "yaw": 172.09,
   "hfov": 11.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DDA7966B_F9DC_BE9E_41E2_329946F17194",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 172.09,
   "hfov": 11.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -22.14
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D2E19D88_C066_A981_41C3_751361EC61D1_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_tcap0",
 "hfov": 45,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 447,
    "height": 447
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B, this.camera_0495B452_11B1_E3A7_4185_AD79B5F1EC38); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065E72E5_1151_646D_4155_F3BCCAA0946D",
   "pitch": -27.57,
   "yaw": -0.5,
   "hfov": 12.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_102F353C_0DC4_24A6_41A1_97789DE31088",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.5,
   "hfov": 12.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -27.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA, this.camera_04A0745A_11B1_E3A7_41B0_7FE0552C48CF); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_065FD2E5_1151_646D_419B_CFF8D926D4B5",
   "pitch": -4.46,
   "yaw": 176.11,
   "hfov": 13.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_10332073_0E3C_3CA2_41A9_AEDE174370E0",
 "data": {
  "label": "Circle Door 02"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.11,
   "hfov": 13.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.46
  }
 ]
},
{
 "shadowVerticalLength": 0,
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_222A1707_0415_9D33_4191_1D948113A53F",
 "left": "15%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "paddingRight": 0,
 "right": "15%",
 "children": [
  "this.Container_222A0707_0415_9D33_418D_BDCFECCD9BBC",
  "this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D"
 ],
 "shadowColor": "#000000",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "top": "7%",
 "paddingBottom": 0,
 "layout": "vertical",
 "bottom": "7%",
 "shadowBlurRadius": 25,
 "scrollBarMargin": 2,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "shadow": true,
 "class": "Container",
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "paddingTop": 0,
 "overflow": "visible",
 "gap": 10,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "transparencyActive": false,
 "maxHeight": 55,
 "propagateClick": false,
 "id": "IconButton_23C0B275_0415_77D7_4191_A1AB84AE3952",
 "left": "0.72%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "width": 56,
 "minHeight": 1,
 "iconURL": "skin/IconButton_23C0B275_0415_77D7_4191_A1AB84AE3952.png",
 "borderSize": 0,
 "minWidth": 1,
 "mode": "push",
 "paddingBottom": 0,
 "click": "if(!this.Container_222AB707_0415_9D33_417A_EBEDE3FBF508.get('visible')){ this.setComponentVisibility(this.Container_222AB707_0415_9D33_417A_EBEDE3FBF508, true, 0, this.effect_236CDAC4_0414_9735_418F_D86C1A91D85E, 'showEffect', false) } else { this.setComponentVisibility(this.Container_222AB707_0415_9D33_417A_EBEDE3FBF508, false, 0, this.effect_236CCAC4_0414_9735_4190_352F25432A76, 'hideEffect', false) }",
 "height": 55,
 "top": "30.99%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "shadow": false,
 "class": "IconButton",
 "borderRadius": 0,
 "paddingTop": 0,
 "data": {
  "name": "IconButton7357"
 },
 "cursor": "hand",
 "maxWidth": 56
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065A32EB_1151_6465_418F_92C09A4448C0",
 "levels": [
  {
   "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065B82EB_1151_6465_4194_44A37BDC94D1",
 "levels": [
  {
   "url": "media/panorama_D109474A_C066_9A80_41E5_5F1A3AB3A383_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_066422DE_1151_645F_4191_6B3FECB18104",
 "levels": [
  {
   "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0665B2DE_1151_645F_4192_40D951318BC4",
 "levels": [
  {
   "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066502DF_1151_645D_41AA_7BFEBCE26E5F",
 "levels": [
  {
   "url": "media/panorama_D109AB57_C065_6A8F_41DA_928DD72F4B0B_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065772F1_1151_6465_41AD_8CDEB292154D",
 "levels": [
  {
   "url": "media/panorama_D2E87C9D_C065_EF83_41D1_307E0F7CEFDD_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_066FD2D3_1151_64A5_41AB_55931F27C4D8",
 "levels": [
  {
   "url": "media/panorama_D2EFDCEC_C065_EF81_41E6_8E6D60A44220_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_067272CD_1151_64BD_419E_CD7D519CA5F3",
 "levels": [
  {
   "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0673D2CD_1151_64BD_4174_87F6511FF758",
 "levels": [
  {
   "url": "media/panorama_D1093845_C065_B683_41D8_B045377D044B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_066872D8_1151_64A3_4184_A4FF40B040A7",
 "levels": [
  {
   "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0669C2D9_1151_64A5_41AB_55456726A680",
 "levels": [
  {
   "url": "media/panorama_D2E9622F_C067_FA80_41DE_6DDB7EC022A0_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_066292DF_1151_645D_4172_3F0CF8A8AF49",
 "levels": [
  {
   "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066202E0_1151_6463_41AE_60F04AF250D5",
 "levels": [
  {
   "url": "media/panorama_D2E98348_C065_7A80_41E0_2EC0436F7BC3_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065F42E6_1151_646F_419D_72B6A523DD1C",
 "levels": [
  {
   "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065CC2E6_1151_646F_4190_C354C359C1F4",
 "levels": [
  {
   "url": "media/panorama_D109CAC4_C065_6B80_41E4_23E9FED3D86B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066CB2D3_1151_64A5_41A6_84F4EAF04FFD",
 "levels": [
  {
   "url": "media/panorama_D2E444B0_C065_9F81_41E6_BABCFAAE30AD_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065B12EC_1151_6463_41A0_3066AB8C4DB4",
 "levels": [
  {
   "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0658B2EC_1151_6463_41A5_0E950FBD4A37",
 "levels": [
  {
   "url": "media/panorama_D10954A9_C066_FF80_41B3_2ACAB8952CD1_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066922D9_1151_64A5_41B0_F8F53BF4740E",
 "levels": [
  {
   "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_066682D9_1151_64A5_4153_8ADA417DBB1D",
 "levels": [
  {
   "url": "media/panorama_D10954BA_C066_9F80_41D5_249DAA4A85A7_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_067352CE_1151_64BF_41A1_047E6CFBDE9C",
 "levels": [
  {
   "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_067092CE_1151_64BF_419A_67BEA131F4D0",
 "levels": [
  {
   "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0670E2CF_1151_64BD_41A0_EC0B653E8525",
 "levels": [
  {
   "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_067072CF_1151_64BD_4181_C2F06DC2739B",
 "levels": [
  {
   "url": "media/panorama_D1096B3F_C065_AAFF_41B3_0B61B7406265_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065C42E7_1151_646D_41A7_AA7F96B597FE",
 "levels": [
  {
   "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065DC2E8_1151_6463_41A9_4FC457806555",
 "levels": [
  {
   "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065D22E8_1151_6463_41AC_33391DC362D4",
 "levels": [
  {
   "url": "media/panorama_D10F4970_C062_9680_41E4_C8C54DC76A7F_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065822ED_1151_647D_41AA_57177FB11E31",
 "levels": [
  {
   "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0659B2EE_1151_647F_4181_C8086A92CE0E",
 "levels": [
  {
   "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065922EE_1151_647F_4191_C96DDCD3AF8F",
 "levels": [
  {
   "url": "media/panorama_D2EA4C07_C066_EE8F_41DA_33C0BAEB5092_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 350
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0663A2E1_1151_6465_4198_89E535A7417C",
 "levels": [
  {
   "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066322E1_1151_6465_419E_D7DADCDD0A29",
 "levels": [
  {
   "url": "media/panorama_D10B59C8_C067_E981_41CD_6C68F67C30CD_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066C42D4_1151_64A3_4192_0932538FC81F",
 "levels": [
  {
   "url": "media/panorama_D108D86A_C065_9681_41CF_C5D368F19D2C_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065412F1_1151_6465_415F_8AA6FCA7B16D",
 "levels": [
  {
   "url": "media/panorama_D108C4B2_C065_9F81_4199_9036460AA92D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066602DA_1151_64A7_41A9_22BABF741513",
 "levels": [
  {
   "url": "media/panorama_D2EE615D_C062_B683_41DD_B0CBBC8FBA91_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0677E2C8_1151_64A4_41A6_48687A7FFE4C",
 "levels": [
  {
   "url": "media/panorama_D108C978_C067_B681_41C6_59D59F2B78E7_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0656D2EF_1151_647D_41A7_8C89AB8B98BC",
 "levels": [
  {
   "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065632EF_1151_647D_4197_52E4F63A62BF",
 "levels": [
  {
   "url": "media/panorama_D109EC07_C066_AE8F_41E6_B5F953B3A42F_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0671D2CF_1151_64BD_4184_6B052E00BFBA",
 "levels": [
  {
   "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_067102D0_1151_64A3_41B0_48D3339E8B1B",
 "levels": [
  {
   "url": "media/panorama_D2E4738F_C065_B99F_41CA_964A3A6FA449_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_0650A2F6_1151_646F_4190_E06018320304",
 "levels": [
  {
   "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065002F6_1151_646F_4184_E87C8A9DD3C5",
 "levels": [
  {
   "url": "media/panorama_1EC12DFE_1177_7C5F_41AC_8C614B1DEAC0_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0652A2F3_1151_6465_41AC_AF341778D2F6",
 "levels": [
  {
   "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065252F4_1151_6463_4190_91007BE65817",
 "levels": [
  {
   "url": "media/panorama_D2E9A163_C062_9687_41DF_3403A4FDF221_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066DD2D5_1151_64AD_41AE_238E8028E84F",
 "levels": [
  {
   "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_066D32D5_1151_64AD_41AE_128CB66D35E4",
 "levels": [
  {
   "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066D62D5_1151_64AD_419F_17981503A723",
 "levels": [
  {
   "url": "media/panorama_D2D713BE_C066_B981_419D_B54132CEDE54_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_0667C2DB_1151_64A5_41AB_A32879A797E4",
 "levels": [
  {
   "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 690
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066742DB_1151_64A5_41AB_0DAB5E0836B9",
 "levels": [
  {
   "url": "media/panorama_D10944FD_C065_FF83_41C8_C05B58AA1B35_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0674D2CA_1151_64A7_41A9_E1EF20D2653F",
 "levels": [
  {
   "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_067432CB_1151_64A5_41AD_003F2B9B8560",
 "levels": [
  {
   "url": "media/panorama_D2EFA2C7_C065_9B8F_41D9_DBD7EAC983B3_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_066082E2_1151_6467_41B1_3DF87623D9AA",
 "levels": [
  {
   "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066012E2_1151_6467_41AF_71FF303E70BC",
 "levels": [
  {
   "url": "media/panorama_D2EA7146_C067_9680_41C6_31CBB76D0DBA_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065792F0_1151_6463_4181_A5088C0C279F",
 "levels": [
  {
   "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0657D2F0_1151_6463_41AF_DB69CB0170D4",
 "levels": [
  {
   "url": "media/panorama_D2D76BA7_C066_A980_41D6_DD522DCF5EBC_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065AE2E9_1151_6465_41B0_C33B52C7C85A",
 "levels": [
  {
   "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065A42E9_1151_6465_4180_6E2A1ADBD036",
 "levels": [
  {
   "url": "media/panorama_D2D2C0D9_C067_7783_41E0_BB33F1CCD48F_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_067162D0_1151_64A3_4195_65DDE297C105",
 "levels": [
  {
   "url": "media/panorama_D1097C7E_C065_AE81_413D_5F46F91C687C_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_066A12D6_1151_64AF_41AA_7AB6C786E299",
 "levels": [
  {
   "url": "media/panorama_D2B55F8F_C067_A99F_41D9_2063000041BF_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_0655B2F2_1151_6467_41B1_5C15657D6673",
 "levels": [
  {
   "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065522F3_1151_6465_41A0_A21786EF31A8",
 "levels": [
  {
   "url": "media/panorama_D108C9A7_C065_698F_41E3_80422CEB50C5_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 350
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_067582CB_1151_64A5_4189_42CF91F7526B",
 "levels": [
  {
   "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0675D2CC_1151_64A3_4192_04C9291381AE",
 "levels": [
  {
   "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_067552CC_1151_64A3_41AC_23B0E05EDB4E",
 "levels": [
  {
   "url": "media/panorama_D2ED1ED9_C066_AB83_41D8_48CCBDCA192F_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0664D2DC_1151_64A3_4159_9B32EFCAF6FE",
 "levels": [
  {
   "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066422DC_1151_64A3_4185_DCFE5FD90D20",
 "levels": [
  {
   "url": "media/panorama_D2EB53FE_C066_9981_41E2_CE79571E0E4E_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_0661B2E3_1151_6465_4194_94018C53D518",
 "levels": [
  {
   "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066102E3_1151_6465_41A8_A12C59E2CF48",
 "levels": [
  {
   "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065E82E4_1151_6463_41A4_C53028AC8B1B",
 "levels": [
  {
   "url": "media/panorama_D108D923_C067_9680_41DF_FC7852981F40_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066EE2D1_1151_64A5_4170_94F60E2D5D09",
 "levels": [
  {
   "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066E42D1_1151_64A5_41A4_0BA35DA8CD21",
 "levels": [
  {
   "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066FB2D1_1151_64A5_41A2_6139C4AC9F0B",
 "levels": [
  {
   "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066F02D1_1151_64A5_41B1_15465BCDAA11",
 "levels": [
  {
   "url": "media/panorama_D2E5B045_C065_9683_41E3_6E845FE9FA64_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066A72D6_1151_64AF_41B0_69D527D07E60",
 "levels": [
  {
   "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066BC2D7_1151_64AD_418A_1D1C89A8EE4E",
 "levels": [
  {
   "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_066B62D7_1151_64AD_41A7_18E285AEDB4D",
 "levels": [
  {
   "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_0668A2D7_1151_64AD_4150_A1504A18952C",
 "levels": [
  {
   "url": "media/panorama_D1083AED_C067_EB83_41DC_9EF8A3F4BF93_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0672A2CD_1151_64BD_419E_A2A17EF75C02",
 "levels": [
  {
   "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_067212CD_1151_64BD_41A2_F920C5E176FD",
 "levels": [
  {
   "url": "media/panorama_D2E0DFF7_C065_A98F_41A5_2DA9140037F4_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0665A2DD_1151_645D_419C_10ABB81C4A69",
 "levels": [
  {
   "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_0664A2DD_1151_645D_41AC_39782E21ACB2",
 "levels": [
  {
   "url": "media/panorama_D2E8AD00_C066_EE81_41E5_AC7B8AB443DA_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_0653D2F4_1151_6463_4199_B05756A0FF6F",
 "levels": [
  {
   "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065352F5_1151_646D_416B_29D314347EC5",
 "levels": [
  {
   "url": "media/panorama_2A14DB0A_0E44_2C6D_4191_794DB8371339_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065B02EA_1151_6467_419A_C649EAB960B6",
 "levels": [
  {
   "url": "media/panorama_D2E7BFAF_C067_699F_41D1_9A1A666991FC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066E12D2_1151_64A7_41A1_C56D4530F4FA",
 "levels": [
  {
   "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_066E62D2_1151_64A7_41B0_D6C56D6C1414",
 "levels": [
  {
   "url": "media/panorama_D2E19D88_C066_A981_41C3_751361EC61D1_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_065E72E5_1151_646D_4155_F3BCCAA0946D",
 "levels": [
  {
   "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_065FD2E5_1151_646D_419B_CFF8D926D4B5",
 "levels": [
  {
   "url": "media/panorama_D108D8E5_C067_9783_41D2_ABDB27CFB6E6_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_222A0707_0415_9D33_418D_BDCFECCD9BBC",
 "horizontalAlign": "left",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.HTMLText_222AF707_0415_9D33_4187_8700EAAF19F3",
  "this.IconButton_222AD707_0415_9D33_4190_F6C4FB571750"
 ],
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "width": "100%",
 "height": 140,
 "backgroundOpacity": 0.3,
 "shadow": false,
 "class": "Container",
 "borderRadius": 0,
 "paddingTop": 0,
 "data": {
  "name": "header"
 },
 "overflow": "scroll",
 "gap": 10
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 220,
 "id": "ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D",
 "itemLabelFontStyle": "normal",
 "paddingLeft": 70,
 "scrollBarColor": "#04A3E1",
 "itemMode": "normal",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "minHeight": 1,
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemLabelFontFamily": "Montserrat",
 "width": "100%",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "minWidth": 1,
 "itemPaddingRight": 3,
 "paddingBottom": 70,
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "backgroundColor": [
  "#000000"
 ],
 "itemPaddingLeft": 3,
 "verticalAlign": "middle",
 "selectedItemLabelFontColor": "#04A3E1",
 "height": "100%",
 "itemOpacity": 1,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0.05,
 "shadow": false,
 "class": "ThumbnailGrid",
 "itemPaddingTop": 3,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemBackgroundColor": [],
 "itemThumbnailBorderRadius": 0,
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "itemWidth": 220,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "horizontalAlign": "center",
 "selectedItemThumbnailShadow": true,
 "paddingRight": 70,
 "itemMinHeight": 50,
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailGrid_222AC707_0415_9D33_418D_CFAE84A68E1D_playlist",
 "borderSize": 0,
 "itemLabelFontSize": 14,
 "itemMinWidth": 50,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemThumbnailScaleMode": "fit_outside",
 "itemHeight": 156,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "itemThumbnailShadow": false,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "paddingTop": 10,
 "data": {
  "name": "ThumbnailList"
 },
 "itemLabelGap": 7,
 "scrollBarWidth": 10,
 "gap": 26
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_222AF707_0415_9D33_4187_8700EAAF19F3",
 "left": "0%",
 "paddingLeft": 80,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "minWidth": 1,
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "height": "100%",
 "width": "77.115%",
 "backgroundOpacity": 0,
 "shadow": false,
 "class": "HTMLText",
 "borderRadius": 0,
 "paddingTop": 0,
 "data": {
  "name": "HTMLText54192"
 },
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.24vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.24vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>"
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_222AD707_0415_9D33_4190_F6C4FB571750",
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 20,
 "minHeight": 50,
 "iconURL": "skin/IconButton_222AD707_0415_9D33_4190_F6C4FB571750.jpg",
 "borderSize": 0,
 "pressedRollOverIconURL": "skin/IconButton_222AD707_0415_9D33_4190_F6C4FB571750_pressed_rollover.jpg",
 "minWidth": 50,
 "mode": "push",
 "paddingBottom": 0,
 "click": "this.setComponentVisibility(this.Container_222AB707_0415_9D33_417A_EBEDE3FBF508, false, 0, null, null, false)",
 "height": "36.14%",
 "width": "100%",
 "top": 20,
 "verticalAlign": "top",
 "rollOverIconURL": "skin/IconButton_222AD707_0415_9D33_4190_F6C4FB571750_rollover.jpg",
 "backgroundOpacity": 0,
 "shadow": false,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_222AD707_0415_9D33_4190_F6C4FB571750_pressed.jpg",
 "paddingTop": 0,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "maxWidth": 60
}],
 "width": "100%"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
