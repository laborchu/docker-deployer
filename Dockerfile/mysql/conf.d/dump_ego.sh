#!/bin/bash
mysqldump -uroot -proot bc_glasses > bc_glasses.sql
mv bc_glasses.sql /var/lib/mysql/

#!/bin/bash
mysql -uroot -proot bc_glasses < /var/lib/mysql/bc_glasses.sql