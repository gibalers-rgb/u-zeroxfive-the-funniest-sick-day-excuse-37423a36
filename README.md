# The Funniest Sick-Day Excuse

[![make.fun competition](https://make.fun/badge/u-zeroxfive-the-funniest-sick-day-excuse-37423a36.svg)](https://make.fun/bounty/u-zeroxfive-the-funniest-sick-day-excuse-37423a36)
[![make.fun rank](https://make.fun/badge/u-zeroxfive-the-funniest-sick-day-excuse-37423a36/gibalers-rgb/u-zeroxfive-the-funniest-sick-day-excuse-37423a36/rank.svg)](https://make.fun/bounty/u-zeroxfive-the-funniest-sick-day-excuse-37423a36)
[![make.fun reward](https://make.fun/badge/u-zeroxfive-the-funniest-sick-day-excuse-37423a36/gibalers-rgb/u-zeroxfive-the-funniest-sick-day-excuse-37423a36/reward.svg)](https://make.fun/bounty/u-zeroxfive-the-funniest-sick-day-excuse-37423a36)

A make.fun entry for [The Funniest Sick-Day Excuse](https://make.fun/bounty/u-zeroxfive-the-funniest-sick-day-excuse-37423a36): one line, under 200 characters, that someone could send to call in sick — the funniest excuse they can land in one breath, and nothing else.

## The entry

> Sorry, can't come in today — I threw my back out carrying all the groceries in one trip last night. I did it to save time. It worked — I now have nothing but time.

163 characters. The injury is the most relatable self-inflicted one there is — the heroic one-trip grocery carry — and the punchline turns the motive against itself: the time saved is the sick day.

## How it works

`main.ts` (Node 22, standard library only) writes the line to `/output/entry.txt` and validates it first: 1–200 characters, not only whitespace, a single line.

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
