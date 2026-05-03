import { WorldHistoryEvent } from "@/types/worldHistory";
import { ancientEvents } from "@/data/events/ancientEvents";
import { medievalEvents } from "@/data/events/medievalEvents";
import { earlyModernEvents } from "@/data/events/earlyModernEvents";
import { modernEvents } from "@/data/events/modernEvents";
import { contemporaryEvents } from "@/data/events/contemporaryEvents";

export const worldHistoryEvents: WorldHistoryEvent[] = [
  ...ancientEvents,
  ...medievalEvents,
  ...earlyModernEvents,
  ...modernEvents,
  ...contemporaryEvents
];

export {
  ancientEvents,
  medievalEvents,
  earlyModernEvents,
  modernEvents,
  contemporaryEvents
};
