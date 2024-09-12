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
	Quebrar_Em_Paragrafos ( texto );
})

function Quebrar_Em_Paragrafos ( texto )
{
	// Converte todo o texto em letras minúsculas e adiciona cada parágrafo em um elemento do array.
	const paragrafos = texto.toLowerCase().split ( '\n' );

	const contagem  = paragrafos.map (( paragrafo ) =>
	{
		return Verificar_Palavras_Duplicadas ( paragrafo );
	})

	console.log ( contagem );
}

function Verificar_Palavras_Duplicadas ( texto )
{
	// Onde tiver espaço no texto pegará a palavra anterior e colocará como um elemento no array. e lista_Palavras irá conter todas as palavras do texto.
	const lista_Palavras = texto.split ( ' ' );
	const resultado = {};

	lista_Palavras.forEach ( palavra =>
	{
		resultado [ palavra ] = ( resultado [ palavra ] || 0 ) + 1;
	})

	return resultado;
}
