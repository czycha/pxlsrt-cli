# pxlsrt-cli

Command line interface for [pxlsrt.js](http://github.com/czycha/pxlsrt.js). Pixel sort your images from the command line!

## Usage
```bash
pxlsrt command <image path> [options]
```

## Shared command options

_[See pxlsrt.js for more in-depth information.](https://github.com/czycha/pxlsrt.js#default-filter-options)_

| Option | Default | Choices/Type | Description |
|---|---|---|---|
| `--help` | | | Displays help for command. |
| `--version, -v` | | | Displays version. |
| `--output, -o` | stdout | `string` | Output to file. |
| `--method, -m` | `sumRGBA` | _[See pxlsrt.js](https://github.com/czycha/pxlsrt.js#default-filter-options)_ | Sort method. |
| `--direction, -d` | `horizontal` | `[horizontal, vertical, tlbr, trbl]` | Sort direction. |
| `--smooth, -s` | `false` | `boolean` | Group same pixels together to keep them uninterrupted. |
| `--reverse, -r` | `false` | `[true, false, either]` | Reverse bands or not. Use either to randomly reverse. |
| `--middlate, -M` | `0` | `integer` | Middlation rearranges a band so the first pixel is in the middle, and continues to wind outwards. Use positive values to loop that many times. Use negative values to apply the process in reverse that many times. |

## Commands

### brute

_[See pxlsrt.js for more in-depth information.](https://github.com/czycha/pxlsrt.js#brute-filter)_

| Option | Default | Choices/Type | Description |
|---|---|---|---|
| `--min` | max | `integer` | The minimum length of the band. By default, equals the maximum length. |
| `--max` | line length | `integer` | The maximum length of the band. By default, equals the line length. |

### smart

_[See pxlsrt.js for more in-depth information.](https://github.com/czycha/pxlsrt.js#smart-filter)_

| Option | Default | Choices/Type | Description |
|---|---|---|---|
| `--threshold, -t` | `20` | `integer` | Threshold for edge detection. The larger the number, the larger the region. |
