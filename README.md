# Qwerbeet

Partyspiel mit 55 Duell-Spielen in fünf Kategorien (Reaktion & Geschick, Arcade, Kopf, Wissen, Taktik & Bluff) und einer Party für 3–6 Spieler mit rund 50 Minispielen. Dazu Powerups, Bots in drei Stärken und ein eigener Held für jeden, den man im Editor zusammenbaut.

**Spielen:** https://tabiuseheo.github.io/Qwerbeet/

## Duell (1 gegen 1)

Vier Modi: Klassisch (das Finale zählt doppelt), Late Game (jede Runde zählt einen Punkt mehr), Endlos und Brett (würfeln, Münzen und Sterne sammeln).

- **Am selben Gerät:** „Spielen“ → „Offline“ → „Duell“. Bei „Gegner“ 👤 Mensch oder 🤖 Bot mit Stärke wählen.
- **Online:** „Spielen“ → „Online“ → „Duell“ → „Raum erstellen“ → Link an den Gegner schicken. Wer den Link öffnet, ist verbunden.
- **Einzeln:** „Spiele“ → Spiel antippen → „Einzeln spielen“.

Online wird die Verzögerung ausgeglichen: Es zählt der Moment, in dem gedrückt wurde, und bewegte Teile laufen auf beiden Geräten nach derselben Uhr.

## Party (3–6 Spieler)

- **Online:** „Spielen“ → „Online“ → „Party“ oder „Turnier“ → Raum erstellen, Link teilen oder den QR-Code zeigen. Freie Plätze füllen Bots.
- **An einem Gerät:** „Spielen“ → „Offline“ → „Party mit Bots“ oder „Turnier mit Bots“ (du, auf Wunsch ein zweiter Spieler, dazu Bots).

Drei Modi:
- **🎲 Brett:** würfeln, laufen, Sterne kaufen, nach jeder Runde ein Minispiel. Mehrere Karten, die sich während der Partie verändern.
- **♾️ Minispiele:** ein Minispiel nach dem anderen, Punkte nach Platz, nach jedem Spiel der Gesamtstand.
- **🏆 Turnier (3–16 Spieler):** K.-o.-Baum, immer zwei spielen gegeneinander. Online laufen die Matches gleichzeitig an den Geräten der Spieler (gespielt werden die 1-gegen-1-Spiele aus dem Duell, der Gastgeber wählt sie aus oder sie werden gelost), oder nacheinander mit allen Party-Minispielen, dann schauen die anderen zu.

Der Gastgeber kann jederzeit pausieren. Wer rausfliegt, kommt mit demselben Link zurück auf seinen Platz. Fällt der Gastgeber aus, übernimmt der Nächste.

## Als App

Auf der Webseite lässt sich Qwerbeet installieren (Einstellungen → „Als App installieren“, am iPhone über „Teilen“ → „Zum Home-Bildschirm“). Dann startet es im Vollbild und läuft an einem Gerät auch offline (`manifest.webmanifest`, `sw.js`).

## Technik und Lizenzen

Die Online-Verbindung läuft direkt zwischen den Geräten (WebRTC). Zum Finden der Mitspieler nutzt das Spiel den freien Vermittlungsserver von [PeerJS](https://peerjs.com) (MIT-Lizenz, siehe `peerjs-LICENSE.txt`). Der Logo-Schriftzug stammt aus der Schrift Bowlby One (SIL Open Font License). Der QR-Code in der Party-Lobby kommt von [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) von Kazuhiko Arase (MIT-Lizenz).
