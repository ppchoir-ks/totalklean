import type messages from "./messages/fr.json";

type Messages = typeof messages;

declare global {
  interface IntlMessages extends Messages {}
}
