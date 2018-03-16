#!/usr/bin/env node

const argv = require('yargs');
const Pxlsrt = require('pxlsrt');
const Jimp = require('jimp');

function sort(filter, path, options) {
  Pxlsrt.read(path).then(function(image) {
    image.filter(filter, options);
    if(options.output) {
      image.write(options.output);
    } else {
      image.getBuffer(Jimp.AUTO, function(err, buffer) {
        if(err) {
          process.stderr.write("Unable to output buffer: " + err);
          process.exit(-1);
        }
        process.stdout.write(buffer);
      });
    }
  });
}

function defaultOptions(yargs) {
  return yargs
    .positional('path', {
      describe: 'Path or URL to image to sort.',
      type: 'string'
    })
    .option('output', {
      describe: 'Write to file.',
      alias: 'o',
      type: 'string',
      requiresArg: true,
      default: false,
      defaultDescription: 'stdout'
    })
    .options('method', {
      describe: 'Sort method',
      alias: 'm',
      type: 'string',
      requiresArg: true,
      default: 'sumRGBA',
      choices: Pxlsrt.Band.sortable
    })
    .options('direction', {
      describe: 'Sort in this direction.',
      alias: 'd',
      type: 'string',
      requiresArg: true,
      default: 'horizontal',
      choices: ['horizontal', 'vertical', 'tlbr', 'trbl']
    })
    .options('smooth', {
      describe: 'Group same pixels together when sorting.',
      alias: 's',
      type: 'boolean',
      default: false
    })
    .options('reverse', {
      describe: 'Reverse band.',
      alias: 'r',
      default: false,
      choices: [true, false, 'either'],
      coerce(val) {
        switch(val) {
          case true: case 'true':
            return true;
          case false: case 'false':
            return false;
          default:
            return val;
        }
      }
    })
    .options('middlate', {
      describe: 'Places the first pixel in the middle, and continue to wind outwards. Positive values loops that many times. Negative values applies the process in reverse that many times.',
      alias: 'M',
      type: 'number',
      requiresArg: true,
      default: 0,
      defaultDescription: "false"
    });
}

argv
  .usage('Usage: $0 <command> [options]')
  .command(
    'brute <path>',
    'Sorts image by chunking it into random bands.', 
    (yargs) => {
      defaultOptions(yargs)
        .options('min', {
          describe: 'Minimum band size',
          type: 'number',
          requiresArg: true,
          default: -1,
          defaultDescription: 'max'
        })
        .options('max', {
          describe: 'maximum band size',
          type: 'number',
          requiresArg: true,
          default: -1,
          defaultDescription: 'line size'
        });
    },
    (argv) => {
      sort('brute', argv.path, argv);
    }
  )
  .command(
    'smart <path>',
    'Sorts image by using edge detection to sort within regions.', 
    (yargs) => {
      defaultOptions(yargs)
        .options('threshold', {
          describe: 'Threshold used for edge detection. Larger, the number, the larger the regions',
          alias: 't',
          type: 'number',
          requiresArg: true,
          default: 20
        });
    },
    (argv) => {
      sort('smart', argv.path, argv);
    }
  )
  .help()
  .argv;
