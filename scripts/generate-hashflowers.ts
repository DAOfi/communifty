import * as fs from 'fs'
const numTokens: number = 100
const meta: any[] = [
  {
    name: 'Hashflower 047',
    block: '5 (Signet Marigolds)',
    scale: 'Acoustic',
    melody:
      '[D6, F#4, C5, A5, Bb4, F#4, E4, Bb5, F#4, Bb4, D4, C6, C4, F#5, E5, F#4, D6, C4, D5, G5, F#5, E4, E5, G5, D4, F#5, E4, A5, C5, C4, D5, Bb5, E5, A5, F#5, F#5, F#4, C6, C6, D4, E5, Bb5, D4, C6, C6, D5, Bb5, E4, F#5, C4, E4, Bb4, D4, E4, G5, D6, D6, C6, G4, E5, D6, C4, F#5, E5 ]',
  },
  {
    name: 'Hashflower 077',
    block: '6 (Roses)',
    scale: 'Dorian',
    melody:
      '[D4, D6, D4, F5, C6, Bb5, D5, C6, F4, Bb4, Eb5, G4, F5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F5, D4, Bb5, D6, G5, F5, A5, Bb5, C4, G5, Bb4, Eb5, F4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 094',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Nikriz',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 018',
    block: '2 (Pansies)',
    scale: 'Lydian',
    melody:
      '[G5, G4, E5, A4, F#5, D4, B5, C5, C6, B4, B4, B4, F#4, D4, A4, E4, F#5, C6, E5, E4, C5, C4, D5, B5, F#5, G4, D5, G4, F#4, F#4, F#4, C5, G5, E5, A4, D5, D4, G4, B4, C4, D4, A4, F#5, E4, D5, C4, E4, D6, G4, D4, E5, F#4, F#5, G4, D4, C4, C4, G4, G4, B4, E5, D5, A5, E5 ]',
  },
  {
    name: 'Hashflower 093',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Nikriz',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 002',
    block: '0 (Poppies)',
    scale: 'Dorian',
    melody:
      '[Bb5, G4, C6, A4, Bb4, C5, G4, C4, D6, D5, C5, Bb4, F5, C6, D6, D5, A5, C4, D4, C4, G5, D5, Bb4, F5, G4, C4, Bb5, A4, D6, A4, Bb4, C5, G4, A4, F5, D4, D4, D5, Bb5, C4, Eb5, C4, Bb4, F5, F4, G4, C6, Bb4, Eb5, F5, C6, A5, D5, A5, C4, Bb5, G5, D4, A5, G5, D5, D6, F5, F4 ]',
  },
  {
    name: 'Hashflower 040',
    block: '4 (Peonies)',
    scale: 'Lydian',
    melody:
      '[E4, F#4, F#5, B5, D6, A4, F#5, F#4, G5, C6, C4, D6, A4, E4, F#4, A4, G5, F#4, B4, E5, G4, D4, G5, A5, G5, E4, E5, G5, B4, E4, A4, C4, G4, E4, C5, D5, C6, A5, A4, G5, E5, A5, B5, D6, F#5, E4, C5, C5, G5, E5, E5, E4, G5, F#5, G4, F#5, C5, F#5, F#4, A5, B5, F#4, F#5, E4 ]',
  },
  {
    name: 'Hashflower 001',
    block: '0 (Poppies)',
    scale: 'Dorian',
    melody:
      '[Bb5, G4, C6, A4, Bb4, C5, G4, C4, D6, D5, C5, Bb4, F5, C6, D6, D5, A5, C4, D4, C4, G5, D5, Bb4, F5, G4, C4, Bb5, A4, D6, A4, Bb4, C5, G4, A4, F5, D4, D4, D5, Bb5, C4, Eb5, C4, Bb4, F5, F4, G4, C6, Bb4, Eb5, F5, C6, A5, D5, A5, C4, Bb5, G5, D4, A5, G5, D5, D6, F5, F4 ]',
  },
  {
    name: 'Hashflower 076',
    block: '6 (Roses)',
    scale: 'Dorian',
    melody:
      '[D4, D6, D4, F5, C6, Bb5, D5, C6, F4, Bb4, Eb5, G4, F5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F5, D4, Bb5, D6, G5, F5, A5, Bb5, C4, G5, Bb4, Eb5, F4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 080',
    block: '6 (Roses)',
    scale: 'Dorian',
    melody:
      '[D4, D6, D4, F5, C6, Bb5, D5, C6, F4, Bb4, Eb5, G4, F5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F5, D4, Bb5, D6, G5, F5, A5, Bb5, C4, G5, Bb4, Eb5, F4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 050',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 073',
    block: '6 (Roses)',
    scale: 'Dorian',
    melody:
      '[D4, D6, D4, F5, C6, Bb5, D5, C6, F4, Bb4, Eb5, G4, F5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F5, D4, Bb5, D6, G5, F5, A5, Bb5, C4, G5, Bb4, Eb5, F4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 086',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Lydian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 026',
    block: '3 (Tulips)',
    scale: 'Hex Sus',
    melody:
      '[G4, D6, C5, D4, F4, F4, C5, C5, C4, C6, C6, F5, F4, A4, G4, D5, C5, G6, D4, D4, F6, F6, F5, A4, F4, G6, F5, G4, A5, D6, D6, C6, G4, Bb4, F4, Bb4, F6, F4, D6, D6, C5, D5, Bb4, C5, Bb5, G5, Bb5, C6, G6, C4, A5, G6, G6, A5, C5, A5, A5, F5, F5, C6, G6, D5, A4, D4 ]',
  },
  {
    name: 'Hashflower 100',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody: 'Ghost',
  },
  {
    name: 'Hashflower 034',
    block: '3 (Tulips)',
    scale: 'Aeolian',
    melody:
      '[F4, Bb5, Bb4, D4, Eb4, Eb4, Bb4, Bb4, C4, Ab5, Ab5, D5, Eb4, G4, F4, C5, Bb4, D6, D4, D4, C6, C6, D5, G4, Eb4, D6, D5, F4, F5, Bb5, Bb5, Ab5, F4, Ab4, Eb4, Ab4, C6, Eb4, Bb5, Bb5, Bb4, C5, Ab4, Bb4, G5, Eb5, G5, Ab5, D6, C4, F5, D6, D6, F5, Bb4, F5, F5, D5, D5, Ab5, D6, C5, G4, D4 ]',
  },
  {
    name: 'Hashflower 091',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Ionian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 090',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Ionian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 032',
    block: '3 (Tulips)',
    scale: 'Phrygian',
    melody:
      '[F4, Bb5, Bb4, C#4, Eb4, Eb4, Bb4, Bb4, C4, Ab5, Ab5, C#5, Eb4, G4, F4, C5, Bb4, C#6, C#4, C#4, C6, C6, C#5, G4, Eb4, C#6, C#5, F4, F5, Bb5, Bb5, Ab5, F4, Ab4, Eb4, Ab4, C6, Eb4, Bb5, Bb5, Bb4, C5, Ab4, Bb4, G5, Eb5, G5, Ab5, C#6, C4, F5, C#6, C#6, F5, Bb4, F5, F5, C#5, C#5, Ab5, C#6, C5, G4, C#4 ]',
  },
  {
    name: 'Hashflower 087',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Lydian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 070',
    block: '5 (Signet Marigolds)',
    scale: 'Hex Aeolian',
    melody:
      '[G6, G4, Eb5, C6, C5, G4, F4, Eb6, G4, C5, Eb4, F6, C4, Ab5, G5, G4, G6, C4, F5, Bb5, Ab5, F4, G5, Bb5, Eb4, Ab5, F4, C6, Eb5, C4, F5, Eb6, G5, C6, Ab5, Ab5, G4, F6, F6, Eb4, G5, Eb6, Eb4, F6, F6, F5, Eb6, F4, Ab5, C4, F4, C5, Eb4, F4, Bb5, G6, G6, F6, Ab4, G5, G6, C4, Ab5, G5 ]',
  },
  {
    name: 'Hashflower 069',
    block: '5 (Signet Marigolds)',
    scale: 'Hex Aeolian',
    melody:
      '[G6, G4, Eb5, C6, C5, G4, F4, Eb6, G4, C5, Eb4, F6, C4, Ab5, G5, G4, G6, C4, F5, Bb5, Ab5, F4, G5, Bb5, Eb4, Ab5, F4, C6, Eb5, C4, F5, Eb6, G5, C6, Ab5, Ab5, G4, F6, F6, Eb4, G5, Eb6, Eb4, F6, F6, F5, Eb6, F4, Ab5, C4, F4, C5, Eb4, F4, Bb5, G6, G6, F6, Ab4, G5, G6, C4, Ab5, G5 ]',
  },
  {
    name: 'Hashflower 016',
    block: '2 (Pansies)',
    scale: 'Nikriz',
    melody:
      '[G5, G4, Eb5, A4, F#5, D4, Bb5, C5, C6, Bb4, Bb4, Bb4, F#4, D4, A4, Eb4, F#5, C6, Eb5, Eb4, C5, C4, D5, Bb5, F#5, G4, D5, G4, F#4, F#4, F#4, C5, G5, Eb5, A4, D5, D4, G4, Bb4, C4, D4, A4, F#5, Eb4, D5, C4, Eb4, D6, G4, D4, Eb5, F#4, F#5, G4, D4, C4, C4, G4, G4, Bb4, Eb5, D5, A5, Eb5 ]',
  },
  {
    name: 'Hashflower 049',
    block: '5 (Signet Marigolds)',
    scale: 'Acoustic',
    melody:
      '[D6, F#4, C5, A5, Bb4, F#4, E4, Bb5, F#4, Bb4, D4, C6, C4, F#5, E5, F#4, D6, C4, D5, G5, F#5, E4, E5, G5, D4, F#5, E4, A5, C5, C4, D5, Bb5, E5, A5, F#5, F#5, F#4, C6, C6, D4, E5, Bb5, D4, C6, C6, D5, Bb5, E4, F#5, C4, E4, Bb4, D4, E4, G5, D6, D6, C6, G4, E5, D6, C4, F#5, E5 ]',
  },
  {
    name: 'Hashflower 064',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 068',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 042',
    block: '4 (Peonies)',
    scale: 'Lydian',
    melody:
      '[E4, F#4, F#5, B5, D6, A4, F#5, F#4, G5, C6, C4, D6, A4, E4, F#4, A4, G5, F#4, B4, E5, G4, D4, G5, A5, G5, E4, E5, G5, B4, E4, A4, C4, G4, E4, C5, D5, C6, A5, A4, G5, E5, A5, B5, D6, F#5, E4, C5, C5, G5, E5, E5, E4, G5, F#5, G4, F#5, C5, F#5, F#4, A5, B5, F#4, F#5, E4 ]',
  },
  {
    name: 'Hashflower 019',
    block: '2 (Pansies)',
    scale: 'Shang',
    melody:
      '[D6, Bb4, Bb5, C5, C6, D4, G6, F5, Bb6, D5, D5, D5, G4, D4, C5, F4, C6, Bb6, Bb5, F4, F5, C4, G5, G6, C6, Bb4, G5, Bb4, G4, G4, G4, F5, D6, Bb5, C5, G5, D4, Bb4, D5, C4, D4, C5, C6, F4, G5, C4, F4, C7, Bb4, D4, Bb5, G4, C6, Bb4, D4, C4, C4, Bb4, Bb4, D5, Bb5, G5, F6, Bb5 ]',
  },
  {
    name: 'Hashflower 063',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 020',
    block: '2 (Pansies)',
    scale: 'Shang',
    melody:
      '[D6, Bb4, Bb5, C5, C6, D4, G6, F5, Bb6, D5, D5, D5, G4, D4, C5, F4, C6, Bb6, Bb5, F4, F5, C4, G5, G6, C6, Bb4, G5, Bb4, G4, G4, G4, F5, D6, Bb5, C5, G5, D4, Bb4, D5, C4, D4, C5, C6, F4, G5, C4, F4, C7, Bb4, D4, Bb5, G4, C6, Bb4, D4, C4, C4, Bb4, Bb4, D5, Bb5, G5, F6, Bb5 ]',
  },
  {
    name: 'Hashflower 055',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 098',
    block: '3 (Tulips)',
    scale: 'Aeolian',
    melody: 'Ghost',
  },
  {
    name: 'Hashflower 078',
    block: '6 (Roses)',
    scale: 'Dorian',
    melody:
      '[D4, D6, D4, F5, C6, Bb5, D5, C6, F4, Bb4, Eb5, G4, F5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F5, D4, Bb5, D6, G5, F5, A5, Bb5, C4, G5, Bb4, Eb5, F4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 023',
    block: '3 (Tulips)',
    scale: 'Hex Phrygian',
    melody:
      '[F4, C#6, C5, C#4, Eb4, Eb4, C5, C5, C4, C6, C6, Eb5, Eb4, Ab4, F4, C#5, C5, F6, C#4, C#4, Eb6, Eb6, Eb5, Ab4, Eb4, F6, Eb5, F4, Ab5, C#6, C#6, C6, F4, Bb4, Eb4, Bb4, Eb6, Eb4, C#6, C#6, C5, C#5, Bb4, C5, Bb5, F5, Bb5, C6, F6, C4, Ab5, F6, F6, Ab5, C5, Ab5, Ab5, Eb5, Eb5, C6, F6, C#5, Ab4, C#4 ]',
  },
  {
    name: 'Hashflower 029',
    block: '3 (Tulips)',
    scale: 'Raag Dhani',
    melody:
      '[G4, G6, E5, E4, F4, F4, E5, E5, C4, F6, F6, G5, F4, Bb4, G4, F5, E5, C7, E4, E4, Bb6, Bb6, G5, Bb4, F4, C7, G5, G4, C6, G6, G6, F6, G4, C5, F4, C5, Bb6, F4, G6, G6, E5, F5, C5, E5, E6, Bb5, E6, F6, C7, C4, C6, C7, C7, C6, E5, C6, C6, G5, G5, F6, C7, F5, Bb4, E4 ]',
  },
  {
    name: 'Hashflower 074',
    block: '6 (Roses)',
    scale: 'Dorian',
    melody:
      '[D4, D6, D4, F5, C6, Bb5, D5, C6, F4, Bb4, Eb5, G4, F5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F5, D4, Bb5, D6, G5, F5, A5, Bb5, C4, G5, Bb4, Eb5, F4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 053',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 043',
    block: '4 (Peonies)',
    scale: 'Lydian',
    melody:
      '[E4, F#4, F#5, B5, D6, A4, F#5, F#4, G5, C6, C4, D6, A4, E4, F#4, A4, G5, F#4, B4, E5, G4, D4, G5, A5, G5, E4, E5, G5, B4, E4, A4, C4, G4, E4, C5, D5, C6, A5, A4, G5, E5, A5, B5, D6, F#5, E4, C5, C5, G5, E5, E5, E4, G5, F#5, G4, F#5, C5, F#5, F#4, A5, B5, F#4, F#5, E4 ]',
  },
  {
    name: 'Hashflower 045',
    block: '4 (Peonies)',
    scale: 'Lydian',
    melody:
      '[E4, F#4, F#5, B5, D6, A4, F#5, F#4, G5, C6, C4, D6, A4, E4, F#4, A4, G5, F#4, B4, E5, G4, D4, G5, A5, G5, E4, E5, G5, B4, E4, A4, C4, G4, E4, C5, D5, C6, A5, A4, G5, E5, A5, B5, D6, F#5, E4, C5, C5, G5, E5, E5, E4, G5, F#5, G4, F#5, C5, F#5, F#4, A5, B5, F#4, F#5, E4 ]',
  },
  {
    name: 'Hashflower 013',
    block: '1 (Black Eyed Susans)',
    scale: 'Pelog',
    melody:
      '[G5, G5, Ab6, Ab5, C#5, G6, Ab4, C5, G4, Eb5, C#6, Ab6, C6, Ab4, G6, Ab5, Eb6, C4, C5, G6, C#4, Eb4, C5, Ab4, Ab5, Ab5, C4, Eb5, C#6, G4, Eb4, C5, C#5, C#4, G6, G4, C#6, C7, G4, C#4, C7, Ab4, C5, C6, C6, Ab6, Eb5, G4, Ab4, Eb6, G6, Eb6, C#4, C#4, Ab5, C7, C#4, G4, Ab4, C4, C#5, Eb6, C#6, C#5 ]',
  },
  {
    name: 'Hashflower 067',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 044',
    block: '4 (Peonies)',
    scale: 'Lydian',
    melody:
      '[E4, F#4, F#5, B5, D6, A4, F#5, F#4, G5, C6, C4, D6, A4, E4, F#4, A4, G5, F#4, B4, E5, G4, D4, G5, A5, G5, E4, E5, G5, B4, E4, A4, C4, G4, E4, C5, D5, C6, A5, A4, G5, E5, A5, B5, D6, F#5, E4, C5, C5, G5, E5, E5, E4, G5, F#5, G4, F#5, C5, F#5, F#4, A5, B5, F#4, F#5, E4 ]',
  },
  {
    name: 'Hashflower 085',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Lydian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 060',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 088',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Lydian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 057',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 022',
    block: '2 (Pansies)',
    scale: 'Hex Aeolian',
    melody:
      '[Bb5, Ab4, G5, Bb4, Ab5, Eb4, Eb6, Eb5, F6, C5, C5, C5, G4, Eb4, Bb4, F4, Ab5, F6, G5, F4, Eb5, C4, F5, Eb6, Ab5, Ab4, F5, Ab4, G4, G4, G4, Eb5, Bb5, G5, Bb4, F5, Eb4, Ab4, C5, C4, Eb4, Bb4, Ab5, F4, F5, C4, F4, G6, Ab4, Eb4, G5, G4, Ab5, Ab4, Eb4, C4, C4, Ab4, Ab4, C5, G5, F5, C6, G5 ]',
  },
  {
    name: 'Hashflower 021',
    block: '2 (Pansies)',
    scale: 'Hex Aeolian',
    melody:
      '[Bb5, Ab4, G5, Bb4, Ab5, Eb4, Eb6, Eb5, F6, C5, C5, C5, G4, Eb4, Bb4, F4, Ab5, F6, G5, F4, Eb5, C4, F5, Eb6, Ab5, Ab4, F5, Ab4, G4, G4, G4, Eb5, Bb5, G5, Bb4, F5, Eb4, Ab4, C5, C4, Eb4, Bb4, Ab5, F4, F5, C4, F4, G6, Ab4, Eb4, G5, G4, Ab5, Ab4, Eb4, C4, C4, Ab4, Ab4, C5, G5, F5, C6, G5 ]',
  },
  {
    name: 'Hashflower 065',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 024',
    block: '3 (Tulips)',
    scale: 'Hex Phrygian',
    melody:
      '[F4, C#6, C5, C#4, Eb4, Eb4, C5, C5, C4, C6, C6, Eb5, Eb4, Ab4, F4, C#5, C5, F6, C#4, C#4, Eb6, Eb6, Eb5, Ab4, Eb4, F6, Eb5, F4, Ab5, C#6, C#6, C6, F4, Bb4, Eb4, Bb4, Eb6, Eb4, C#6, C#6, C5, C#5, Bb4, C5, Bb5, F5, Bb5, C6, F6, C4, Ab5, F6, F6, Ab5, C5, Ab5, Ab5, Eb5, Eb5, C6, F6, C#5, Ab4, C#4 ]',
  },
  {
    name: 'Hashflower 015',
    block: '2 (Pansies)',
    scale: 'Nikriz',
    melody:
      '[G5, G4, Eb5, A4, F#5, D4, Bb5, C5, C6, Bb4, Bb4, Bb4, F#4, D4, A4, Eb4, F#5, C6, Eb5, Eb4, C5, C4, D5, Bb5, F#5, G4, D5, G4, F#4, F#4, F#4, C5, G5, Eb5, A4, D5, D4, G4, Bb4, C4, D4, A4, F#5, Eb4, D5, C4, Eb4, D6, G4, D4, Eb5, F#4, F#5, G4, D4, C4, C4, G4, G4, Bb4, Eb5, D5, A5, Eb5 ]',
  },
  {
    name: 'Hashflower 035',
    block: '3 (Tulips)',
    scale: 'Aeolian',
    melody:
      '[F4, Bb5, Bb4, D4, Eb4, Eb4, Bb4, Bb4, C4, Ab5, Ab5, D5, Eb4, G4, F4, C5, Bb4, D6, D4, D4, C6, C6, D5, G4, Eb4, D6, D5, F4, F5, Bb5, Bb5, Ab5, F4, Ab4, Eb4, Ab4, C6, Eb4, Bb5, Bb5, Bb4, C5, Ab4, Bb4, G5, Eb5, G5, Ab5, D6, C4, F5, D6, D6, F5, Bb4, F5, F5, D5, D5, Ab5, D6, C5, G4, D4 ]',
  },
  {
    name: 'Hashflower 059',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 030',
    block: '3 (Tulips)',
    scale: 'Raag Dhani',
    melody:
      '[G4, G6, E5, E4, F4, F4, E5, E5, C4, F6, F6, G5, F4, Bb4, G4, F5, E5, C7, E4, E4, Bb6, Bb6, G5, Bb4, F4, C7, G5, G4, C6, G6, G6, F6, G4, C5, F4, C5, Bb6, F4, G6, G6, E5, F5, C5, E5, E6, Bb5, E6, F6, C7, C4, C6, C7, C7, C6, E5, C6, C6, G5, G5, F6, C7, F5, Bb4, E4 ]',
  },
  {
    name: 'Hashflower 005',
    block: '1 (Black Eyed Susans)',
    scale: 'Ionian',
    melody:
      '[D5, D5, C6, E5, B4, B5, G4, A4, F4, C5, G5, C6, F5, G4, B5, E5, A5, C4, A4, B5, D4, E4, A4, G4, E5, E5, C4, C5, G5, F4, E4, A4, B4, D4, B5, F4, G5, D6, F4, D4, D6, G4, A4, F5, F5, C6, C5, F4, G4, A5, B5, A5, D4, D4, E5, D6, D4, F4, G4, C4, B4, A5, G5, B4 ]',
  },
  {
    name: 'Hashflower 095',
    block: '0 (Poppies)',
    scale: 'Dorian',
    melody: 'Ghost',
  },
  {
    name: 'Hashflower 011',
    block: '1 (Black Eyed Susans)',
    scale: 'Hex Aeolian',
    melody:
      '[F5, F5, F6, G5, C5, Eb6, Ab4, Bb4, G4, Eb5, Bb5, F6, Ab5, Ab4, Eb6, G5, C6, C4, Bb4, Eb6, Eb4, F4, Bb4, Ab4, G5, G5, C4, Eb5, Bb5, G4, F4, Bb4, C5, Eb4, Eb6, G4, Bb5, G6, G4, Eb4, G6, Ab4, Bb4, Ab5, Ab5, F6, Eb5, G4, Ab4, C6, Eb6, C6, Eb4, Eb4, G5, G6, Eb4, G4, Ab4, C4, C5, C6, Bb5, C5 ]',
  },
  {
    name: 'Hashflower 039',
    block: '4 (Peonies)',
    scale: 'Hex Aeolian',
    melody:
      '[F4, G4, Ab5, Eb6, G6, Bb4, Ab5, G4, Bb5, F6, C4, G6, Bb4, F4, G4, Bb4, Bb5, G4, C5, G5, Ab4, Eb4, Bb5, C6, Bb5, F4, G5, Bb5, C5, F4, Bb4, C4, Ab4, F4, Eb5, F5, F6, C6, Bb4, Bb5, G5, C6, Eb6, G6, Ab5, F4, Eb5, Eb5, Bb5, G5, G5, F4, Bb5, Ab5, Ab4, Ab5, Eb5, Ab5, G4, C6, Eb6, G4, Ab5, F4 ]',
  },
  {
    name: 'Hashflower 062',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 012',
    block: '1 (Black Eyed Susans)',
    scale: 'Pelog',
    melody:
      '[G5, G5, Ab6, Ab5, C#5, G6, Ab4, C5, G4, Eb5, C#6, Ab6, C6, Ab4, G6, Ab5, Eb6, C4, C5, G6, C#4, Eb4, C5, Ab4, Ab5, Ab5, C4, Eb5, C#6, G4, Eb4, C5, C#5, C#4, G6, G4, C#6, C7, G4, C#4, C7, Ab4, C5, C6, C6, Ab6, Eb5, G4, Ab4, Eb6, G6, Eb6, C#4, C#4, Ab5, C7, C#4, G4, Ab4, C4, C#5, Eb6, C#6, C#5 ]',
  },
  {
    name: 'Hashflower 084',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Aeolian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 010',
    block: '1 (Black Eyed Susans)',
    scale: 'Hex Aeolian',
    melody:
      '[F5, F5, F6, G5, C5, Eb6, Ab4, Bb4, G4, Eb5, Bb5, F6, Ab5, Ab4, Eb6, G5, C6, C4, Bb4, Eb6, Eb4, F4, Bb4, Ab4, G5, G5, C4, Eb5, Bb5, G4, F4, Bb4, C5, Eb4, Eb6, G4, Bb5, G6, G4, Eb4, G6, Ab4, Bb4, Ab5, Ab5, F6, Eb5, G4, Ab4, C6, Eb6, C6, Eb4, Eb4, G5, G6, Eb4, G4, Ab4, C4, C5, C6, Bb5, C5 ]',
  },
  {
    name: 'Hashflower 003',
    block: '1 (Black Eyed Susans)',
    scale: 'Mixed Minor',
    melody:
      '[D5, D5, C6, Eb5, Bb4, B5, G4, A4, F4, C5, G5, C6, F5, G4, B5, Eb5, A5, C4, A4, B5, D4, Eb4, A4, G4, Eb5, Eb5, C4, C5, G5, F4, Eb4, A4, B4, D4, B5, F4, G5, D6, F4, D4, D6, G4, A4, F5, F5, C6, C5, F4, G4, A5, B5, A5, D4, D4, Eb5, D6, D4, F4, G4, C4, B4, A5, G5, Bb4 ]',
  },
  {
    name: 'Hashflower 066',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 099',
    block: '4 (Peonies)',
    scale: 'Lydian',
    melody: 'Ghost',
  },
  {
    name: 'Hashflower 056',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 083',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Aeolian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 061',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 071',
    block: '5 (Signet Marigolds)',
    scale: 'Melodic Minor Ascending',
    melody:
      '[D6, F4, C5, A5, B4, F4, Eb4, B5, F4, B4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, B5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, B5, D4, C6, C6, D5, B5, Eb4, F5, C4, Eb4, B4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 036',
    block: '4 (Peonies)',
    scale: 'Gong',
    melody:
      '[E4, G4, C6, G6, C7, C5, C6, G4, D6, A6, C4, C7, C5, E4, G4, C5, D6, G4, D5, A5, A4, D4, D6, E6, D6, E4, A5, D6, D5, E4, C5, C4, A4, E4, E5, G5, A6, E6, C5, D6, A5, E6, G6, C7, C6, E4, E5, E5, D6, A5, A5, E4, D6, C6, A4, C6, E5, C6, G4, E6, G6, G4, C6, E4 ]',
  },
  {
    name: 'Hashflower 004',
    block: '1 (Black Eyed Susans)',
    scale: 'Ionian',
    melody:
      '[D5, D5, C6, E5, B4, B5, G4, A4, F4, C5, G5, C6, F5, G4, B5, E5, A5, C4, A4, B5, D4, E4, A4, G4, E5, E5, C4, C5, G5, F4, E4, A4, B4, D4, B5, F4, G5, D6, F4, D4, D6, G4, A4, F5, F5, C6, C5, F4, G4, A5, B5, A5, D4, D4, E5, D6, D4, F4, G4, C4, B4, A5, G5, B4 ]',
  },
  {
    name: 'Hashflower 017',
    block: '2 (Pansies)',
    scale: 'Nikriz',
    melody:
      '[G5, G4, Eb5, A4, F#5, D4, Bb5, C5, C6, Bb4, Bb4, Bb4, F#4, D4, A4, Eb4, F#5, C6, Eb5, Eb4, C5, C4, D5, Bb5, F#5, G4, D5, G4, F#4, F#4, F#4, C5, G5, Eb5, A4, D5, D4, G4, Bb4, C4, D4, A4, F#5, Eb4, D5, C4, Eb4, D6, G4, D4, Eb5, F#4, F#5, G4, D4, C4, C4, G4, G4, Bb4, Eb5, D5, A5, Eb5 ]',
  },
  {
    name: 'Hashflower 051',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 052',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 028',
    block: '3 (Tulips)',
    scale: 'Hex Sus',
    melody:
      '[G4, D6, C5, D4, F4, F4, C5, C5, C4, C6, C6, F5, F4, A4, G4, D5, C5, G6, D4, D4, F6, F6, F5, A4, F4, G6, F5, G4, A5, D6, D6, C6, G4, Bb4, F4, Bb4, F6, F4, D6, D6, C5, D5, Bb4, C5, Bb5, G5, Bb5, C6, G6, C4, A5, G6, G6, A5, C5, A5, A5, F5, F5, C6, G6, D5, A4, D4 ]',
  },
  {
    name: 'Hashflower 075',
    block: '6 (Roses)',
    scale: 'Dorian',
    melody:
      '[D4, D6, D4, F5, C6, Bb5, D5, C6, F4, Bb4, Eb5, G4, F5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F5, D4, Bb5, D6, G5, F5, A5, Bb5, C4, G5, Bb4, Eb5, F4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 048',
    block: '5 (Signet Marigolds)',
    scale: 'Acoustic',
    melody:
      '[D6, F#4, C5, A5, Bb4, F#4, E4, Bb5, F#4, Bb4, D4, C6, C4, F#5, E5, F#4, D6, C4, D5, G5, F#5, E4, E5, G5, D4, F#5, E4, A5, C5, C4, D5, Bb5, E5, A5, F#5, F#5, F#4, C6, C6, D4, E5, Bb5, D4, C6, C6, D5, Bb5, E4, F#5, C4, E4, Bb4, D4, E4, G5, D6, D6, C6, G4, E5, D6, C4, F#5, E5 ]',
  },
  {
    name: 'Hashflower 038',
    block: '4 (Peonies)',
    scale: 'Hex Aeolian',
    melody:
      '[F4, G4, Ab5, Eb6, G6, Bb4, Ab5, G4, Bb5, F6, C4, G6, Bb4, F4, G4, Bb4, Bb5, G4, C5, G5, Ab4, Eb4, Bb5, C6, Bb5, F4, G5, Bb5, C5, F4, Bb4, C4, Ab4, F4, Eb5, F5, F6, C6, Bb4, Bb5, G5, C6, Eb6, G6, Ab5, F4, Eb5, Eb5, Bb5, G5, G5, F4, Bb5, Ab5, Ab4, Ab5, Eb5, Ab5, G4, C6, Eb6, G4, Ab5, F4 ]',
  },
  {
    name: 'Hashflower 089',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Ionian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 054',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 096',
    block: '1 (Black Eyed Susans)',
    scale: 'Ionian',
    melody: 'Ghost',
  },
  {
    name: 'Hashflower 092',
    block: 'Enigma (Scorpian Grasses)',
    scale: 'Ionian',
    melody: 'Mystery',
  },
  {
    name: 'Hashflower 014',
    block: '1 (Black Eyed Susans)',
    scale: 'Pelog',
    melody:
      '[G5, G5, Ab6, Ab5, C#5, G6, Ab4, C5, G4, Eb5, C#6, Ab6, C6, Ab4, G6, Ab5, Eb6, C4, C5, G6, C#4, Eb4, C5, Ab4, Ab5, Ab5, C4, Eb5, C#6, G4, Eb4, C5, C#5, C#4, G6, G4, C#6, C7, G4, C#4, C7, Ab4, C5, C6, C6, Ab6, Eb5, G4, Ab4, Eb6, G6, Eb6, C#4, C#4, Ab5, C7, C#4, G4, Ab4, C4, C#5, Eb6, C#6, C#5 ]',
  },
  {
    name: 'Hashflower 097',
    block: '2 (Pansies)',
    scale: 'Nikriz',
    melody: 'Ghost',
  },
  {
    name: 'Hashflower 031',
    block: '3 (Tulips)',
    scale: 'Phrygian',
    melody:
      '[F4, Bb5, Bb4, C#4, Eb4, Eb4, Bb4, Bb4, C4, Ab5, Ab5, C#5, Eb4, G4, F4, C5, Bb4, C#6, C#4, C#4, C6, C6, C#5, G4, Eb4, C#6, C#5, F4, F5, Bb5, Bb5, Ab5, F4, Ab4, Eb4, Ab4, C6, Eb4, Bb5, Bb5, Bb4, C5, Ab4, Bb4, G5, Eb5, G5, Ab5, C#6, C4, F5, C#6, C#6, F5, Bb4, F5, F5, C#5, C#5, Ab5, C#6, C5, G4, C#4 ]',
  },
  {
    name: 'Hashflower 082',
    block: '6 (Roses)',
    scale: 'Dorian',
    melody:
      '[D4, D6, D4, F5, C6, Bb5, D5, C6, F4, Bb4, Eb5, G4, F5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F5, D4, Bb5, D6, G5, F5, A5, Bb5, C4, G5, Bb4, Eb5, F4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 046',
    block: '4 (Peonies)',
    scale: 'Lydian',
    melody:
      '[E4, F#4, F#5, B5, D6, A4, F#5, F#4, G5, C6, C4, D6, A4, E4, F#4, A4, G5, F#4, B4, E5, G4, D4, G5, A5, G5, E4, E5, G5, B4, E4, A4, C4, G4, E4, C5, D5, C6, A5, A4, G5, E5, A5, B5, D6, F#5, E4, C5, C5, G5, E5, E5, E4, G5, F#5, G4, F#5, C5, F#5, F#4, A5, B5, F#4, F#5, E4 ]',
  },
  {
    name: 'Hashflower 009',
    block: '1 (Black Eyed Susans)',
    scale: 'Scriabin',
    melody:
      '[G5, G5, A6, A5, C#5, G6, A4, C5, G4, E5, C#6, A6, C6, A4, G6, A5, E6, C4, C5, G6, C#4, E4, C5, A4, A5, A5, C4, E5, C#6, G4, E4, C5, C#5, C#4, G6, G4, C#6, C7, G4, C#4, C7, A4, C5, C6, C6, A6, E5, G4, A4, E6, G6, E6, C#4, C#4, A5, C7, C#4, G4, A4, C4, C#5, E6, C#6, C#5 ]',
  },
  {
    name: 'Hashflower 027',
    block: '3 (Tulips)',
    scale: 'Hex Sus',
    melody:
      '[G4, D6, C5, D4, F4, F4, C5, C5, C4, C6, C6, F5, F4, A4, G4, D5, C5, G6, D4, D4, F6, F6, F5, A4, F4, G6, F5, G4, A5, D6, D6, C6, G4, Bb4, F4, Bb4, F6, F4, D6, D6, C5, D5, Bb4, C5, Bb5, G5, Bb5, C6, G6, C4, A5, G6, G6, A5, C5, A5, A5, F5, F5, C6, G6, D5, A4, D4 ]',
  },
  {
    name: 'Hashflower 025',
    block: '3 (Tulips)',
    scale: 'Gong',
    melody:
      '[G4, G6, D5, D4, E4, E4, D5, D5, C4, E6, E6, G5, E4, A4, G4, E5, D5, C7, D4, D4, A6, A6, G5, A4, E4, C7, G5, G4, C6, G6, G6, E6, G4, C5, E4, C5, A6, E4, G6, G6, D5, E5, C5, D5, D6, A5, D6, E6, C7, C4, C6, C7, C7, C6, D5, C6, C6, G5, G5, E6, C7, E5, A4, D4 ]',
  },
  {
    name: 'Hashflower 081',
    block: '6 (Roses)',
    scale: 'Dorian',
    melody:
      '[D4, D6, D4, F5, C6, Bb5, D5, C6, F4, Bb4, Eb5, G4, F5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F5, D4, Bb5, D6, G5, F5, A5, Bb5, C4, G5, Bb4, Eb5, F4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 006',
    block: '1 (Black Eyed Susans)',
    scale: 'Ionian',
    melody:
      '[D5, D5, C6, E5, B4, B5, G4, A4, F4, C5, G5, C6, F5, G4, B5, E5, A5, C4, A4, B5, D4, E4, A4, G4, E5, E5, C4, C5, G5, F4, E4, A4, B4, D4, B5, F4, G5, D6, F4, D4, D6, G4, A4, F5, F5, C6, C5, F4, G4, A5, B5, A5, D4, D4, E5, D6, D4, F4, G4, C4, B4, A5, G5, B4 ]',
  },
  {
    name: 'Hashflower 041',
    block: '4 (Peonies)',
    scale: 'Lydian',
    melody:
      '[E4, F#4, F#5, B5, D6, A4, F#5, F#4, G5, C6, C4, D6, A4, E4, F#4, A4, G5, F#4, B4, E5, G4, D4, G5, A5, G5, E4, E5, G5, B4, E4, A4, C4, G4, E4, C5, D5, C6, A5, A4, G5, E5, A5, B5, D6, F#5, E4, C5, C5, G5, E5, E5, E4, G5, F#5, G4, F#5, C5, F#5, F#4, A5, B5, F#4, F#5, E4 ]',
  },
  {
    name: 'Hashflower 007',
    block: '1 (Black Eyed Susans)',
    scale: 'Ionian',
    melody:
      '[D5, D5, C6, E5, B4, B5, G4, A4, F4, C5, G5, C6, F5, G4, B5, E5, A5, C4, A4, B5, D4, E4, A4, G4, E5, E5, C4, C5, G5, F4, E4, A4, B4, D4, B5, F4, G5, D6, F4, D4, D6, G4, A4, F5, F5, C6, C5, F4, G4, A5, B5, A5, D4, D4, E5, D6, D4, F4, G4, C4, B4, A5, G5, B4 ]',
  },
  {
    name: 'Hashflower 058',
    block: '5 (Signet Marigolds)',
    scale: 'Dorian',
    melody:
      '[D6, F4, C5, A5, Bb4, F4, Eb4, Bb5, F4, Bb4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, Bb5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, Bb5, D4, C6, C6, D5, Bb5, Eb4, F5, C4, Eb4, Bb4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 008',
    block: '1 (Black Eyed Susans)',
    scale: 'Dorian',
    melody:
      '[D5, D5, C6, Eb5, Bb4, Bb5, G4, A4, F4, C5, G5, C6, F5, G4, Bb5, Eb5, A5, C4, A4, Bb5, D4, Eb4, A4, G4, Eb5, Eb5, C4, C5, G5, F4, Eb4, A4, Bb4, D4, Bb5, F4, G5, D6, F4, D4, D6, G4, A4, F5, F5, C6, C5, F4, G4, A5, Bb5, A5, D4, D4, Eb5, D6, D4, F4, G4, C4, Bb4, A5, G5, Bb4 ]',
  },
  {
    name: 'Hashflower 079',
    block: '6 (Roses)',
    scale: 'Romanian Minor',
    melody:
      '[D4, D6, D4, F#5, C6, Bb5, D5, C6, F#4, Bb4, Eb5, G4, F#5, C4, Bb4, C5, G4, Eb5, Bb4, A5, Eb4, G4, D5, C6, Bb4, D4, D5, C5, Eb5, A5, Bb5, F#5, Eb5, Eb5, G5, C4, C5, C4, Eb5, F#5, D4, Bb5, D6, G5, F#5, A5, Bb5, C4, G5, Bb4, Eb5, F#4, C5, A4, C4, Bb5, D6, C4, Bb4, G5, F#4, Eb4, Bb4, C6 ]',
  },
  {
    name: 'Hashflower 037',
    block: '4 (Peonies)',
    scale: 'Gong',
    melody:
      '[E4, G4, C6, G6, C7, C5, C6, G4, D6, A6, C4, C7, C5, E4, G4, C5, D6, G4, D5, A5, A4, D4, D6, E6, D6, E4, A5, D6, D5, E4, C5, C4, A4, E4, E5, G5, A6, E6, C5, D6, A5, E6, G6, C7, C6, E4, E5, E5, D6, A5, A5, E4, D6, C6, A4, C6, E5, C6, G4, E6, G6, G4, C6, E4 ]',
  },
  {
    name: 'Hashflower 072',
    block: '5 (Signet Marigolds)',
    scale: 'Melodic Minor Ascending',
    melody:
      '[D6, F4, C5, A5, B4, F4, Eb4, B5, F4, B4, D4, C6, C4, F5, Eb5, F4, D6, C4, D5, G5, F5, Eb4, Eb5, G5, D4, F5, Eb4, A5, C5, C4, D5, B5, Eb5, A5, F5, F5, F4, C6, C6, D4, Eb5, B5, D4, C6, C6, D5, B5, Eb4, F5, C4, Eb4, B4, D4, Eb4, G5, D6, D6, C6, G4, Eb5, D6, C4, F5, Eb5 ]',
  },
  {
    name: 'Hashflower 033',
    block: '3 (Tulips)',
    scale: 'Aeolian',
    melody:
      '[F4, Bb5, Bb4, D4, Eb4, Eb4, Bb4, Bb4, C4, Ab5, Ab5, D5, Eb4, G4, F4, C5, Bb4, D6, D4, D4, C6, C6, D5, G4, Eb4, D6, D5, F4, F5, Bb5, Bb5, Ab5, F4, Ab4, Eb4, Ab4, C6, Eb4, Bb5, Bb5, Bb4, C5, Ab4, Bb4, G5, Eb5, G5, Ab5, D6, C4, F5, D6, D6, F5, Bb4, F5, F5, D5, D5, Ab5, D6, C5, G4, D4 ]',
  },
]

