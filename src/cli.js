//  CLI é a sigla para Command Line Interface ( Interface de Linha de Comando )
import fs from 'fs';
import Tratar_Erros from './erros/funcoes_Erro.js';
import { Contar_Palavras } from './index.js';
import { Montar_Saida_Arquivo } from './helpers.js';

// node .\cli.js ../arquivos/texto-web.txt ../resultados/

const caminho_Arquivo = process.argv;
const link = caminho_Arquivo [ 2 ];
const endereco = caminho_Arquivo [ 3 ];

fs.readFile ( link, 'utf-8', ( erro, texto ) =>
{
	try
	{
		if ( erro )
			throw erro

		const resultado = Contar_Palavras ( texto );
		Criar_Salvar_Arquivo ( resultado, endereco );
	}
	catch ( erro )
	{
		Tratar_Erros ( erro );
	}
})

async function Criar_Salvar_Arquivo ( lista_palavras, endereco )
{
	const novo_Arquivo = `${endereco}/resultado.txt`;
	const texto_Palavras = Montar_Saida_Arquivo ( lista_palavras );

	try
	{
		await fs.promises.writeFile ( novo_Arquivo, texto_Palavras );
		console.log ( "Arquivo criado" );
	}
	catch ( erro )
	{
		throw erro;
	}
}

/*
function Criar_Salvar_Arquivo ( lista_palavras, endereco )
{
	const novo_Arquivo = `${endereco}/resultado.txt`;
	const texto_Palavras = JSON.stringify ( lista_palavras );

	fs.promises.writeFile ( novo_Arquivo, texto_Palavras )
		.then (() =>
		{
			// Processamento feito com o resultado da promessa
			console.log ( "arquivo criado" );
		})
		.catch (( erro ) =>
		{
			throw erro;
		})
		.finally (() =>
		{
			console.log ( "Operação finalizada" );
		})
}
*/