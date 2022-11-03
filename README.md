didYouMean-cli - CLI version of didyoumean.js
===================================================

[Available on GitHub](https://github.com/MuhammadRestu999/DidYouMean-cli.git).


Examples
--------

From file
```
## list.txt
## hello world, foo bar, foo, bar, Hello world, Hello World
dym "hello worls" list.txt # hello world
dym "Hello worls" --cs list.txt # Hello world


#$ list.json
## ["hello world", "foo bar", "foo", "bar", "Hello world", "Hello World"]
dym "hello worls" list.json # hello world
dym "Hello worls" --cs list.json # Hello world
```


dym text file options
----------------------------

- text: The string input to match.
- file: An file of strings or array to match against.
- options (OPTIONAL)

Returns: the closest matching string, or nothing if no strings exceed the threshold.


Options
-------

Options are set on the dym arguments. You may change them at any time.

### case-sensitive

  By default, the method will perform case-insensitive comparisons. If you wish to force case sensitivity, add
  --case-sensitive or --cs to options

  ```
  dym text file --case-sensitive
  ```


Special thanks
--------------
- [dcporter](https://github.com/dcporter): for [didyoumean.js](https://github.com/dcporter/didyoumean.js)
- [yeoman](https://github.com/yeoman): for [update-notifier](https://github.com/yeoman/update-notifier)


License
-------

Copyright (c) 2022 Muhammad Restu

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