for (let i = 0; i < numTokens; ++i) {
  const filename = `BLOCK_${meta[i].block.split(' ')[0].toUpperCase()}_${meta[
    i
  ].name.replace('Hashflower ', '')}_${meta[i].scale
    .toUpperCase()
    .replace(' ', '_')}.mp4`
  const metadata = {
    name: meta[i].name,
    melody: meta[i].melody,

    image: `ipfs://Qmd5x2gDjmMuCDrvsyGh9AkbwKZsnoejEVfrSvgu47mfEu/${filename}`,
    external_url: `https://communifty.mypinata.cloud/ipfs/QmZqUfh88DPvZ5uzNkB2zkRv4oM1B3XR4tgfeVPnjW5vLM/${filename}`,
    attributes: [
      { trait_type: 'Hashflowers', value: `All Hashflowers` },
      { trait_type: 'Hashflowers', value: `Scale: ${meta[i].scale}` },
      { trait_type: 'Hashflowers', value: `Block: ${meta[i].block}` },
    ],
  }
  if (meta[i].melody === 'Ghost') {
    metadata.attributes.push({ trait_type: 'Hashflowers', value: `Ghost` })
  }
  fs.writeFileSync(`hashflowers_metadata/${i + 1}`, JSON.stringify(metadata))
}
