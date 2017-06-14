//
// Copyright (c) 2017 Intel Corporation. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import supervisord from 'supervisord';
import net from 'net';

const client = supervisord.connect('http://127.0.0.1:9100');

const server = net.createServer(c =>
  client.getAllProcessInfo((error, result) => {
    if (error) {
      console.error(error);
      c.end(
        JSON.stringify({
          error: 'An unexpected error has occured. Please try again.'
        })
      );
    } else {
      c.id = 1;
      c.end(JSON.stringify({ result }));
    }
  })
);

server.listen({ fd: 3 });
