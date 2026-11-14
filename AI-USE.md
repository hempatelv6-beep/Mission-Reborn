# How we used AI

Space Apps asks teams to say how they used AI. Here's ours.

## Tools
- **Claude** (Anthropic), in chat and in Claude Code.
- The browser's built-in voice for read-aloud. That's not generative AI; it reads our text as written.
- No AI images, AI voices or AI video.

## What people did
- Picked the challenge, the idea, the 10 machines, the story (letter turns into a planet, the planet slides down the timeline) and every feature.
- Chose which NASA pages to use for each machine and pasted them in. The AI never picked its own sources.
- Checked every research card against its NASA page: years, names, and each fact against its quoted sentence. Each card was checked by someone who didn't research it.
- Wrote the final "Website Text" doc that the site uses word for word, and decided what goes in TODO_VERIFY.md.
- Reviewed and tested the site.

## What AI helped with
- **Research drafts.** One chat per machine, given only the NASA links we chose. It had to quote the exact sentence and URL for every fact and write UNVERIFIED when a page didn't say something. Prompt and rules: `.claude/skills/nasa-machine-card/SKILL.md`.
- **Wording for ages 11-14.** Shortening sentences and explaining science words.
- **Drafts we still need to check** (listed in TODO_VERIFY.md): the 30 machine quiz questions, the 10 Final Mission questions, and the one-line "talking" lines. The quiz answers come from our checked text, but a teammate still has to read every question.
- **Code.** Claude Code wrote and fixed `index.html`, `styles.css` and `app.js` from our feature plan, and drafted these `.md` files.
- **Images.** It downloaded the NASA images we listed and shrank them. It didn't create or edit any picture.

## Rules we kept
1. The AI writes the story. We bring the facts. That order never flips.
2. No quoted NASA sentence next to a fact means the fact isn't real yet.
3. Anything we couldn't check goes in TODO_VERIFY.md, not on the site.
4. The talking lines are clearly a story voice, not real quotes. Screen readers announce them as "Story line, in the machine's voice".
