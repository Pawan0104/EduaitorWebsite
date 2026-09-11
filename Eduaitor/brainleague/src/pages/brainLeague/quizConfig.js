// Runtime quiz configuration — badges & share message can be overridden by a
// config fetched from the backend (admin-managed). Falls back to the bundled
// gameData defaults when no override is installed.

import { BADGES, SHARE_MESSAGE } from "./gameData";

export let runtimeBadges = null;
export let runtimeShareMessage = null;

export function applyQuizConfig({ badges: badgeList, settings }) {
  if (Array.isArray(badgeList) && badgeList.length) {
    runtimeBadges = badgeList;
  }
  if (settings && typeof settings.shareMessage === "string" && settings.shareMessage.trim()) {
    runtimeShareMessage = settings.shareMessage;
  }
}

export function badges() {
  return runtimeBadges || BADGES;
}

export function shareMessage(name, score, badge) {
  if (runtimeShareMessage) {
    return runtimeShareMessage
      .replace(/\{name\}/g, name)
      .replace(/\{score\}/g, score)
      .replace(/\{badgeEmoji\}/g, badge.emoji)
      .replace(/\{badgeName\}/g, badge.name);
  }
  return SHARE_MESSAGE(name, score, badge);
}