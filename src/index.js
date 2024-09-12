const fs = require ( 'fs' ); // Importa o File System

// node .\index.js ../arquivos/texto-web.txt

const caminho_Arquivo = process.argv;
const link = caminho_Arquivo [ 2 ];

/*
	Dois parâmetros:
		Caminho do arquivo;
		Função callback que precisa receber dois parâmetros 
*/
fs.readFile ( link, 'utf-8', ( erro, texto ) => 
{
	console.log ( texto )
})

// console.log ( caminho_Arquivo );
// console.log ( `---\n` );
// console.log ( link );
