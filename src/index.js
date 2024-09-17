const fs = require ( 'fs' ); // Importa o File System

// node .\index.js ../arquivos/texto-web.txt

const caminho_Arquivo = process.argv;
const link = caminho_Arquivo [ 2 ];

fs.readFile ( link, 'utf-8', ( erro, texto ) => 
{
	try
	{
		if ( erro ) throw erro
		Contar_Palavras ( texto );
	}
	catch ( erro )
	{
		if ( erro === "ENOENT")
			console.log ( "Erro nome do arquivo" );
		else
			console.log ( "Outro erro" );
	}
})

function Contar_Palavras ( texto )
{
	const paragrafos = Extrair_Paragrafo ( texto );

	const contagem  = paragrafos.flatMap (( paragrafo ) =>
	{
		if ( !paragrafo )
			return [];

		return Verificar_Palavras_Duplicadas ( paragrafo );
	})

	console.log ( contagem );
}

function Extrair_Paragrafo ( texto )
{
	return texto.toLowerCase().split ( '\n' );
}

function Limpar_Palavras ( palavra )
{
	return palavra.replace( /[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '' );
}

function Verificar_Palavras_Duplicadas ( texto )
{
	const lista_Palavras = texto.split ( ' ' );
	const resultado = {};

	lista_Palavras.forEach ( palavra =>
	{
		if ( palavra.length >= 3 )
		{
			const palavra_Limpa = Limpar_Palavras ( palavra );
			resultado [ palavra_Limpa ] = ( resultado [ palavra_Limpa ] || 0 ) + 1;
		}
	})

	return resultado;
}
