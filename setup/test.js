
os = require('os');

console.log('curl http://localhost:50100/os/update/id=3&host\[hostname\]='+ os.hostname() +	
	'&memory\[total\]=' + os.totalmem() +
	'memory\[free\]=' + os.freemem());


