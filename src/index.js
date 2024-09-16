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

	const contagem  = paragrafos.flatMap (( paragrafo ) =>
	{
		if ( !paragrafo )
			return [];

		return Verificar_Palavras_Duplicadas ( paragrafo );
	})
	console.log ( contagem );
}

function Limpar_Palavras ( palavra )
{
	return palavra.replace( /[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '' ); // Expressões regulares
}

function Verificar_Palavras_Duplicadas ( texto )
{
	// Onde tiver espaço no texto pegará a palavra anterior e colocará como um elemento no array. e lista_Palavras irá conter todas as palavras do texto.
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



/*
	Como transformamos esse filter e map em um único loop? Vamos usar outro método de array que ainda não conhecemos, o flatMap(), que também é um método callback.

	Assim, const contagem será igual a paragrafos.flatMap(), que vai receber por parâmetro paragrafo seguido de arrow function.

	Dentro das chaves, podemos fazer uma verificação if (!paragrafo), ou seja, se paragrafo for avaliado como falso, podemos retornar um array vazio. Isto é, return [].

	Se não for um parágrafo vazio, se tiver conteúdo, vamos pegar o return verificaPalavrasDuplicadas(paragrafo) e colocá-lo dentro do flatMap().

	Podemos deletar o filter e o map dessa função e deixar no final apenas o console.log(contagem).
*/