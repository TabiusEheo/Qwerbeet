/* Automatischer Test für Qwerbeet: öffnet index.html im Browser (Chromium) und prüft
   1. jedes Duell-Spiel kurz gegen den Bot (kein Fehler beim Starten und Klicken),
   2. jedes Brett- und Kartenspiel am Spieltisch kurz mit Bots,
   3. die Raum-Formate mit Bots bis zum Ende (Einzelspiel, Alle gegen alle, Würfelbrett, Turnier),
   4. online: Raum beitreten und ein Online-Duell verbinden (eigener Verbindungsserver auf 127.0.0.1:9000).
   Schlägt etwas fehl, endet das Skript mit Fehlercode 1 (GitHub zeigt dann ein rotes X). */
const path = require('path');
const {chromium} = require('playwright');
const {PeerServer} = require('peer');
const FILE = 'file://' + path.resolve(__dirname, '..', 'index.html');
const ONLY = (process.env.ONLY || '').split(',').filter(Boolean);
const fails = [], log = (...a) => console.log(...a);
const fail = (what, msg) => { fails.push(`${what}: ${msg}`); log('  ✘', what, msg); };
const want = k => !ONLY.length || ONLY.includes(k);

async function page(b, opt = {}){
  const ctx = await b.newContext({viewport: opt.vp || {width: 1366, height: 768}});
  const p = await ctx.newPage(); p.errs = [];
  p.on('pageerror', x => p.errs.push(x.message + ' @' + (x.stack || '').split('\n')[1]));
  p.on('dialog', d => d.accept().catch(() => {}));
  if (opt.clock) await p.clock.install();
  await p.goto(FILE + (opt.q || '')); await (opt.clock ? p.clock.runFor(800) : p.waitForTimeout(800));
  return p;
}
const errs = (p, what) => { if (p.errs.length) fail(what, [...new Set(p.errs)].slice(0, 3).join(' | ')); p.errs = []; };

