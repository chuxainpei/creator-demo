export function canUseFullscreen(documentRef = document) {
  return Boolean(
    documentRef?.documentElement?.requestFullscreen && documentRef?.fullscreenEnabled !== false
  );
}

export function isStandaloneDisplay(navigatorRef = navigator, standaloneMedia = null) {
  return Boolean(navigatorRef?.standalone || standaloneMedia?.matches);
}

export function getFullscreenButtonLabel(isSupported, isFullscreen, isStandalone = false) {
  if (isStandalone) {
    return "已全屏打开";
  }

  if (!isSupported) {
    return "添加到主屏幕全屏";
  }

  return isFullscreen ? "退出全屏" : "进入全屏";
}

export function getFullscreenHelpText(isSupported, isStandalone) {
  if (isSupported) {
    return "";
  }

  if (isStandalone) {
    return "当前已用主屏幕 Web App 方式打开。";
  }

  return "iPhone Safari 不支持网页按钮直接全屏。请用 Safari 分享按钮添加到主屏幕，再从主屏幕打开。";
}
