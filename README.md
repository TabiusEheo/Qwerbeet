# Qwerbeet

Partyspiel für zwei: 53 Mini-Games in fünf Kategorien (Reaktion & Geschick, Arcade, Kopf, Wissen, Taktik & Bluff), dazu Powerups, Bot-Gegner und drei Spielmodi. Jeder spielt mit einem eigenen Helden, den man im Editor zusammenbaut.

**Spielen:** https://tabiuseheo.github.io/duell/

- **Am selben Gerät:** „Duell einrichten“ → „Duell starten“.
- **Online:** „Duell einrichten“ → „Online“ → „Raum erstellen“ → Link an den Gegner schicken. Wer den Link öffnet, ist verbunden.
- **Einzeln:** „Spiele“ → Spiel antippen → „Einzeln spielen“.

Online wird die Verzögerung ausgeglichen: Es zählt der Moment, in dem gedrückt wurde, und bewegte Teile laufen auf beiden Geräten nach derselben Uhr.

Die Online-Verbindung läuft direkt zwischen den Geräten (WebRTC). Zum Finden des Gegners nutzt das Spiel den freien Vermittlungsserver von [PeerJS](https://peerjs.com) (MIT-Lizenz, siehe `peerjs-LICENSE.txt`). Die Logo-Schrift ist Bowlby One (SIL Open Font License).
