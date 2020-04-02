export const TRACKS = ['Kick', 'Snare', 'Open Hat', 'Closed Hat']
export const SEQUENCE_NAMES = ['Sequence 1', 'Sequence 2', 'Sequence 3', 'None']
export const SEQUENCES = {
  'Sequence 1': {
    Kick:         [false, true, false, false, true, true, false, true, false, false, false, false, true, false, true, false],
    Snare:        [true, true, false, true, false, true, false, true, false, true, false, true, false, true, true, false],
    'Open Hat':   [false, false, true, false, true, false, false, true, false, true, false, false, true, false, true, false],
    'Closed Hat': [true, false, false, true, false, false, true, true, false, false, false, true, false, false, false, true],
  },
  'Sequence 2': {
    Kick:         [false, true, false, false, true, true, false, true, false, false, false, true, true, false, true, false],
    Snare:        [false, false, false, true, false, true, false, true, false, true, false, true, false, true, true, false],
    'Open Hat':   [false, true, true, false, true, false, false, true, false, true, false, true, true, false, true, false],
    'Closed Hat': [true, false, false, true, true, false, true, true, false, false, false, true, false, false, false, true],
  },
  'Sequence 3': {
    Kick:         [true, true, false, false, true, false, true, true, false, false, false, true, true, false, true, false],
    Snare:        [true, true, false, true, false, true, false, true, false, false, true, true, false, true, true, false],
    'Open Hat':   [false, false, true, false, false, false, false, true, false, true, false, true, false, false, true, false],
    'Closed Hat': [false, false, false, true, true, false, true, true, false, false, true, false, true, false, false, true],
  },
  None: {
    Kick:         new Array(16).fill(false),
    Snare:        new Array(16).fill(false),
    'Open Hat':   new Array(16).fill(false),
    'Closed Hat': new Array(16).fill(false),
  }
}
