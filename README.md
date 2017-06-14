# supervisor-status

https://travis-ci.org/intel-hpdd/supervisor-status.svg?branch=master

This module reports supervisord process status as a JSON array as a persistent daemon.

This avoids the need to implement a XMLRPC client everywhere we need status. We can just
connect to this socket and get status.

It will either return a top level object with a `result` key on success, or an `error` key
on failure.

It is meant to be used with unix domain sockets + socket activation.
