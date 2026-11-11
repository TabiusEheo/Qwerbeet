# Qwerbeet

Partyspiel mit 55 Duell-Spielen in fünf Kategorien (Reaktion & Geschick, Arcade, Kopf, Wissen, Taktik & Bluff) und einer Party für 3–6 Spieler mit 54 Minispielen (davon 4 Boss-Kämpfe), dazu ein Turnier für 3–16 Spieler. Dazu Powerups, Bots in drei Stärken und ein eigener Held für jeden, den man im Editor zusammenbaut.

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
- **🏆 Turnier (3–16 Spieler):** K.-o.-Baum, immer zwei spielen gegeneinander. Online laufen die Matches einer Runde gleichzeitig an den Geräten der Spieler, die nächste Runde startet gemeinsam, und wer fertig ist, kann bei den anderen live zuschauen (gespielt werden die 1-gegen-1-Spiele aus dem Duell, der Gastgeber wählt sie aus oder sie werden gelost), oder nacheinander mit allen Party-Minispielen, dann schauen die anderen zu.

Der Gastgeber kann jederzeit pausieren. Wer rausfliegt, kommt mit demselben Link zurück auf seinen Platz. Fällt der Gastgeber aus, übernimmt der Nächste.

## Brett- & Kartenspiele

Vierte Auswahl unter „Spielen“ (offline gegen Bots oder online): ein Spiel am Stück.

- **Karten:** Schafkopf (Sauspiel, Wenz, Solo), Skat (Reizen, Farbspiel, Grand, Null), Doppelkopf, Zauberer (Stiche ansagen, 3–6), Poker (Texas Hold'em um Spielchips), Canasta (vereinfacht, jeder für sich), Romme (Erstauslage 40, Anlegen, Joker tauschen), Durak, Farbrausch (wie Uno).
- **Schreiben:** Stadt, Land, Fluss mit frei eintippbaren Kategorien, einstellbaren Punkten und Selbstwertung, bei der alle alle Antworten und Punkte sehen.
- **Brett:** Schach, Backgammon, Mensch ärgere dich nicht. Diese gehen auch zu zweit an einem Gerät.

Online sieht jeder nur seine eigenen Karten, freie Plätze füllen Bots.

## Als App

Auf der Webseite lässt sich Qwerbeet installieren (Einstellungen → „Als App installieren“, am iPhone über „Teilen“ → „Zum Home-Bildschirm“). Dann startet es im Vollbild und läuft an einem Gerät auch offline (`manifest.webmanifest`, `sw.js`).

## Technik und Lizenzen

Die Online-Verbindung läuft direkt zwischen den Geräten (WebRTC). Zum Finden der Mitspieler nutzt das Spiel den freien Vermittlungsserver von [PeerJS](https://peerjs.com) (MIT-Lizenz, siehe `peerjs-LICENSE.txt`). Der Logo-Schriftzug stammt aus der Schrift Bowlby One (SIL Open Font License). Der QR-Code in der Party-Lobby kommt von [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) von Kazuhiko Arase (MIT-Lizenz).
