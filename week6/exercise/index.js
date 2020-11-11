const path = require('path');
const fs = require('fs');
const Transform = require('stream').Transform;

const MACHINE_STATE = {
  INITIAL: 'I',
  FIRST_OPEN: 'O',
  SECOND_OPEN: 'OO',
  CAPTURE: 'CA',
  FIRST_CLOSE: 'C',
  SECOND_CLOSE: 'CC',
  CLOSED: 'CLOSED'
};

const MACHINE_TRANSITIONS = {
  TO_OPEN_FIRST: 'open_first',
  TO_OPEN_FIRST_FAILURE: 'open_first_failure',
  TO_OPEN_SECOND: 'open_second',
  TO_OPEN_SECOND_FAILURE: 'open_first_failure',
  TO_CAPTURING: 'capturing',
  TO_CAPTURE_FAILURE: 'capture_failure',
  TO_CLOSE_FIRST: 'close_first',
  TO_CLOSE_FIRST_FAILURE: 'close_first_failure',
  TO_INITIAL: 'to_initial',
}

function createReplaceMachine(replaceTokenMap) {
  return {
    state: MACHINE_STATE.INITIAL,
    buffer: '',

    flushBuffer(withReplace = false) {
      let buff = this.buffer;
      if (buff === '') { return ''; }

      if (withReplace && replaceTokenMap[buff]) {
        buff = replaceTokenMap[buff];
      } else if (withReplace) {
        buff = '{{' + buff + '}}';
      } else {
        buff = buff;
      }

      this.buffer = '';
      return buff;
    },

    transitions: [
      {
        name: MACHINE_TRANSITIONS.TO_OPEN_FIRST,
        from: MACHINE_STATE.INITIAL,
        to: MACHINE_STATE.FIRST_OPEN,
        exec(char) { return ''; },
      },
      {
        name: MACHINE_TRANSITIONS.TO_OPEN_FIRST_FAILURE,
        from: MACHINE_STATE.FIRST_OPEN,
        to: MACHINE_STATE.INITIAL,
        exec(char) { return '{' + char; },
      },
      {
        name: MACHINE_TRANSITIONS.TO_OPEN_SECOND,
        from: MACHINE_STATE.FIRST_OPEN,
        to: MACHINE_STATE.SECOND_OPEN,
        exec(char) { return '' },
      },
      {
        name: MACHINE_TRANSITIONS.TO_OPEN_SECOND_FAILURE,
        from: MACHINE_STATE.SECOND_OPEN,
        to: MACHINE_STATE.INITIAL,
        exec(char) { return '{{' + this.flushBuffer() + char; },
      },
      {
        name: MACHINE_TRANSITIONS.TO_CAPTURING,
        from: MACHINE_STATE.SECOND_OPEN,
        to: MACHINE_STATE.CAPTURE,
        exec(char) { this.buffer += char; return ''; }
      },
      {
        name: MACHINE_TRANSITIONS.TO_CAPTURING,
        from: MACHINE_STATE.CAPTURE,
        to: MACHINE_STATE.CAPTURE,
        exec(char) { this.buffer += char; return ''; }
      },
      {
        name: MACHINE_TRANSITIONS.TO_CAPTURE_FAILURE,
        from: MACHINE_STATE.CAPTURE,
        to: MACHINE_STATE.INITIAL,
        exec(char) { return '{{' + this.flushBuffer() + char; }
      },
      {
        name: MACHINE_TRANSITIONS.TO_CLOSE_FIRST,
        from: MACHINE_STATE.CAPTURE,
        to: MACHINE_STATE.FIRST_CLOSE,
        exec(char) { return ''; }
      },
      {
        name: MACHINE_TRANSITIONS.TO_CLOSE_FIRST_FAILURE,
        from: MACHINE_STATE.FIRST_CLOSE,
        to: MACHINE_STATE.INITIAL,
        exec(char) { return '{{' + this.flushBuffer() + '}' + char; }
      },
      {
        name: MACHINE_TRANSITIONS.TO_INITIAL,
        from: MACHINE_STATE.FIRST_CLOSE,
        to: MACHINE_STATE.INITIAL,
        exec(char) { return this.flushBuffer(true); }
      },
    ],

    transitionTo(transitionName) {
      const t = this.transitions.find(t => t.name === transitionName && t.from === this.state);
      if (!t) { throw new Error('No such transition!'); }
      this.state = t.to;
      return t;
    },

    processChar(char) {
      if (this.state === MACHINE_STATE.INITIAL) {
        if (char === '{') {
          const t = this.transitionTo(MACHINE_TRANSITIONS.TO_OPEN_FIRST);
          return t.exec.call(this, char);
        }
      }

      if (this.state === MACHINE_STATE.FIRST_OPEN) {
        if (char === '{') {
          const t = this.transitionTo(MACHINE_TRANSITIONS.TO_OPEN_SECOND);
          return t.exec.call(this, char);
        }

        const t = this.transitionTo(MACHINE_TRANSITIONS.TO_OPEN_FIRST_FAILURE);
        return t.exec.call(this, char);
      }

      if (this.state === MACHINE_STATE.SECOND_OPEN) {
        if (/[a-zA-Z0-9_]/.test(char)) {
          const t = this.transitionTo(MACHINE_TRANSITIONS.TO_CAPTURING);
          return t.exec.call(this, char);
        }

        const t = this.transitionTo(MACHINE_TRANSITIONS.TO_OPEN_SECOND_FAILURE);
        return t.exec.call(this, char);
      }

      if (this.state === MACHINE_STATE.CAPTURE) {
        if (/[a-zA-Z0-9_]/.test(char)) {
          const t = this.transitionTo(MACHINE_TRANSITIONS.TO_CAPTURING);
          return t.exec.call(this, char);
        }
        if (char === '}') {
          const t = this.transitionTo(MACHINE_TRANSITIONS.TO_CLOSE_FIRST);
          return t.exec.call(this, char);
        }

        const t = this.transitionTo(MACHINE_TRANSITIONS.TO_CAPTURE_FAILURE);
        return t.exec.call(this, char);
      }

      if (this.state === MACHINE_STATE.FIRST_CLOSE) {
        if (char === '}') {
          const t = this.transitionTo(MACHINE_TRANSITIONS.TO_INITIAL);
          return t.exec.call(this, char);
        }

        const t = this.transitionTo(MACHINE_TRANSITIONS.TO_CLOSE_FIRST_FAILURE);
        return t.exec.call(this, char);
      }

      return char;
    }
  }
}

const machine = createReplaceMachine({
  'errorMessage1': 'BAD ERROR!!!',
  'errorMessage2': 'VERY BAD ERROR!!!',
  'errorMessage3': 'WORST ERROR EVER!!!',
  'thisShouldWorkToo': 'YEP IT WORKS!'
});

const rs = fs.createReadStream(
  path.resolve(__dirname, '../lecture/public/pages/index.html')
);
const ws = fs.createWriteStream(
  path.resolve(__dirname, './result.html')
);

const replaceTransformStream = new Transform({
  transform(chuck, _, done) {
    if (chuck === null) { done(null, null); return; }
    const chunkStr = chuck.toString();
    const charArray = chunkStr.split('');
    const processedArray = charArray.map(char => {
      const res = machine.processChar(char);
      return res;
    });
    const processedString = processedArray.join('');
    done(null, processedString);
  }
});

rs.pipe(replaceTransformStream).pipe(ws);