fx_version 'cerulean'
game 'gta5'
author 'Oph3Z'

ui_page "build/index.html"

files {
	'build/**/*'
}

shared_script{
	'config/config.lua',
	'locales/*.lua',
	'GetCore.lua',
}

client_scripts {
	'client/*.lua',
}

server_scripts {
	'server/*.lua',
    -- '@mysql-async/lib/MySQL.lua', --⚠️PLEASE READ⚠️; Uncomment this line if you use 'mysql-async'.⚠️
    '@oxmysql/lib/MySQL.lua', --⚠️PLEASE READ⚠️; Uncomment this line if you use 'oxmysql'.⚠️
}

lua54 'yes'