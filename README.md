# Duell der Disziplinen

Partyspiel für zwei: 36 Mini-Games von Reaktion bis Lichtrad, dazu Powerups, Bot-Gegner und drei Spielmodi. Jeder spielt mit einem eigenen Helden, den man im Editor zusammenbaut.

**Spielen:** https://tabiuseheo.github.io/duell/

- **Am selben Gerät:** Namen eintragen, „Duell starten“.
- **Online:** „🌐 Online“ → „Raum erstellen“ → Link an den Gegner schicken. Wer den Link öffnet, ist verbunden.

Online wird die Verzögerung ausgeglichen: Es zählt der Moment, in dem gedrückt wurde, und bewegte Teile (Bombenzeiger, Noten, Neon-Sprint) laufen auf beiden Geräten nach derselben Uhr.

Die Online-Verbindung läuft direkt zwischen den Geräten (WebRTC). Zum Finden des Gegners nutzt das Spiel den freien Vermittlungsserver von [PeerJS](https://peerjs.com) (MIT-Lizenz, siehe `peerjs-LICENSE.txt`).