// 1. Duell-Spiele gegen den Bot: starten, ein paar Sekunden zufällig klicken
async function duelSmoke(b){
  const p = await page(b, {clock: true}), ids = await p.evaluate(() => DISC.map(d => d.id));
  for (const id of ids) {
    await p.evaluate(id => { try { pgStop(); ptStop(); } catch(e) {} gen++; cur = null; setBot(true, 1); single(DISC.find(d => d.id === id)); }, id);
    await p.clock.runFor(600);
    for (let k = 0; k < 14; k++) {
      await p.evaluate(() => { const g = document.querySelector('#go'); if (g && !g.disabled) return g.click();
        const c = [...document.querySelectorAll('#main button:not([disabled]), #main .duo, #main [data-b], #main .tbc, #main canvas')].filter(x => x.offsetParent && !/quit|gskip/.test(x.id));
        const x = c[Math.floor(Math.random()*c.length)]; if (!x) return; if (x.tagName === 'CANVAS') { const r = x.getBoundingClientRect(); x.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true, clientX: r.x + r.width*Math.random(), clientY: r.y + r.height*Math.random()})); } else { x.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true})); x.click(); } });
      await p.keyboard.press(['Space', 'Enter', 'KeyA', 'KeyL', 'KeyQ', 'ArrowLeft'][k % 6]);
      await p.clock.runFor(450);
    }
    errs(p, 'Duell ' + id);
  }
  log('  Duell-Spiele:', ids.length);
  await p.context().close();
}
// 2. Brett- und Kartenspiele am Spieltisch mit Bots
async function tableSmoke(b){
  const p = await page(b, {clock: true}), ids = await p.evaluate(() => Object.keys(TGAMES));
  for (const id of ids) {
    await p.evaluate(id => { try { pgStop(); ptStop(); } catch(e) {} localStorage.removeItem('qw-party'); menu('home'); const G = TGAMES[id]; PT.mode = 'table'; PT.tg = id; PT.fmt = ''; ptLocal(); PT.pl = PT.pl.slice(0, 1); while (PT.pl.length < Math.max(G.min, Math.min(G.max, 4))) ptAddBot(true); if (G.ns && !G.ns.includes(PT.pl.length)) { while (PT.pl.length < G.ns[0]) ptAddBot(true); } PT.pl[0].watch = false; ptGo(); }, id);
    for (let k = 0; k < 20; k++) {
      await p.clock.runFor(1500);
      await p.evaluate(() => { const s = PQ.s, tb = s && s.tb; if (!tb) return; const me = tbMe(s), G = TGAMES[tb.g];
        if (tb.st === 'cfg' && document.querySelector('#slfgo')) return document.querySelector('#slfgo').click();
        if (tb.ph === 'done') { const n = document.querySelector('#tbnx'); if (n) n.click(); return; }
        if (me < 0 || tb.turn !== me) return;
        try { if (tb.ph === 'play') { const L = G.legal(tb, me); if (L.length) pgSend(me, {k: 'tc', c: G.botCard(tb, me, L)}); } else { const v = G.botBid(tb, me); if (v != null && G.bid(tb, me, v) !== false) tbBidDone(s); } } catch(e) {} });
    }
    errs(p, 'Tisch ' + id);
  }
  log('  Spieltisch:', ids.length);
  await p.context().close();
}
// 3. Raum-Formate mit Bots bis zum Ende
async function formats(b){
  const p = await page(b, {clock: true});
  const runs = [['one', "PT.one = 'p:reakt'; PT.olen = 0;"], ['one', "PT.one = 't:durak'; PT.olen = 0;"], ['ffa', "PT.ffaN = 2; PT.nch = -3; PT.lenM = 0;"], ['board', "PT.rounds = 2; PT.nch = -1;"], ['tour', "PT.bo = 1; PT.nch = -1;"]];
  for (const [fmt, setup] of runs) {
    await p.evaluate(([fmt, setup]) => { try { pgStop(); ptStop(); } catch(e) {} localStorage.removeItem('qw-party'); menu('home'); ptLocal(); for (let i = 0; i < 4; i++) ptAddBot(true); PT.fmt = fmt; PT.step = 'games'; eval(setup); PT.pl[0].watch = true; PT.tempo = .6; ptSync(); rmGo(); }, [fmt, setup]);
    let ok = false;
    for (let t = 0; t < 900 && !ok; t++) {
      await p.clock.runFor(2000);
      ok = await p.evaluate(() => { const s = PQ.s; if (!s) return false; if (s.ph === 'end' || (s.tb && s.tb.ph === 'over')) return true;
        if (s.ph === 'res') { const x = document.querySelector('#pgnx'); if (x) x.click(); }
        if (s.ph === 'pick') { const x = document.querySelector('.pgpick:not([disabled])'); if (x) x.click(); }
        if (s.ph === 'intro') document.querySelectorAll('.pgrd').forEach(x => x.click());
        if (s.ph === 'table' && s.tb && s.tb.ph === 'done') { const n = document.querySelector('#tbnx'); if (n) n.click(); }
        const g = document.querySelector('#trgo, .trgo'); if (g && !g.disabled) g.click();
        return false; });
    }
    if (!ok) fail('Format ' + fmt, 'kam nicht bis zum Ende: ' + await p.evaluate(() => PQ.s ? PQ.s.ph : 'kein Spiel'));
    errs(p, 'Format ' + fmt);
  }
  log('  Formate:', runs.length);
  await p.context().close();
}
// 4. online: Raum mit Gast, Online-Duell
async function online(b){
  const srv = PeerServer({port: 9000, host: '127.0.0.1', path: '/'});
  await new Promise(r => setTimeout(r, 800));
  const H = await page(b, {q: '?peer=127.0.0.1:9000'}), G = await page(b, {q: '?peer=127.0.0.1:9000'});
  const wait = async (p, fn, ms = 20000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await p.evaluate(fn)) return true; await p.waitForTimeout(300); } return false; };
  await H.evaluate(() => { localStorage.clear(); menu('play'); }); await H.click('#ponl'); await H.fill('#ptn', 'Host'); await H.click('#pthost');
  if (!await wait(H, () => PT.code && PT.st === 'lobby')) fail('Online', 'Raum wurde nicht eröffnet');
  const code = await H.evaluate(() => PT.code);
  await G.evaluate(() => { localStorage.clear(); menu('home'); }); await G.fill('#mjc', code); await G.click('#mjb');
  if (!await wait(H, () => PT.pl.length >= 2)) fail('Online', 'Gast kam nicht in den Raum');
  else {
    await H.evaluate(() => { PT.fmt = 'one'; PT.one = 't:backgammon'; PT.olen = 0; PT.step = 'games'; ptSync(); }); await H.waitForTimeout(400); await H.click('#ptgo');
    if (!await wait(G, () => PQ.s && PQ.s.ph === 'table')) fail('Online', 'Spiel kam beim Gast nicht an');
    await H.evaluate(() => pgLobby());
  }
  errs(H, 'Online Raum (Gastgeber)'); errs(G, 'Online Raum (Gast)');
  await H.evaluate(() => { ptLeave(); }); await G.evaluate(() => { ptStop(); menu('home'); }); await H.waitForTimeout(800);
  await H.evaluate(() => netHost());
  if (!await wait(H, () => NET.code)) fail('Online-Duell', 'kein Code');
  const dc = await H.evaluate(() => NET.code);
  await G.evaluate(c => netJoin(c), dc);
  if (!await wait(H, () => NET.open)) fail('Online-Duell', 'keine Verbindung');
  errs(H, 'Online-Duell (Gastgeber)'); errs(G, 'Online-Duell (Gast)');
  await H.context().close(); await G.context().close();
  try { srv.close(); } catch(e) {}
  log('  Online: Raum und Duell');
}

(async () => {
  const b = await chromium.launch(), t0 = Date.now();
  for (const [k, fn] of [['duel', duelSmoke], ['table', tableSmoke], ['formats', formats], ['online', online]]) {
    if (!want(k)) continue; log('▶', k);
    try { await fn(b); } catch(e) { fail(k, 'abgebrochen: ' + e.message.split('\n')[0]); }
  }
  await b.close();
  log(`\nFertig in ${Math.round((Date.now() - t0)/1000)} s: ${fails.length ? fails.length + ' Fehler' : 'alles grün'}`);
  if (fails.length) { log(fails.join('\n')); process.exit(1); }
  process.exit(0);
})();
