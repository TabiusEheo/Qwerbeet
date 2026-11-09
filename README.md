# Qwerbeet

Partyspiel für zwei: 55 Mini-Games in fünf Kategorien (Reaktion & Geschick, Arcade, Kopf, Wissen, Taktik & Bluff), dazu Powerups, Bot-Gegner und drei Spielmodi. Jeder spielt mit einem eigenen Helden, den man im Editor zusammenbaut.

**Spielen:** https://tabiuseheo.github.io/Qwerbeet/

- **Am selben Gerät:** „Duell einrichten“ → „Duell starten“.
- **Online:** „Duell einrichten“ → „Online“ → „Raum erstellen“ → Link an den Gegner schicken. Wer den Link öffnet, ist verbunden.
- **Einzeln:** „Spiele“ → Spiel antippen → „Einzeln spielen“.

Online wird die Verzögerung ausgeglichen: Es zählt der Moment, in dem gedrückt wurde, und bewegte Teile laufen auf beiden Geräten nach derselben Uhr.

Die Online-Verbindung läuft direkt zwischen den Geräten (WebRTC). Zum Finden des Gegners nutzt das Spiel den freien Vermittlungsserver von [PeerJS](https://peerjs.com) (MIT-Lizenz, siehe `peerjs-LICENSE.txt`). Der Logo-Schriftzug stammt aus der Schrift Bowlby One (SIL Open Font License). Der QR-Code in der Party-Lobby kommt von [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) von Kazuhiko Arase (MIT-Lizenz).

**Als App:** Auf der Webseite lässt sich Qwerbeet installieren (Einstellungen → „Als App installieren“, am iPhone über „Teilen“ → „Zum Home-Bildschirm“). Dann startet es im Vollbild und läuft an einem Gerät auch offline (`manifest.webmanifest`, `sw.js`).
