export function canUseFullscreen(documentRef = document) {
  return Boolean(documentRef?.documentElement?.requestFullscreen);
}

export function getFullscreenButtonLabel(isSupported, isFullscreen) {
  if (!isSupported) {
    return "不支持全屏";
  }

  return isFullscreen ? "退出全屏" : "进入全屏";
}
